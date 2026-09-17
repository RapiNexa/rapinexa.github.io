import { LAYANAN_SECTION, SECTION_IDS, SERVICES, type Service } from "src/data/content";
import { formatStartingPrice } from "src/lib/currency";
import WhatsAppButton from "./WhatsAppButton";
import type { BaseProps } from "src/types/utilities";
import clsx from "clsx";

/**
 * Layanan section (ticket 05): one card per Service, sourced entirely from
 * `SERVICES` in the content layer — adding/removing/reordering an entry
 * there changes the rendered cards with no change to this component. See
 * `BundleSection` for the gold-accented Bundle card that sits directly
 * below it.
 */
export default function LayananSection() {
  return (
    <section
      id={SECTION_IDS.layanan}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 40px" }}
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
          {LAYANAN_SECTION.heading}
        </h2>
        {LAYANAN_SECTION.subheading ? (
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
            {LAYANAN_SECTION.subheading}
          </p>
        ) : null}
      </div>

      <ul
        className="grid grid-cols-12 gap-5"
        style={{
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        {SERVICES.map((service, index) => (
          <li key={service.id} className={clsx([
            "lg:col-span-4 md:col-span-5 sm:col-span-6 col-span-12",
            (index + 1) % 2 === 1 && "lg:col-start-3 md:col-start-2"
          ])}>
            <ServiceCard className="min-h-full" service={service} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ServiceCard({ className, service }: BaseProps & { service: Service }) {
  return (
    <div
      className={clsx(["flex flex-col", className])}
      style={{
        listStyle: "none",
        border: "1px solid var(--border)",
        background: "var(--surface)",
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
        {service.name}
      </h3>

      <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
        {service.summary}
      </p>

      <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {service.includes.map((item) => (
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
            <span aria-hidden="true" style={{ color: "var(--accent-text)" }}>
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        {service.options ? (
          service.options.map((option) => (
            <div
              key={option.name}
              className="flex items-baseline justify-between"
              style={{ gap: 12 }}
            >
              <span style={{ fontSize: 13, color: "var(--muted)" }}>{option.name}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--accent-text)",
                }}
              >
                {formatStartingPrice(option.startingPrice)}
              </span>
            </div>
          ))
        ) : (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: 15,
              color: "var(--accent-text)",
            }}
          >
            {formatStartingPrice(service.startingPrice)}
          </span>
        )}

        {service.priceNote ? (
          <p style={{ margin: 0, fontSize: 12, color: "var(--faint)" }}>{service.priceNote}</p>
        ) : null}
      </div>

      <WhatsAppButton
        source={`service:${service.id}`}
        message={service.whatsappMessage}
        label={LAYANAN_SECTION.ctaLabel}
        variant="secondary"
        className="justify-center"
      />
    </div>
  );
}
