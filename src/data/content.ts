/**
 * RapiNexa's typed content layer. Every section component imports its copy
 * from here instead of holding its own strings, so copywriting (ticket 09)
 * and data updates never require touching component code.
 *
 * Ticket 01 seeded site meta and the Hero. Ticket 02 adds Platforms. Ticket
 * 03 adds Navbar/Footer. Later tickets extend this module with Profile,
 * Services, Bundle, and Works — add new exports here rather than starting a
 * second content module.
 */

import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  SiCloudflare,
  SiFirebase,
  SiGooglecloud,
  SiGooglegemini,
  SiGooglesheets,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiWhatsapp,
  SiXendit,
} from "react-icons/si";

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
  /** Small label inside the HeroOrbit's core, e.g. "Tim Digital". */
  orbitLabel: string;
};

export const HERO: HeroContent = {
  eyebrow: "RapiNexa",
  headline: "Solusi Digital untuk UMKM Naik Kelas",
  subheadline:
    "Website, POS kasir, automasi sederhana, dan Video Shorts/Reels — dikerjakan oleh satu tim yang sama.",
  ctaLabel: "Chat via WhatsApp",
  ctaMessage:
    "Halo RapiNexa, saya ingin tanya-tanya soal layanan digital untuk usaha saya.",
  orbitLabel: "Tim Digital",
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

/**
 * A third-party technology RapiNexa can build on or integrate into a
 * Service (CONTEXT.md: Platform). Rendered as a logo — `icon` when
 * react-icons has one, otherwise the Platform section falls back to a
 * text label using `name`.
 *
 * `id` is a stable slug: Works reference Platforms by id (optional
 * `platforms` field, ticket 06/07) and the Hero orbit (ticket 04) picks a
 * subset by id via `getPlatformsByIds`.
 */
export type Platform = {
  id: string;
  name: string;
  icon?: IconType;
  brandColor?: string;
};

/**
 * The full Platform showcase. Add or remove an entry here to change the
 * Platform section's grid — no component change required.
 *
 * Icon coverage checked against the installed react-icons@5.7 Simple
 * Icons (`si`) set, falling back to Font Awesome 6 (`fa6`) brand icons,
 * per the ticket. Three Platforms have no icon in either set and render
 * as text labels: OpenAI (`si` only ships `SiOpenaigym`, not a plain
 * OpenAI mark, in this version), React Native (Simple Icons has no mark
 * distinct from React's), and Midtrans (no Indonesian payment-gateway
 * icon in either set). Xendit *does* have a Simple Icons mark
 * (`SiXendit`), despite the ticket flagging it alongside Midtrans as a
 * likely fallback.
 *
 * `brandColor` is an approximate, best-effort brand colour used only as
 * a subtle hover accent (see `.platform-tile:hover` in app.css) — it is
 * not a pixel-exact brand compliance value. Platforms with a neutral/
 * monochrome mark (Next.js) omit it and hover to the site's purple
 * accent instead.
 */
export const PLATFORMS: Platform[] = [
  { id: "openai", name: "OpenAI", brandColor: "#10A37F" },
  { id: "google-gemini", name: "Google Gemini", icon: SiGooglegemini, brandColor: "#4285F4" },
  { id: "google-cloud", name: "Google Cloud", icon: SiGooglecloud, brandColor: "#4285F4" },
  { id: "aws", name: "AWS", icon: FaAws, brandColor: "#FF9900" },
  { id: "cloudflare", name: "Cloudflare", icon: SiCloudflare, brandColor: "#F38020" },
  { id: "laravel", name: "Laravel", icon: SiLaravel, brandColor: "#FF2D20" },
  { id: "react", name: "React", icon: SiReact, brandColor: "#61DAFB" },
  { id: "react-native", name: "React Native", brandColor: "#61DAFB" },
  { id: "nextjs", name: "Next.js", icon: SiNextdotjs },
  { id: "whatsapp", name: "WhatsApp", icon: SiWhatsapp, brandColor: "#25D366" },
  { id: "google-sheets", name: "Google Sheets", icon: SiGooglesheets, brandColor: "#0F9D58" },
  { id: "xendit", name: "Xendit", icon: SiXendit, brandColor: "#3D5AFE" },
  { id: "midtrans", name: "Midtrans", brandColor: "#0693E3" },
  { id: "firebase", name: "Firebase", icon: SiFirebase, brandColor: "#FFCA28" },
];

/**
 * Looks up Platforms by id, preserving `ids`' order and silently dropping
 * unknown ids. Exported for ticket 04's Hero orbit, which renders a
 * selection of Platforms rather than the full list.
 */
export function getPlatformsByIds(ids: readonly string[]): Platform[] {
  const byId = new Map(PLATFORMS.map((platform) => [platform.id, platform] as const));
  return ids
    .map((id) => byId.get(id))
    .filter((platform): platform is Platform => platform !== undefined);
}

/**
 * The Platform selection shown as HeroOrbit chips (ticket 04) — ids into
 * `PLATFORMS`, resolved via `getPlatformsByIds`. A curated, recognisable
 * subset rather than the full showcase list; reordering or swapping ids
 * here changes the orbit chips with zero component changes.
 */
export const HERO_ORBIT_PLATFORM_IDS: string[] = [
  "laravel",
  "react",
  "nextjs",
  "react-native",
  "whatsapp",
  "xendit",
  "google-sheets",
];

export type PlatformSectionContent = {
  heading: string;
  subheading?: string;
};

export const PLATFORM_SECTION: PlatformSectionContent = {
  heading: "Platform yang kami dukung",
  subheading:
    "Sebagian teknologi dan layanan pihak ketiga yang bisa RapiNexa integrasikan ke dalam Layanan Anda.",
};

/**
 * "RapiNexa" rendered as live text (not an image) in the display font using
 * the gold token — the Navbar and Footer wordmark. Ticket 08 adds an image
 * logo mark next to it; both components already reserve an empty slot for
 * that mark so this stays a copy-only change.
 */
export const WORDMARK = "RapiNexa";

export type NavLink = {
  /** One of `SECTION_IDS` — the anchor the link smooth-scrolls to. */
  id: SectionId;
  label: string;
};

export type NavbarContent = {
  links: NavLink[];
  whatsappLabel: string;
  whatsappMessage: string;
  themeToggleLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
};

/**
 * Navbar copy (ticket 03). `links` order is the render order for both the
 * desktop nav and the mobile drawer. Layanan and Karya don't have rendered
 * sections yet (tickets 05/06) — the Navbar must scroll to them gracefully
 * without throwing once they exist, and no-op safely until then.
 */
export const NAVBAR: NavbarContent = {
  links: [
    { id: SECTION_IDS.layanan, label: "Layanan" },
    { id: SECTION_IDS.karya, label: "Karya" },
    { id: SECTION_IDS.platform, label: "Platform" },
  ],
  whatsappLabel: "Chat WhatsApp",
  whatsappMessage:
    "Halo RapiNexa, saya ingin tanya-tanya soal layanan digital untuk usaha saya.",
  themeToggleLabel: "Ganti tema",
  menuOpenLabel: "Buka menu",
  menuCloseLabel: "Tutup menu",
};

export type FooterContent = {
  /** Exact, decided copy — CONTEXT.md/spec: "Melayani seluruh Indonesia". */
  serviceArea: string;
  whatsappLabel: string;
  whatsappMessage: string;
};

export const FOOTER: FooterContent = {
  serviceArea: "Melayani seluruh Indonesia",
  whatsappLabel: "Chat WhatsApp",
  whatsappMessage:
    "Halo RapiNexa, saya ingin tanya-tanya soal layanan digital untuk usaha saya.",
};

/**
 * One segment of the Profil singkat statement. `highlight` marks a phrase
 * to be rendered in the accent colour — the statement is data, not markup,
 * so ProfileSection never parses copy for emphasis syntax.
 */
export type ProfileStatementSegment = {
  text: string;
  highlight?: boolean;
};

export type ProfileContent = {
  eyebrow: string;
  statement: ProfileStatementSegment[];
};

/**
 * Profil singkat (ticket 04): a short company statement introducing
 * RapiNexa as a team, not an individual freelancer. Placeholder copy —
 * ticket 09 replaces the text, not the shape.
 */
export const PROFILE: ProfileContent = {
  eyebrow: "Profil Singkat",
  statement: [
    { text: "RapiNexa adalah " },
    { text: "tim developer software", highlight: true },
    { text: " yang membantu UMKM Indonesia go digital lewat " },
    {
      text: "website, POS kasir, automasi sederhana, dan Video Shorts/Reels",
      highlight: true,
    },
    {
      text: ". Setiap Layanan dikerjakan oleh tim yang sama — bukan freelancer perorangan — supaya kualitas dan dukungan tetap konsisten.",
    },
  ],
};

/**
 * One Website-bisnis-only pricing option (ticket 05: Landing Page vs
 * Company Profile All-In). Both fields are required — an option without its
 * own Starting price would be meaningless, so there's no optional escape
 * hatch here.
 */
export type ServiceOption = {
  name: string;
  startingPrice: number;
};

/**
 * A productized offering RapiNexa sells (CONTEXT.md: Service). `id` is a
 * stable slug reused as the WhatsApp CTA's `source: service:<id>` and as
 * the Bundle's `includes[].serviceId` reference — renaming it is a breaking
 * change for both.
 *
 * `startingPrice` is required even for Website bisnis, which also carries
 * `options`: it's the headline "mulai dari" figure (the cheaper option's
 * price) for anywhere a single number is needed, while `options` drives the
 * two-line breakdown on the card itself. Every other Service has no
 * `options` and renders `startingPrice` alone.
 *
 * All fields but `priceNote` and `options` are required by design: a
 * Service entry missing `whatsappMessage` or `startingPrice` must fail
 * `yarn typecheck`, not silently render as `undefined` (spec "Testing
 * Decisions" / ticket 05 acceptance criteria).
 */
export type Service = {
  id: string;
  name: string;
  summary: string;
  /** Short bullet list of what's included, rendered as-is (no markup). */
  includes: string[];
  startingPrice: number;
  /** e.g. "sekali bayar, tanpa biaya langganan", "maks. 48 jam". */
  priceNote?: string;
  /** Website-bisnis-only: Landing Page vs Company Profile All-In. */
  options?: ServiceOption[];
  whatsappMessage: string;
};

/**
 * The four Services RapiNexa sells (ticket 05). Facts (prices, options,
 * notes) are fixed per the ticket/spec, sourced from
 * `docs/notebooks/template-proposal-penawaran.md`; copy is placeholder
 * until ticket 09. Changing a price here changes it everywhere the price
 * is rendered — no component holds its own copy of a number.
 */
export const SERVICES: Service[] = [
  {
    id: "website-bisnis",
    name: "Website Bisnis",
    summary:
      "Website rapi dan mobile-friendly untuk memperkenalkan usaha Anda secara online, dari satu halaman hingga profil lengkap.",
    includes: [
      "Desain rapi & mobile-friendly",
      "Terhubung langsung ke WhatsApp",
      "Company Profile All-In: tanpa batas jumlah halaman untuk konten profil standar",
    ],
    startingPrice: 249_000,
    priceNote: "Domain & hosting dibayar langsung oleh Anda.",
    options: [
      { name: "Landing Page", startingPrice: 249_000 },
      { name: "Company Profile All-In", startingPrice: 1_249_000 },
    ],
    whatsappMessage:
      "Halo RapiNexa, saya tertarik dengan Layanan Website Bisnis (Landing Page / Company Profile All-In). Boleh minta info lebih lanjut?",
  },
  {
    id: "video-shorts-reels",
    name: "Video Shorts/Reels",
    summary:
      "Ubah video panjang, webinar, atau materi edukasi Anda menjadi 5 video vertikal siap TikTok, Instagram Reels, dan YouTube Shorts.",
    includes: [
      "5 video vertikal format 9:16",
      "Pemilihan hook & subtitle rapi",
      "1x revisi gabungan",
    ],
    startingPrice: 150_000,
    priceNote: "Maks. 48 jam pengerjaan.",
    whatsappMessage:
      "Halo RapiNexa, saya tertarik dengan Layanan Video Shorts/Reels. Boleh minta info lebih lanjut?",
  },
  {
    id: "pos-kasir-standard",
    name: "POS Kasir Standard",
    summary:
      "Sistem kasir sederhana untuk Android atau browser komputer, untuk UMKM yang masih mencatat transaksi secara manual.",
    includes: ["Transaksi kasir untuk Android atau browser", "Daftar produk", "Laporan harian"],
    startingPrice: 499_000,
    priceNote: "Sekali bayar, tanpa biaya langganan.",
    whatsappMessage:
      "Halo RapiNexa, saya tertarik dengan Layanan POS Kasir Standard. Boleh minta info lebih lanjut?",
  },
  {
    id: "automation-sederhana",
    name: "Automation Sederhana",
    summary:
      "Pencatatan pesanan, calon pelanggan, follow-up, atau laporan otomatis ke spreadsheet agar operasional lebih rapi.",
    includes: [
      "Pencatatan otomatis ke spreadsheet",
      "Pesanan, calon pelanggan, atau follow-up",
      "Laporan operasional lebih rapi",
    ],
    startingPrice: 150_000,
    priceNote: "Harga tergantung kebutuhan.",
    whatsappMessage:
      "Halo RapiNexa, saya tertarik dengan Layanan Automation Sederhana. Boleh minta info lebih lanjut?",
  },
];

/** Looks up a single Service by id, e.g. for resolving a Bundle's `includes`. */
export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}

