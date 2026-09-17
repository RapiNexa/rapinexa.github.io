import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { HERO, HERO_ORBIT_PLATFORM_IDS, getPlatformsByIds, type Platform } from "src/data/content";
import { chronoRef, setOrbitElement } from "./Starfield";

/**
 * Inset (px) of the inner ring from the outer container's edges — kept in
 * sync with the inner ring's `inset: 62` style below.
 */
const RING_INSET = 62;

/**
 * Fallback radii matching the container's desktop size (`min(410px,86vw)`
 * resolves to 410px on wide viewports), used only until the first
 * `ResizeObserver` measurement lands.
 */
const DEFAULT_CONTAINER_SIZE = 410;
const DEFAULT_OUTER_RADIUS = DEFAULT_CONTAINER_SIZE / 2;
const DEFAULT_INNER_RADIUS = (DEFAULT_CONTAINER_SIZE - RING_INSET * 2) / 2;

/** Extra breathing room (px) kept between a chip's outer edge and the clip boundary. */
const CHIP_EDGE_SAFETY = 4;

/**
 * Two concentric radii the chips sit on. The container is sized responsively
 * (`min(410px,86vw)`), so a fixed pixel radius tuned for the 410px desktop
 * case would push chips outside the ring — and off-screen — once the
 * container shrinks below that on narrow viewports. These radii instead
 * track two things measured live:
 *
 * 1. The (non-rotating) root container's own size, via `offsetWidth` rather
 *    than `getBoundingClientRect()` — the rings are continuously rotated by
 *    the `spin`/`spin-rev` CSS animations, so their post-transform bounding
 *    rect balloons well past their true layout size at most points in the
 *    rotation, while the root only ever translates (`floaty`), so its box
 *    is stable and safe to read with either API.
 * 2. How much room actually exists before content gets clipped. A chip is
 *    centered *on* its ring, so half its own rendered width normally pokes
 *    past the ring line — invisible on desktop where the orbit has plenty
 *    of margin, but exactly what clips chips at phone width where the
 *    orbit fills nearly the full, `overflow: hidden` Hero section. The
 *    radius is capped so the widest chip's edge stays within that
 *    section's bounds (falling back to the viewport if it can't be found),
 *    without ever growing past the container-based radius above — so
 *    desktop, which already has slack to spare, renders unchanged.
 */
function useOrbitRadii(rootRef: RefObject<HTMLElement | null>, chipsKey: string) {
  const [radii, setRadii] = useState({ outer: DEFAULT_OUTER_RADIUS, inner: DEFAULT_INNER_RADIUS });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const clipBoundary = root.closest<HTMLElement>("[data-hero-section]");

    const widestChipWidth = (ring: "outer" | "inner") => {
      const widths = Array.from(root.querySelectorAll<HTMLElement>(`[data-ring="${ring}"]`)).map((el) => el.offsetWidth);
      return widths.length ? Math.max(...widths) : 0;
    };

    const measure = () => {
      // `min(410px,86vw)` sets width and height identically, but the
      // container can still end up non-square in practice (e.g. a flex
      // ancestor that shrinks its width without shrinking its height at
      // some viewport widths) — take the smaller dimension so radii never
      // overflow whichever axis is currently tighter.
      const size = Math.min(root.offsetWidth, root.offsetHeight);
      const outerBase = size / 2;
      const innerBase = Math.max(size - RING_INSET * 2, 0) / 2;

      const rootRect = root.getBoundingClientRect();
      const boundaryRect = clipBoundary?.getBoundingClientRect();
      const boundaryLeft = boundaryRect ? boundaryRect.left : 0;
      const boundaryRight = boundaryRect ? boundaryRect.right : window.innerWidth;
      const slack = Math.max(Math.min(rootRect.left - boundaryLeft, boundaryRight - rootRect.right), 0);

      const maxRadiusFor = (base: number, ring: "outer" | "inner") => {
        const allowedByBoundary = base + slack - CHIP_EDGE_SAFETY - widestChipWidth(ring) / 2;
        return Math.max(Math.min(base, allowedByBoundary), 0);
      };

      setRadii({ outer: maxRadiusFor(outerBase, "outer"), inner: maxRadiusFor(innerBase, "inner") });
    };

    measure();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    if (clipBoundary) observer.observe(clipBoundary);
    return () => observer.disconnect();
  }, [rootRef, chipsKey]);

  return radii;
}

function polarOffset(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: radius * Math.sin(rad),
    y: -radius * Math.cos(rad),
  };
}

type OrbitChipProps = {
  platform: Platform;
  angleDeg: number;
  radius: number;
  ring: "outer" | "inner";
  spinAnimation: string;
  fontSize: number;
  padding: string;
};

