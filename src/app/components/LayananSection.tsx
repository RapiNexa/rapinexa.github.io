import { LuArrowDown } from "react-icons/lu";
import { LAYANAN_SECTION, SECTION_IDS, SERVICE_LINES, type ServiceLine } from "src/data/content";
import { scrollToSection } from "src/lib/scroll";
import SectionHeader from "./SectionHeader";

/**
 * Layanan: the four service lines side by side, each with its starting
 * price, acting as a jump menu to the line's detail section. Sourced from
 * `SERVICE_LINES`, whose price labels derive from the detail sections.
 */
export default function LayananSection() {
  return (
    <section
      id={SECTION_IDS.layanan}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 40px" }}
    >
      <SectionHeader content={LAYANAN_SECTION} />
      <ul
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        style={{ margin: 0, padding: 0 }}
      >
        {SERVICE_LINES.map((line) => (
          <ServiceLineCard key={line.target} line={line} />
        ))}
      </ul>
    </section>
  );
}

function ServiceLineCard({ line }: { line: ServiceLine }) {
  const Icon = line.icon;

  return (
    <li style={{ listStyle: "none" }}>
      <a
        href={`#${line.target}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(line.target);
        }}
        className="group flex h-full flex-col no-underline transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)]"
        style={{
          border: "1px solid var(--border)",
          background: "var(--surface)",
          borderRadius: 18,
          padding: "22px 22px 20px",
          gap: 10,
          color: "inherit",
        }}
      >
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "var(--accent-soft)",
            color: "var(--accent-text)",
          }}
        >
          <Icon size={20} />
        </span>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 18,
            color: "var(--text)",
            margin: "4px 0 0",
          }}
        >
          {line.name}
        </h3>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{line.summary}</p>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 14,
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "6px 8px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 14,
              color: "var(--accent-text)",
              whiteSpace: "nowrap",
            }}
          >
            {line.priceLabel}
          </span>
          <span
            className="inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-y-0.5"
            style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)", whiteSpace: "nowrap" }}
          >
            {LAYANAN_SECTION.detailLabel}
            <LuArrowDown aria-hidden="true" size={14} />
          </span>
        </div>
      </a>
    </li>
  );
}
