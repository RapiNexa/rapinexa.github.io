import BundleSection from "../../components/BundleSection";
import CtaSection from "../../components/CtaSection";
import Hero from "../../components/Hero";
import KaryaSection from "../../components/KaryaSection";
import LayananSection from "../../components/LayananSection";
import PlatformSection from "../../components/PlatformSection";
import ProfileSection from "../../components/ProfileSection";

/**
 * Ticket 06 inserts Karya between Bundle and Platform, completing the
 * spec's final Home order: Hero, Profil singkat, Layanan, Bundle, Karya,
 * Platform, CTA.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProfileSection />
      <LayananSection />
      <BundleSection />
      <KaryaSection />
      <PlatformSection />
      <CtaSection />
    </>
  );
}
