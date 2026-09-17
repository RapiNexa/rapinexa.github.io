import BundleSection from "../../components/BundleSection";
import CtaSection from "../../components/CtaSection";
import Hero from "../../components/Hero";
import LayananSection from "../../components/LayananSection";
import PlatformSection from "../../components/PlatformSection";
import ProfileSection from "../../components/ProfileSection";

/**
 * Ticket 05 adds Layanan and Bundle between Profil singkat and Platform:
 * Hero, Profil singkat, Layanan, Bundle, Platform, CTA. The spec's final
 * order (Hero, Profil singkat, Layanan, Bundle, Karya, Platform, CTA) is
 * restored once ticket 06 adds Karya between Bundle and Platform.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProfileSection />
      <LayananSection />
      <BundleSection />
      <PlatformSection />
      <CtaSection />
    </>
  );
}
