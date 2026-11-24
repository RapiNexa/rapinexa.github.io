import { LuCheck } from "react-icons/lu";
import { PERBAIKAN_SECTION, SECTION_IDS, type PerbaikanGroup } from "src/data/content";
import SectionHeader from "./SectionHeader";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Perbaikan & Fitur: work outside the maintenance packages, in two
 * columns (repair, development), each with its own pricing note and CTA.
 */
export default function PerbaikanSection() {
  return (
    <section
      id={SECTION_IDS.perbaikan}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 40px" }}
    >
      <SectionHeader content={PERBAIKAN_SECTION} />
      <div className="grid gap-5 md:grid-cols-2">
        {PERBAIKAN_SECTION.groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}

function GroupCard({ group }: { group: PerbaikanGroup }) {
  return (
    <div
      className="flex flex-col"
      style={{
        border: "1px solid var(--border)",
        background: "var(--surface)",
        borderRadius: 18,
        padding: "26px 24px",
        gap: 18,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11.5,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--accent-text)",
          }}
        >
          {group.title}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 20,
            color: "var(--text)",
            margin: "6px 0 0",
          }}
        >
          {group.heading}
        </h3>
      </div>

      <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
        {group.items.map((item) => (
          <li key={item.title} className="flex gap-3" style={{ listStyle: "none" }}>
            <LuCheck aria-hidden="true" size={16} style={{ color: "var(--accent-text)", flexShrink: 0, marginTop: 3 }} />
            <div style={{ fontSize: 14, lineHeight: 1.55 }}>
              <span style={{ fontWeight: 700, color: "var(--text)" }}>{item.title}</span>
              <span style={{ color: "var(--muted)" }}> — {item.body}</span>
            </div>
          </li>
        ))}
      </ul>

      <div
        className="flex flex-col gap-3"
        style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--border)" }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--faint)" }}>{group.note}</p>
        <WhatsAppButton
          source={`perbaikan:${group.id}`}
          message={group.whatsappMessage}
          label={group.ctaLabel}
          variant="secondary"
          className="justify-center"
        />
      </div>
    </div>
  );
}
