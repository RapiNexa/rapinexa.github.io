import { SECTION_IDS, WEBSITE_SECTION } from "src/data/content";
import { formatRupiah } from "src/lib/currency";
import PriceCard from "./PriceCard";
import SectionHeader from "./SectionHeader";
import WhatsAppButton from "./WhatsAppButton";

/** Pembuatan Website: the three Website tiers with their starting prices. */
export default function WebsiteSection() {
  return (
    <section
      id={SECTION_IDS.website}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 40px" }}
    >
      <SectionHeader content={WEBSITE_SECTION} />
      <ul className="grid gap-5 md:grid-cols-3" style={{ margin: 0, padding: 0 }}>
        {WEBSITE_SECTION.tiers.map((tier) => (
          <PriceCard
            key={tier.id}
            name={tier.name}
            pricePrefix="mulai dari"
            price={formatRupiah(tier.startingPrice)}
            description={tier.summary}
            featured={tier.featured}
            action={
              <WhatsAppButton
                source={`website:${tier.id}`}
                message={tier.whatsappMessage}
                label={WEBSITE_SECTION.ctaLabel}
                variant={tier.featured ? "primary" : "secondary"}
                className="w-full justify-center"
              />
            }
          />
        ))}
      </ul>
      <p className="text-center" style={{ margin: "18px 0 0", fontSize: 13, color: "var(--faint)" }}>
        {WEBSITE_SECTION.note}
      </p>
    </section>
  );
}
