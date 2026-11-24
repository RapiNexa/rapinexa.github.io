import AplikasiSection from "../../components/AplikasiSection";
import CaraKerjaSection from "../../components/CaraKerjaSection";
import CtaSection from "../../components/CtaSection";
import Hero from "../../components/Hero";
import KaryaSection from "../../components/KaryaSection";
import KenapaSection from "../../components/KenapaSection";
import LayananSection from "../../components/LayananSection";
import MaintenanceSection from "../../components/MaintenanceSection";
import PerbaikanSection from "../../components/PerbaikanSection";
import PlatformSection from "../../components/PlatformSection";
import ProfileSection from "../../components/ProfileSection";
import WebsiteSection from "../../components/WebsiteSection";

/**
 * Home follows the company-profile deck's order: Hero, Tentang, Layanan
 * (jump menu to the four service lines), Website, Aplikasi, Karya,
 * Teknologi, Maintenance, Perbaikan & Fitur, Cara Kerja, Kenapa RapiNexa,
 * CTA.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProfileSection />
      <LayananSection />
      <WebsiteSection />
      <AplikasiSection />
      <KaryaSection />
      <PlatformSection />
      <MaintenanceSection />
      <PerbaikanSection />
      <CaraKerjaSection />
      <KenapaSection />
      <CtaSection />
    </>
  );
}
