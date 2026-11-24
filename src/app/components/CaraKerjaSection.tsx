import { CARA_KERJA_SECTION, SECTION_IDS } from "src/data/content";
import SectionHeader from "./SectionHeader";

/** Cara Kerja: the five steps from consultation to report. */
export default function CaraKerjaSection() {
  return (
    <section
      id={SECTION_IDS.caraKerja}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 40px" }}
    >
      <SectionHeader content={CARA_KERJA_SECTION} />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" style={{ margin: 0, padding: 0 }}>
        {CARA_KERJA_SECTION.steps.map((step, index) => (
          <li
            key={step.title}
            className="flex flex-col"
            style={{
              listStyle: "none",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: 18,
              padding: "20px 20px 22px",
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--gold)",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16.5,
                color: "var(--text)",
                margin: 0,
              }}
            >
              {step.title}
            </h3>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 13.5, lineHeight: 1.55 }}>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
