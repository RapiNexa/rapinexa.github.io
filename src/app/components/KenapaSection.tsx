import { KENAPA_SECTION, SECTION_IDS } from "src/data/content";
import FeatureCardItem from "./FeatureCardItem";
import SectionHeader from "./SectionHeader";

/** Kenapa RapiNexa: four reasons to choose RapiNexa, just before the CTA. */
export default function KenapaSection() {
  return (
    <section
      id={SECTION_IDS.kenapa}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "80px 20px 20px" }}
    >
      <SectionHeader content={KENAPA_SECTION} />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" style={{ margin: 0, padding: 0 }}>
        {KENAPA_SECTION.reasons.map((reason) => (
          <FeatureCardItem key={reason.title} card={reason} />
        ))}
      </ul>
    </section>
  );
}
