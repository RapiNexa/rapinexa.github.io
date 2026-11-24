import clsx from "clsx";
import type { SectionHeaderContent } from "src/data/content";

type SectionHeaderProps = {
  content: SectionHeaderContent;
  align?: "center" | "left";
  className?: string;
};

/**
 * The eyebrow + heading + lead block every page section opens with.
 * `content.highlight`, when it appears in the heading, is rendered in the
 * accent colour.
 */
export default function SectionHeader({ content, align = "center", className }: SectionHeaderProps) {
  const { eyebrow, heading, highlight, lead } = content;
  const centered = align === "center";

  return (
    <div className={clsx(centered && "text-center", className)} style={{ marginBottom: 40 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "var(--accent-text)",
          marginBottom: 12,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(24px,4vw,36px)",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          color: "var(--text)",
          margin: 0,
          textWrap: "balance",
        }}
      >
        <HighlightedText text={heading} highlight={highlight} />
      </h2>
      {lead ? (
        <p
          className={clsx(centered && "mx-auto")}
          style={{
            maxWidth: 600,
            marginTop: 12,
            marginBottom: 0,
            color: "var(--muted)",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

function HighlightedText({ text, highlight }: { text: string; highlight?: string }) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || index < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span style={{ color: "var(--accent-text)" }}>{highlight}</span>
      {text.slice(index + highlight.length)}
    </>
  );
}