function OrbitChip({ platform, angleDeg, radius, ring, spinAnimation, fontSize, padding }: OrbitChipProps) {
  const { x, y } = polarOffset(angleDeg, radius);
  const Icon = platform.icon;

  return (
    <div
      data-ring={ring}
      className="absolute"
      style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)`, transform: "translate(-50%, -50%)" }}
    >
      <div
        data-orbit
        className="inline-flex items-center gap-[5px]"
        style={{
          animation: spinAnimation,
          padding,
          borderRadius: 999,
          border: "1px solid var(--border)",
          background: "var(--bg2)",
          fontFamily: "var(--font-mono)",
          fontSize,
          color: "var(--muted)",
          whiteSpace: "nowrap",
        }}
      >
        {Icon ? <Icon aria-hidden="true" size={fontSize + 1} /> : null}
        {platform.name}
      </div>
    </div>
  );
}

/**
 * Animated orbit whose chips show a Platform selection from the content
 * layer (`HERO_ORBIT_PLATFORM_IDS` resolved via `getPlatformsByIds`) —
 * ported from `docs/reactjs/src/app/components/HeroOrbit.tsx`, generalised
 * from the reference's fixed 3-outer/2-inner hardcoded chip layout to an
 * arbitrary-length Platform list spread evenly around each ring.
 *
 * The `cycleOrbit` highlight timer and hover-to-freeze behaviour (which
 * pauses the ring and tells `Starfield` to freeze nearby stars via
 * `chronoRef`/`setOrbitElement`) are unchanged from the reference.
 */
export default function HeroOrbit() {
  const rootRef = useRef<HTMLDivElement>(null);
  const platforms = getPlatformsByIds(HERO_ORBIT_PLATFORM_IDS);
  const outerCount = Math.max(Math.ceil(platforms.length / 2), 1);
  const outerChips = platforms.slice(0, outerCount);
  const innerChips = platforms.slice(outerCount);
  const radii = useOrbitRadii(
    rootRef,
    platforms.map((platform) => platform.id).join("|"),
  );

  useEffect(() => {
    setOrbitElement(rootRef.current);
    return () => setOrbitElement(null);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cycleOrbit = () => {
      const chips = Array.from(root.querySelectorAll<HTMLElement>("[data-orbit]"));
      if (!chips.length) return;
      const n = 1 + Math.floor(Math.random() * 2);
      const pool = chips.map((_, i) => i);
      const on = new Set<number>();
      while (on.size < n && pool.length) {
        const k = Math.floor(Math.random() * pool.length);
        on.add(pool.splice(k, 1)[0]);
      }
      chips.forEach((c, i) => {
        const active = on.has(i);
        c.style.transition = "border-color .7s ease,color .7s ease,box-shadow .7s ease";
        c.style.borderColor = active ? "var(--accent)" : "var(--border)";
        c.style.color = active ? "var(--text)" : "var(--muted)";
        c.style.boxShadow = active ? "0 0 20px var(--accent-soft)" : "none";
      });
    };

    cycleOrbit();
    const timer = setInterval(cycleOrbit, 5000);
    return () => clearInterval(timer);
  }, [platforms.length]);

  const freezeOrbit = useCallback((on: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    root.style.animationPlayState = on ? "paused" : "";
    root.querySelectorAll<HTMLElement>("*").forEach((el) => {
      el.style.animationPlayState = on ? "paused" : "";
    });
  }, []);

  const onEnter = useCallback(() => {
    chronoRef.active = true;
    freezeOrbit(true);
  }, [freezeOrbit]);

  const onLeave = useCallback(() => {
    chronoRef.active = false;
    freezeOrbit(false);
  }, [freezeOrbit]);

  return (
    <div
      ref={rootRef}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className="relative flex items-center justify-center"
      style={{
        width: "min(410px,86vw)",
        height: "min(410px,86vw)",
        animation: "floaty 7s ease-in-out infinite",
      }}
    >
      {/* Outer ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1px solid var(--border)",
          animation: "spin 46s linear infinite",
        }}
      >
        {outerChips.map((platform, i) => (
          <OrbitChip
            key={platform.id}
            platform={platform}
            angleDeg={(360 / outerChips.length) * i}
            radius={radii.outer}
            ring="outer"
            spinAnimation="spin-rev 46s linear infinite"
            fontSize={11}
            padding="6px 13px"
          />
        ))}
      </div>

      {/* Inner ring (dashed, counter-spin) */}
      {innerChips.length > 0 ? (
        <div
          className="absolute rounded-full"
          style={{
            inset: RING_INSET,
            border: "1px dashed var(--border)",
            animation: "spin-rev 34s linear infinite",
          }}
        >
          {innerChips.map((platform, i) => (
            <OrbitChip
              key={platform.id}
              platform={platform}
              angleDeg={(360 / innerChips.length) * i + 360 / (innerChips.length * 2)}
              radius={radii.inner}
              ring="inner"
              spinAnimation="spin 34s linear infinite"
              fontSize={10.5}
              padding="5px 11px"
            />
          ))}
        </div>
      ) : null}

      {/* Glow halo */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 128,
          background: "radial-gradient(circle, var(--accent), transparent 66%)",
          filter: "blur(36px)",
          opacity: 0.55,
          animation: "pulse-glow 5s ease-in-out infinite",
        }}
      />

      {/* Core */}
      <div
        className="relative flex flex-col items-center justify-center gap-[5px] rounded-full"
        style={{
          width: "min(138px,34vw)",
          height: "min(138px,34vw)",
          border: "1px solid var(--accent)",
          background: "radial-gradient(circle at 35% 30%, var(--bg2), var(--bg))",
          boxShadow: "0 0 48px rgba(139,92,246,0.4), inset 0 0 30px rgba(139,92,246,0.16)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: 1,
            color: "var(--text)",
          }}
        >
          &lt;/&gt;
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: 2.5,
            color: "var(--accent-text)",
            textTransform: "uppercase",
          }}
        >
          {HERO.orbitLabel}
        </div>
      </div>
    </div>
  );
}
