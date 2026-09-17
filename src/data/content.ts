/**
 * RapiNexa's typed content layer. Every section component imports its copy
 * from here instead of holding its own strings, so copywriting (ticket 09)
 * and data updates never require touching component code.
 *
 * Ticket 01 seeds only what the tracer-bullet Home page needs: site meta and
 * the Hero. Later tickets extend this module with Profile, Services,
 * Bundle, Works, Platforms, and section headings — add new exports here
 * rather than starting a second content module.
 */

export type SiteMeta = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

export const SITE_META: SiteMeta = {
  title: "RapiNexa — Solusi Digital untuk UMKM",
  description:
    "RapiNexa membantu UMKM Indonesia go digital lewat website, POS kasir, automasi sederhana, dan Video Shorts/Reels dengan harga terjangkau.",
  ogTitle: "RapiNexa — Solusi Digital untuk UMKM",
  ogDescription:
    "Layanan digital untuk UMKM Indonesia: website, POS kasir, automasi sederhana, dan Video Shorts/Reels.",
  ogImage: "/assets/brand/rapinexa-mark.png",
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaMessage: string;
};

export const HERO: HeroContent = {
  eyebrow: "RapiNexa",
  headline: "Solusi Digital untuk UMKM Naik Kelas",
  subheadline:
    "Website, POS kasir, automasi sederhana, dan Video Shorts/Reels — dikerjakan oleh satu tim yang sama.",
  ctaLabel: "Chat via WhatsApp",
  ctaMessage:
    "Halo RapiNexa, saya ingin tanya-tanya soal layanan digital untuk usaha saya.",
};

/**
 * Section anchor ids shared by the Navbar (ticket 03) and the Layanan/Karya/
 * Platform sections (tickets 05/06/02) so every in-page link and heading
 * agrees on the same id.
 */
export const SECTION_IDS = {
  layanan: "layanan",
  karya: "karya",
  platform: "platform",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
