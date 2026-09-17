import { HERO } from "src/data/content";
import HeroOrbit from "./HeroOrbit";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Full reference-style Hero (ticket 04): starfield background (mounted by
 * `PublicLayout`, this section only marks itself `data-hero-section` so the
 * starfield's pointer "gravity well" effect knows its bounds), the animated
 * `HeroOrbit`, an eyebrow/headline/sub-headline, and one prominent
 * WhatsApp CTA. Replaces ticket 01's placeholder Hero.
 *
 * Ported from `docs/reactjs/src/app/components/Hero.tsx` with the personal
 * name/title, "View Projects" navigation, and résumé download removed —
 * all copy comes from `HERO` in the content layer and the single CTA is
 * the shared `WhatsAppButton` (`source: hero`).
 */
export default function Hero() {
  return (
    <section
      data-hero-section
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight: "100vh",
        padding: "130px 0 80px",
      }}
    >
      <div
        className="mx-auto flex flex-wrap items-center gap-12 w-full"
        style={{
          maxWidth: 1280,
          padding: "0 clamp(20px,5vw,40px)",
        }}
      >
        {/* Left: Text */}
        <div style={{ flex: "1 1 420px", minWidth: 300 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "var(--accent-text)",
              marginBottom: 22,
              animation: "fade-up .7s ease both",
            }}
          >
            {HERO.eyebrow}
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(38px,6vw,72px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: 0,
              color: "var(--text)",
              animation: "time-walk .95s cubic-bezier(.2,.7,.2,1) both",
              animationDelay: ".06s",
              textWrap: "balance",
            }}
          >
            {HERO.headline}
          </h1>
          <p
            style={{
              maxWidth: 520,
              margin: "28px 0 0",
              fontSize: "clamp(16px,1.6vw,20px)",
              lineHeight: 1.6,
              color: "var(--muted)",
              animation: "fade-up .7s ease both",
              animationDelay: ".12s",
            }}
          >
            {HERO.subheadline}
          </p>

          {/* CTA */}
          <div
            className="flex flex-wrap gap-[14px]"
            style={{
              marginTop: 36,
              animation: "fade-up .7s ease both",
              animationDelay: ".18s",
            }}
          >
            <WhatsAppButton
              source="hero"
              message={HERO.ctaMessage}
              label={HERO.ctaLabel}
              variant="primary"
            />
          </div>
        </div>

        {/* Right: Orbit */}
        <div
          className="flex justify-center"
          style={{
            flex: "0 1 380px",
            minWidth: 260,
            animation: "fade-up .8s ease both",
            animationDelay: ".14s",
          }}
        >
          <HeroOrbit />
        </div>
      </div>
    </section>
  );
}
