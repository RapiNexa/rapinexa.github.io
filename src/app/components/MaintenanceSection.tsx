import { MAINTENANCE_SECTION, SECTION_IDS } from "src/data/content";
import { formatRupiah } from "src/lib/currency";
import PriceCard from "./PriceCard";
import SectionHeader from "./SectionHeader";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Maintenance: opens with why an unmaintained website costs the business
 * (the four risks), then the two monthly care packages.
 */
export default function MaintenanceSection() {
  return (
    <section
      id={SECTION_IDS.maintenance}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 40px" }}
    >
      <SectionHeader content={MAINTENANCE_SECTION} />

      <div
        style={{
          border: "1px solid var(--border)",
          background: "var(--surface)",
          borderRadius: 18,
          padding: "22px 24px",
          marginBottom: 28,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 17,
            color: "var(--text)",
            margin: "0 0 16px",
          }}
        >
          {MAINTENANCE_SECTION.risksHeading}
        </h3>
        <ul className="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4" style={{ margin: 0, padding: 0 }}>
          {MAINTENANCE_SECTION.risks.map((risk) => {
            const Icon = risk.icon;
            return (
              <li key={risk.title} className="flex gap-3" style={{ listStyle: "none" }}>
                <Icon aria-hidden="true" size={20} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--text)" }}>{risk.title}</div>
                  <p style={{ margin: "4px 0 0", fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)" }}>
                    {risk.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="grid gap-5 md:grid-cols-2" style={{ margin: 0, padding: 0 }}>
        {MAINTENANCE_SECTION.packages.map((pkg) => (
          <PriceCard
            key={pkg.id}
            name={pkg.name}
            pricePrefix={pkg.priceFrom ? "mulai dari" : undefined}
            price={formatRupiah(pkg.monthlyPrice)}
            priceSuffix="/ bulan"
            description={pkg.audience}
            includes={pkg.includes}
            featured={pkg.featured}
            action={
              <WhatsAppButton
                source={`maintenance:${pkg.id}`}
                message={pkg.whatsappMessage}
                label={MAINTENANCE_SECTION.ctaLabel}
                variant={pkg.featured ? "primary" : "secondary"}
                className="w-full justify-center"
              />
            }
          />
        ))}
      </ul>
      <p className="text-center" style={{ margin: "18px 0 0", fontSize: 13, color: "var(--faint)" }}>
        {MAINTENANCE_SECTION.note}
      </p>
    </section>
  );
}
