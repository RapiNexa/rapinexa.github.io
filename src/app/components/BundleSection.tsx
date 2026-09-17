import { BUNDLE, BUNDLE_SECTION, getServiceById } from "src/data/content";
import { formatRupiah } from "src/lib/currency";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Bundle section (ticket 05): a single gold-accented card for the Paket
 * Digital UMKM Bundle, sourced from `BUNDLE` in the content layer. Sits
 * directly after `LayananSection` in the Home route. Visually distinct from
 * a Service card via the `--gold`/`--gold-soft` tokens (the same tokens the
 * wordmark uses), not a one-off colour.
 */
export default function BundleSection() {
  return (
    <section
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "0 20px 80px" }}
    >
      <div
        style={{
          border: "1px solid var(--gold)",
          background: "var(--gold-soft)",
          borderRadius: 22,
          padding: "clamp(28px,5vw,48px)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          {BUNDLE_SECTION.heading}
        </span>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(22px,3.5vw,30px)",
            color: "var(--text)",
            margin: "10px 0 0",
          }}
        >
          {BUNDLE.name}
        </h3>

        <p
          style={{
            margin: "10px 0 0",
            maxWidth: 640,
            color: "var(--muted)",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          {BUNDLE.summary}
        </p>

        <ul
          style={{
            margin: "20px 0 0",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 8,
          }}
        >
          {BUNDLE.includes.map((include) => {
            const service = getServiceById(include.serviceId);
            return (
              <li
                key={include.serviceId}
                style={{
                  listStyle: "none",
                  display: "flex",
                  gap: 8,
                  fontSize: 14,
                  color: "var(--text)",
                }}
              >
                <span aria-hidden="true" style={{ color: "var(--gold)" }}>
                  ✓
                </span>
                <span>
                  {include.note}
                  {service ? ` — ${service.name}` : ""}
                </span>
              </li>
            );
          })}
        </ul>

        <div
          className="flex flex-wrap items-center"
          style={{ gap: "16px 28px", marginTop: 28 }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "clamp(22px,3vw,28px)",
              color: "var(--gold)",
            }}
          >
            {formatRupiah(BUNDLE.price)}
          </span>

          <WhatsAppButton
            source="bundle"
            message={BUNDLE.whatsappMessage}
            label={BUNDLE_SECTION.ctaLabel}
            variant="primary"
          />
        </div>

        <p style={{ margin: "18px 0 0", fontSize: 13, color: "var(--muted)" }}>
          {BUNDLE.reassurance}
        </p>
      </div>
    </section>
  );
}
