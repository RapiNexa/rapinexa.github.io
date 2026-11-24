import clsx from "clsx";
import type { FeatureCard } from "src/data/content";

type FeatureCardItemProps = {
  card: FeatureCard;
  className?: string;
};

/** Icon + title + one sentence, the card shape shared by several sections. */
export default function FeatureCardItem({ card, className }: FeatureCardItemProps) {
  const Icon = card.icon;

  return (
    <li
      className={clsx("flex flex-col", className)}
      style={{
        listStyle: "none",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        borderRadius: 18,
        padding: "22px 22px 24px",
        gap: 10,
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
          fontSize: 17,
          color: "var(--text)",
          margin: "4px 0 0",
        }}
      >
        {card.title}
      </h3>
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
    </li>
  );
}
