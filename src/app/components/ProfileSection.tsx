import { ABOUT, SECTION_IDS } from "src/data/content";
import FeatureCardItem from "./FeatureCardItem";
import SectionHeader from "./SectionHeader";

/**
 * Tentang Kami: who RapiNexa is, followed by the three outcomes it helps
 * with (dikenal, rapi, terawat). Copy from `ABOUT` in the content layer.
 */
export default function ProfileSection() {
  return (
    <section
      id={SECTION_IDS.tentang}
      className="mx-auto w-full"
      style={{ maxWidth: 1080, padding: "70px 20px 40px" }}
    >
      <SectionHeader content={ABOUT} align="left" />
      <ul
        className="grid gap-5 sm:grid-cols-3"
        style={{ margin: 0, padding: 0 }}
      >
        {ABOUT.points.map((point) => (
          <FeatureCardItem key={point.title} card={point} />
        ))}
      </ul>
    </section>
  );
}
