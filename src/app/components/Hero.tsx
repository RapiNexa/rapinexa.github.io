import { HERO } from "src/data/content";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Placeholder Hero for the tracer-bullet ticket: eyebrow, headline,
 * sub-headline, and one WhatsApp CTA. Ticket 04 replaces this with the
 * full Hero (Starfield, HeroOrbit, Platform orbit chips).
 */
export default function Hero() {
  return (
    <section
      data-hero-section
      className="relative flex items-center"
      style={{
        minHeight: "100vh",
        padding: "140px 20px 80px",
      }}
    >
      <div
        className="mx-auto w-full"
        style={{ maxWidth: 720, textAlign: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "var(--accent-text)",
            marginBottom: 18,
          }}
        >
          {HERO.eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(32px,6vw,64px)",
            lineHeight: 1.08,
            margin: 0,
            color: "var(--text)",
          }}
        >
          {HERO.headline}
        </h1>
        <p
          style={{
            maxWidth: 560,
            margin: "24px auto 0",
            fontSize: "clamp(15px,1.6vw,18px)",
            lineHeight: 1.6,
            color: "var(--muted)",
          }}
        >
          {HERO.subheadline}
        </p>
        <div className="flex justify-center" style={{ marginTop: 34 }}>
          <WhatsAppButton
            source="hero"
            message={HERO.ctaMessage}
            label={HERO.ctaLabel}
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}
