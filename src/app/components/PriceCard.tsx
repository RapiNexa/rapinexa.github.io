import clsx from "clsx";
import type { ReactNode } from "react";
import { LuCheck } from "react-icons/lu";

type PriceCardProps = {
  name: string;
  /** Small line above the price, e.g. "mulai dari". */
  pricePrefix?: string;
  price: string;
  /** Small text after the price, e.g. "/ bulan". */
  priceSuffix?: string;
  description: string;
  includes?: string[];
  featured?: boolean;
  /** The card's CTA, rendered at the bottom. */
  action: ReactNode;
  className?: string;
};

/**
 * A priced offer card (Website tier, Maintenance package). `featured`
 * gives it the accent border and tint, like the deck's dark card.
 */
export default function PriceCard({
  name,
  pricePrefix,
  price,
  priceSuffix,
  description,
  includes,
  featured,
  action,
  className,
}: PriceCardProps) {
  return (
    <li
      className={clsx("flex flex-col", className)}
      style={{
        listStyle: "none",
        border: `1px solid ${featured ? "var(--accent)" : "var(--border)"}`,
        background: featured
          ? "linear-gradient(180deg, var(--accent-soft), var(--surface) 70%)"
          : "var(--surface)",
        boxShadow: featured ? "0 18px 50px var(--accent-soft)" : undefined,
        borderRadius: 18,
        padding: "26px 24px",
        gap: 14,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 19,
          color: "var(--text)",
          margin: 0,
        }}
      >
        {name}
      </h3>

      <div>
        {pricePrefix ? (
          <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{pricePrefix}</div>
        ) : null}
        <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 6 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "clamp(22px,2.6vw,26px)",
              color: "var(--accent-text)",
            }}
          >
            {price}
          </span>
          {priceSuffix ? <span style={{ fontSize: 13, color: "var(--muted)" }}>{priceSuffix}</span> : null}
        </div>
      </div>

      <p
        style={{
          margin: 0,
          paddingTop: 14,
          borderTop: "1px solid var(--border)",
          color: "var(--muted)",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>

      {includes && includes.length > 0 ? (
        <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 7 }}>
          {includes.map((item) => (
            <li
              key={item}
              style={{
                listStyle: "none",
                display: "flex",
                gap: 8,
                fontSize: 13.5,
                lineHeight: 1.5,
                color: "var(--text)",
              }}
            >
              <LuCheck aria-hidden="true" size={16} style={{ color: "var(--accent-text)", flexShrink: 0, marginTop: 2 }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div style={{ marginTop: "auto", paddingTop: 6 }}>{action}</div>
    </li>
  );
}
