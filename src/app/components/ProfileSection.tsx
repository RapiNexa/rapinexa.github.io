import { PROFILE } from "src/data/content";

/**
 * Profil singkat (ticket 04): a short company statement introducing
 * RapiNexa as a team. Ported from
 * `docs/reactjs/src/app/components/ProfileSection.tsx`; the statement now
 * renders `PROFILE.statement` segments from the content layer instead of a
 * hardcoded personal bio, so highlighted phrases are data, not markup.
 */
export default function ProfileSection() {
  return (
    <section
      className="mx-auto"
      style={{
        maxWidth: 1280,
        padding: "70px clamp(20px,5vw,40px)",
      }}
    >
      <div className="flex flex-wrap items-start" style={{ gap: "16px 60px" }}>
        <div style={{ flex: "0 0 auto" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "var(--accent-text)",
            }}
          >
            {PROFILE.eyebrow}
          </div>
        </div>
        <p
          style={{
            flex: "1 1 520px",
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(20px,2.5vw,30px)",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            textWrap: "pretty",
          }}
        >
          {PROFILE.statement.map((segment, i) =>
            segment.highlight ? (
              <span key={i} style={{ color: "var(--accent-text)" }}>
                {segment.text}
              </span>
            ) : (
              <span key={i}>{segment.text}</span>
            )
          )}
        </p>
      </div>
    </section>
  );
}
