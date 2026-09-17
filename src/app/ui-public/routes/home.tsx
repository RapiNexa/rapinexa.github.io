import CtaSection from "../../components/CtaSection";
import Hero from "../../components/Hero";
import PlatformSection from "../../components/PlatformSection";
import ProfileSection from "../../components/ProfileSection";

/**
 * Ticket 04 adds Profil singkat and the closing CTA, and moves Platform
 * after Profil singkat: Hero, Profil singkat, Platform, CTA. The spec's
 * final order (Hero, Profil singkat, Layanan, Bundle, Karya, Platform,
 * CTA) is restored once tickets 05–06 add the sections that belong between
 * Profil singkat and Platform.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProfileSection />
      <PlatformSection />
      <CtaSection />
    </>
  );
}
