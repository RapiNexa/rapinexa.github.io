import { getPlatformsByIds, KARYA_SECTION, SECTION_IDS, WORKS, type Work } from "src/data/content";
import WorkGallery from "./WorkGallery";

/**
 * Karya section (ticket 06): one card per Client, sourced entirely from
 * `WORKS` in the content layer — adding/removing a Work there changes the
 * rendered cards with no change to this component (verified by the ticket's
 * "add a third Work" check). See `WorkGallery` for the screenshot/PhotoSwipe
 * behaviour and the initials-placeholder fallback.
 *
 * Ported from `docs/reactjs/src/app/components/FeaturedProjects.tsx`,
 * reworked to one card per Client instead of per individual project, and
 * with the "All projects" link to `/projects` removed entirely — this site
 * has no projects route (spec: Out of Scope).
 */
export default function KaryaSection() {
  return (
    <section
      id={SECTION_IDS.karya}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px" }}
    >
      <div className="text-center" style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(24px,4vw,36px)",
            color: "var(--text)",
            margin: 0,
          }}
        >
          {KARYA_SECTION.heading}
        </h2>
        {KARYA_SECTION.subheading ? (
          <p
            className="mx-auto"
            style={{
              maxWidth: 520,
              marginTop: 12,
              color: "var(--muted)",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {KARYA_SECTION.subheading}
          </p>
        ) : null}
      </div>

      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          margin: 0,
          padding: 0,
        }}
      >
        {WORKS.map((work) => (
          <WorkCard key={work.client} work={work} />
        ))}
      </ul>
    </section>
  );
}

function WorkCard({ work }: { work: Work }) {
  const platforms = work.platforms ? getPlatformsByIds(work.platforms) : [];

  return (
    <li
      className="flex flex-col overflow-hidden"
      style={{
        listStyle: "none",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        borderRadius: 18,
      }}
    >
      <WorkGallery
        screenshots={work.screenshots}
        clientName={work.client}
        initials={work.initials}
        style={{ borderBottom: "1px solid var(--border)" }}
      />

      <div className="flex flex-col" style={{ padding: 20, gap: 12 }}>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 19,
            color: "var(--text)",
            margin: 0,
          }}
        >
          {work.client}
        </h3>

        <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
          {work.summary}
        </p>

        <ul
          className="flex flex-wrap"
          style={{ margin: 0, padding: 0, gap: 8 }}
        >
          {work.deliverables.map((deliverable) => (
            <li
              key={deliverable}
              style={{
                listStyle: "none",
                padding: "5px 12px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "var(--bg2)",
                fontSize: 12.5,
                color: "var(--text)",
              }}
            >
              {deliverable}
            </li>
          ))}
        </ul>

        {platforms.length > 0 ? (
          <ul
            className="flex flex-wrap"
            style={{ margin: 0, padding: 0, gap: 6 }}
          >
            {platforms.map((platform) => (
              <li
                key={platform.id}
                style={{
                  listStyle: "none",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                  color: "var(--accent-text)",
                  background: "var(--accent-soft)",
                }}
              >
                {platform.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
