import { APLIKASI_SECTION, SECTION_IDS } from "src/data/content";
import FeatureCardItem from "./FeatureCardItem";
import SectionHeader from "./SectionHeader";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Aplikasi Web Bisnis: the kinds of business web apps RapiNexa builds.
 * Priced per scope, so one shared consultation CTA instead of per-card
 * prices.
 */
export default function AplikasiSection() {
  return (
    <section
      id={SECTION_IDS.aplikasi}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 40px" }}
    >
      <SectionHeader content={APLIKASI_SECTION} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ margin: 0, padding: 0 }}>
        {APLIKASI_SECTION.items.map((item) => (
          <FeatureCardItem key={item.title} card={item} />
        ))}
      </ul>
      <div className="flex flex-col items-center gap-4" style={{ marginTop: 28 }}>
        <p className="text-center" style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
          {APLIKASI_SECTION.priceNote}
        </p>
        <WhatsAppButton
          source="aplikasi"
          message={APLIKASI_SECTION.whatsappMessage}
          label={APLIKASI_SECTION.ctaLabel}
          variant="secondary"
        />
      </div>
    </section>
  );
}
