import Hero from "../../components/Hero";
import PlatformSection from "../../components/PlatformSection";

/**
 * Ticket 02 appends Platform directly after Hero as a placeholder position.
 * The spec's final order (Hero, Profil singkat, Layanan, Bundle, Karya,
 * Platform, CTA) is restored once tickets 05–07 add the sections that
 * belong between them.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <PlatformSection />
    </>
  );
}
