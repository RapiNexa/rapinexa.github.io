import { CTA } from "src/data/content";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Closing CTA section (ticket 04): the last section before the Footer,
 * inviting the visitor to chat on WhatsApp. Ported from
 * `docs/reactjs/src/app/components/CtaSection.tsx` with the résumé
 * download and `mailto:` link replaced by the shared `WhatsAppButton`
 * (`source: cta`); heading/body/label come from `CTA` in the content
 * layer.
 */
export default function CtaSection() {
  return (
    <section
      className="mx-auto"
      style={{
        maxWidth: 1280,
        padding: "70px clamp(20px,5vw,40px) 90px",
      }}
    >
      <div
        className="relative overflow-hidden text-center"
        style={{
          border: "1px solid var(--border)",
          borderRadius: 26,
          padding: "clamp(36px,6vw,72px)",
          background: "var(--surface)",
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--accent), transparent 65%)",
            opacity: 0.16,
            filter: "blur(20px)",
          }}
        />

        <h2
          className="relative"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(28px,4.5vw,50px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            margin: 0,
            color: "var(--text)",
            textWrap: "balance",
          }}
        >
          {CTA.heading}
        </h2>
        <p
          className="relative mx-auto"
          style={{
            maxWidth: 520,
            margin: "18px auto 0",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--muted)",
          }}
        >
          {CTA.body}
        </p>

        <div
          className="relative flex flex-wrap gap-[14px] justify-center"
          style={{ marginTop: 34 }}
        >
          <WhatsAppButton source="cta" message={CTA.ctaMessage} label={CTA.ctaLabel} variant="primary" />
        </div>
      </div>
    </section>
  );
}
