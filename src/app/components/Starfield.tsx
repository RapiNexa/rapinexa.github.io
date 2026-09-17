import { useEffect, useRef } from "react";
import { useUiState } from "src/states/uiState";

/**
 * Full-viewport animated star canvas behind the page content, ported from
 * `docs/reactjs/src/app/components/Starfield.tsx`. Mounted once by
 * `PublicLayout` (`position: fixed`, `z-index: 0`) so it sits behind the
 * Navbar/route content/Footer, which the layout lifts onto a `relative
 * z-1` wrapper.
 *
 * Reacts to the theme store directly (`useUiState`) rather than a prop, so
 * it repaints star colour/opacity immediately on theme toggle and stays
 * legible in both dark and light themes.
 *
 * `chronoRef`/`setOrbitElement` let `HeroOrbit` (i) pause star drift while
 * hovered and (ii) tell the canvas where the orbit sits so nearby stars
 * "freeze" in a ring around it — a purely decorative coupling between the
 * two components via this module's exports, exactly as in the reference.
 */
type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  vx: number;
  vy: number;
  accent: boolean;
};

type Pointer = { x: number; y: number; active: boolean };
type Chrono = { active: boolean };

export const chronoRef: Chrono = { active: false };
export let orbitElement: HTMLDivElement | null = null;
export function setOrbitElement(el: HTMLDivElement | null) {
  orbitElement = el;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const pointerRef = useRef<Pointer>({ x: 0, y: 0, active: false });
  const dprRef = useRef(1);
  const rafRef = useRef(0);
  const isDark = useUiState((s) => s.theme === "dark");

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
      dprRef.current = dpr;
    };

    const seedStars = () => {
      const n = Math.floor((cv.width * cv.height) / 18000);
      starsRef.current = Array.from({ length: n }, () => ({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 6.28,
        tw: Math.random() * 0.02 + 0.004,
        vx: (Math.random() - 0.5) * 0.2,
        vy: Math.random() * 0.15 + 0.05,
        accent: Math.random() < 0.22,
      }));
    };

    sizeCanvas();
    seedStars();

    const onResize = () => {
      sizeCanvas();
      seedStars();
    };

    const onPointer = (e: PointerEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.active = true;
    };
    const onPointerOut = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    document.addEventListener("mouseleave", onPointerOut);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("mouseleave", onPointerOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dark = isDark;
      const dpr = dprRef.current;
      const stars = starsRef.current;
      const P = pointerRef.current;
      const px = P.x * dpr;
      const py = P.y * dpr;

      ctx.clearRect(0, 0, cv.width, cv.height);

      let cActive = false;
      let ccx = 0;
      let ccy = 0;
      let cr = 0;
      if (chronoRef.active && orbitElement) {
        const rr = orbitElement.getBoundingClientRect();
        if (rr.width) {
          ccx = (rr.left + rr.width / 2) * dpr;
          ccy = (rr.top + rr.height / 2) * dpr;
          cr = (Math.max(rr.width, rr.height) / 2 + 14) * dpr;
          cActive = true;
        }
      }

      let grav = false;
      if (P.active) {
        const hero = document.querySelector("[data-hero-section]");
        if (hero) {
          const hr = hero.getBoundingClientRect();
          if (P.x >= hr.left && P.x <= hr.right && P.y >= hr.top && P.y <= hr.bottom) {
            grav = true;
          }
        }
      }

      const driftY = 0.02 * dpr;
      const maxSp = 3.2 * dpr;

      for (const s of stars) {
        s.a += s.tw;
        const al = Math.sin(s.a) * 0.5 + 0.5;
        const frozen =
          cActive && (s.x - ccx) * (s.x - ccx) + (s.y - ccy) * (s.y - ccy) < cr * cr;

        if (!frozen) {
          let ax = 0;
          let ay = driftY;
          let consumed = false;

          if (grav) {
            const dx = px - s.x;
            const dy = py - s.y;
            const d2 = dx * dx + dy * dy;
            const d = Math.sqrt(d2) + 0.001;
            if (d < 7 * dpr) {
              consumed = true;
            } else {
              const pull = Math.min(0.95 * dpr, (26000 * dpr * dpr) / (d2 + 2600 * dpr));
              ax += (dx / d) * pull + (-dy / d) * pull * 0.4;
              ay += (dy / d) * pull + (dx / d) * pull * 0.4;
            }
          }

          if (consumed) {
            s.x = Math.random() * cv.width;
            s.y = -10;
            s.vx = (Math.random() - 0.5) * 0.2;
            s.vy = Math.random() * 0.15 + 0.05;
            continue;
          }

          s.vx = s.vx * 0.93 + ax;
          s.vy = s.vy * 0.93 + ay;
          const sp = Math.hypot(s.vx, s.vy);
          if (sp > maxSp) {
            s.vx = (s.vx / sp) * maxSp;
            s.vy = (s.vy / sp) * maxSp;
          }
          s.x += s.vx;
          s.y += s.vy;

          if (s.y > cv.height + 10) {
            s.y = -10;
            s.x = Math.random() * cv.width;
            s.vx = (Math.random() - 0.5) * 0.2;
            s.vy = Math.random() * 0.15 + 0.05;
          }
          if (s.x < -12) s.x = cv.width + 12;
          else if (s.x > cv.width + 12) s.x = -12;
        }

        const spd = Math.hypot(s.vx || 0, s.vy || 0);
        if (frozen) {
          ctx.globalAlpha = 0.92;
          ctx.fillStyle = "#dfe8ff";
          ctx.strokeStyle = "#dfe8ff";
        } else {
          ctx.globalAlpha = (dark ? al * 0.9 : al * 0.5) * (s.accent ? 1 : 0.75);
          const col = s.accent ? "#a78bfa" : dark ? "#d7d2f0" : "#8b5cf6";
          ctx.fillStyle = col;
          ctx.strokeStyle = col;
        }

        if (!frozen && spd > 0.7 * dpr) {
          ctx.lineWidth = s.r * dpr * 1.5;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 3.2, s.y - s.vy * 3.2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * dpr, 0, 6.2832);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;

      if (grav) {
        const R = 100 * dpr;
        const g = ctx.createRadialGradient(px, py, 0, px, py, R);
        g.addColorStop(0, "rgba(4,3,10,0.65)");
        g.addColorStop(0.42, "rgba(30,14,54,0.28)");
        g.addColorStop(0.7, dark ? "rgba(167,139,250,0.14)" : "rgba(139,92,246,0.12)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, R, 0, 6.2832);
        ctx.fill();
        ctx.save();
        ctx.shadowColor = "rgba(167,139,250,0.9)";
        ctx.shadowBlur = 18 * dpr;
        ctx.strokeStyle = dark ? "rgba(190,170,255,0.6)" : "rgba(139,92,246,0.42)";
        ctx.lineWidth = 1.6 * dpr;
        ctx.beginPath();
        ctx.arc(px, py, 26 * dpr, 0, 6.2832);
        ctx.stroke();
        ctx.restore();
      }

      if (cActive) {
        ctx.strokeStyle = "rgba(196,210,255,0.38)";
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath();
        ctx.arc(ccx, ccy, cr, 0, 6.2832);
        ctx.stroke();
        ctx.strokeStyle = "rgba(196,210,255,0.10)";
        ctx.lineWidth = 7 * dpr;
        ctx.beginPath();
        ctx.arc(ccx, ccy, cr, 0, 6.2832);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