export type LayananSectionContent = {
  heading: string;
  subheading?: string;
  /** Shared WhatsApp button label for every Service card. */
  ctaLabel: string;
};

export const LAYANAN_SECTION: LayananSectionContent = {
  heading: "Layanan Kami",
  subheading: "Pilih Layanan yang paling sesuai dengan kebutuhan bisnis Anda.",
  ctaLabel: "Chat via WhatsApp",
};

/** One Service referenced from the Bundle, with its own quantity/notes. */
export type BundleInclude = {
  serviceId: string;
  /** e.g. "1x landing page", "5x Video Shorts/Reels". */
  note: string;
};

/**
 * A named combination of Services sold at one fixed price (CONTEXT.md:
 * Bundle). Unlike a Service, `price` is not a Starting price — it's rendered
 * with `formatRupiah` alone, never `formatStartingPrice`.
 */
export type Bundle = {
  name: string;
  price: number;
  includes: BundleInclude[];
  summary: string;
  /** The "you don't need to buy everything" reassurance line. */
  reassurance: string;
  whatsappMessage: string;
};

/**
 * The only Bundle RapiNexa currently sells (ticket 05). `includes`
 * references `SERVICES` ids — resolve names via `getServiceById`.
 */
export const BUNDLE: Bundle = {
  name: "Paket Digital UMKM",
  price: 1_499_000,
  includes: [
    { serviceId: "website-bisnis", note: "1x landing page" },
    { serviceId: "video-shorts-reels", note: "5x Video Shorts/Reels" },
    { serviceId: "pos-kasir-standard", note: "1x POS Kasir Standard" },
    { serviceId: "automation-sederhana", note: "1x automation sederhana" },
  ],
  summary:
    "Ambil landing page, Video Shorts/Reels, POS Kasir Standard, dan automation sederhana sekaligus dengan harga lebih hemat.",
  reassurance:
    "Tidak perlu ambil semuanya — tim RapiNexa bisa bantu pilih Layanan yang paling relevan untuk usaha Anda.",
  whatsappMessage:
    "Halo RapiNexa, saya tertarik dengan Paket Digital UMKM. Boleh minta info lebih lanjut?",
};

export type BundleSectionContent = {
  /** Eyebrow label above the Bundle card, distinct from `BUNDLE.name`. */
  heading: string;
  ctaLabel: string;
};

export const BUNDLE_SECTION: BundleSectionContent = {
  heading: "Bundle Hemat",
  ctaLabel: "Chat via WhatsApp",
};

export type CtaContent = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaMessage: string;
};

/**
 * Closing CTA section (ticket 04): the last thing a visitor sees before the
 * Footer, inviting them to chat on WhatsApp.
 */
export const CTA: CtaContent = {
  heading: "Siap bantu usaha Anda go digital?",
  body: "Chat langsung dengan tim RapiNexa untuk konsultasi gratis soal Layanan yang paling cocok untuk usaha Anda.",
  ctaLabel: "Chat via WhatsApp",
  ctaMessage:
    "Halo RapiNexa, saya ingin konsultasi soal layanan digital untuk usaha saya.",
};
