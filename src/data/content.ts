/**
 * RapiNexa's typed content layer. Every section component imports its copy
 * from here instead of holding its own strings, so copywriting
 * and data updates never require touching component code.
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
  ogUrl: string;
};

export const SITE_META: SiteMeta = {
  title: "RapiNexa — Solusi Digital untuk UMKM",
  description:
    "Website, POS kasir, video Shorts/Reels, dan pencatatan otomatis untuk UMKM. Kenali layanan RapiNexa dan diskusikan kebutuhan usaha Anda lewat WhatsApp.",
  ogTitle: "RapiNexa — Solusi Digital untuk UMKM",
  ogDescription:
    "Bantu pelanggan mengenal usaha Anda dan rapikan operasional bersama RapiNexa. Lihat layanan, harga mulai dari, dan karya kami untuk bisnis Indonesia.",
  ogImage: "https://rapinexa.github.io/assets/brand/og-image.png",
  ogUrl: "https://rapinexa.github.io/",
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
  eyebrow: "Tim digital untuk UMKM",
  headline: "Usaha Dikenal, Kerja Lebih Rapi",
  subheadline:
    "Kami bantu usaha Anda tampil lewat website dan video Shorts/Reels, serta merapikan transaksi dan pencatatan dengan POS kasir dan automation sederhana.",
  ctaLabel: "Diskusi Lewat WhatsApp",
  ctaMessage:
    "Halo RapiNexa, boleh minta rekomendasi layanan digital yang sesuai dengan kebutuhan dan anggaran usaha kami?",
  orbitLabel: "Tim Digital",
};

/**
 * Section anchor ids shared by the Navbar and the Layanan/Karya/
 * Platform sections so every in-page link and heading
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
 * `platforms` field) and the Hero orbit picks a
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
 * unknown ids.
 */
export function getPlatformsByIds(ids: readonly string[]): Platform[] {
  const byId = new Map(PLATFORMS.map((platform) => [platform.id, platform] as const));
  return ids
    .map((id) => byId.get(id))
    .filter((platform): platform is Platform => platform !== undefined);
}

/**
 * The Platform selection shown as HeroOrbit chips — ids into
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
  heading: "Terhubung dengan alat usaha Anda",
  subheading:
    "Kami membangun dan menghubungkan layanan dengan platform berikut, sesuai kebutuhan usaha Anda.",
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
 * Navbar copy. `links` order is the render order for both the
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
  whatsappLabel: "Hubungi kami",
  whatsappMessage:
    "Halo RapiNexa, boleh minta rekomendasi layanan digital yang sesuai dengan kebutuhan dan anggaran usaha kami?",
  themeToggleLabel: "Ganti tema",
  menuOpenLabel: "Buka menu",
  menuCloseLabel: "Tutup menu",
};

export type FooterContent = {
  serviceArea: string;
  whatsappLabel: string;
  whatsappMessage: string;
};

export const FOOTER: FooterContent = {
  serviceArea: "Melayani seluruh Indonesia",
  whatsappLabel: "Hubungi lewat WhatsApp",
  whatsappMessage:
    "Halo RapiNexa, boleh minta rekomendasi layanan digital yang sesuai dengan kebutuhan dan anggaran usaha kami?",
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
 * Profil singkat: a short company statement introducing
 * RapiNexa as a team. Highlighted phrases remain plain content segments.
 */
export const PROFILE: ProfileContent = {
  eyebrow: "Kenali RapiNexa",
  statement: [
    { text: "Kami adalah RapiNexa, " },
    { text: "tim pengembang solusi digital untuk UMKM", highlight: true },
    { text: ". Kami membantu Anda " },
    {
      text: "memperkenalkan usaha dan merapikan pekerjaan sehari-hari",
      highlight: true,
    },
    {
      text: ". Ceritakan kebutuhan dan anggaran Anda; kami bantu memilih layanan yang paling berguna untuk langkah berikutnya.",
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
 * `yarn typecheck`, not silently render as `undefined`.
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
 * `docs/notebooks/template-proposal-penawaran.md`. Changing a price here
 * changes it everywhere the price
 * is rendered — no component holds its own copy of a number.
 */
export const SERVICES: Service[] = [
  {
    id: "website-bisnis",
    name: "Website Bisnis",
    summary:
      "Bantu calon pelanggan mengenal usaha, melihat penawaran, dan menghubungi Anda. Mulai dari landing page satu halaman hingga company profile lengkap.",
    includes: [
      "Desain rapi dan nyaman dibuka di ponsel",
      "Tombol untuk langsung menghubungi WhatsApp usaha Anda",
      "Company Profile All-In: tanpa batas jumlah halaman untuk konten profil standar",
    ],
    startingPrice: 249_000,
    priceNote: "Domain dan hosting dibayar langsung oleh Anda agar kepemilikan tetap di tangan Anda.",
    options: [
      { name: "Landing Page", startingPrice: 249_000 },
      { name: "Company Profile All-In", startingPrice: 1_249_000 },
    ],
    whatsappMessage:
      "Halo RapiNexa, kami tertarik dengan Website Bisnis. Boleh bantu pilih landing page atau company profile yang sesuai kebutuhan dan anggaran kami?",
  },
  {
    id: "video-shorts-reels",
    name: "Video Shorts/Reels",
    summary:
      "Punya rekaman panjang yang belum dimanfaatkan? Kami olah video, webinar, atau materi edukasi Anda menjadi 5 video pendek siap dibagikan ke TikTok, Reels, dan Shorts.",
    includes: [
      "5 video vertikal format 9:16",
      "Pemilihan pembuka yang menarik dan teks ucapan yang rapi",
      "1 kali revisi gabungan",
    ],
    startingPrice: 150_000,
    priceNote: "Waktu pengerjaan maksimal 48 jam.",
    whatsappMessage:
      "Halo RapiNexa, kami tertarik dengan Video Shorts/Reels. Boleh rekomendasikan pengolahan video yang cocok untuk materi kami?",
  },
  {
    id: "pos-kasir-standard",
    name: "POS Kasir Standar",
    summary:
      "Rapikan penjualan tanpa mencatat ulang di buku. Sistem kasir sederhana untuk Android atau peramban komputer membantu Anda melihat transaksi dan laporan harian.",
    includes: ["Pencatatan transaksi di Android atau peramban komputer", "Daftar produk", "Laporan penjualan harian"],
    startingPrice: 499_000,
    priceNote: "Sekali bayar, tanpa biaya langganan.",
    whatsappMessage:
      "Halo RapiNexa, kami tertarik dengan POS Kasir Standar. Boleh bantu menilai kecocokannya untuk alur penjualan usaha kami?",
  },
  {
    id: "automation-sederhana",
    name: "Automation Sederhana",
    summary:
      "Kurangi pencatatan berulang agar Anda bisa fokus melayani pelanggan. Kami bantu mencatat pesanan, calon pelanggan, tindak lanjut, atau laporan secara otomatis ke lembar kerja.",
    includes: [
      "Pencatatan otomatis ke lembar kerja",
      "Alur untuk pesanan, calon pelanggan, tindak lanjut, atau laporan",
      "Pengaturan sesuai kebutuhan usaha Anda",
    ],
    startingPrice: 150_000,
    priceNote: "Harga menyesuaikan alur dan kebutuhan pencatatan.",
    whatsappMessage:
      "Halo RapiNexa, kami tertarik dengan Automation Sederhana. Boleh rekomendasikan pencatatan yang paling berguna untuk diotomatisasi?",
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
  heading: "Solusi untuk kebutuhan usaha Anda",
  subheading: "Ingin usaha lebih dikenal atau pekerjaan lebih tertata? Pilih kebutuhan Anda, lalu diskusikan cakupan dan anggarannya bersama kami.",
  ctaLabel: "Tanya Layanan Ini",
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
    { serviceId: "website-bisnis", note: "1 landing page" },
    { serviceId: "video-shorts-reels", note: "5 video pendek" },
    { serviceId: "pos-kasir-standard", note: "1 sistem kasir" },
    { serviceId: "automation-sederhana", note: "1 alur pencatatan otomatis" },
  ],
  summary:
    "Siapkan tampilan usaha dan pencatatan harian dalam satu paket: landing page, video pendek, sistem kasir, dan satu alur pencatatan otomatis, dikerjakan oleh tim kami.",
  reassurance:
    "Tidak perlu mengambil semuanya. Kami bantu memilih layanan yang paling relevan dan hemat sesuai kebutuhan serta anggaran usaha Anda.",
  whatsappMessage:
    "Halo RapiNexa, kami tertarik dengan Paket Digital UMKM. Boleh bantu menilai apakah paket ini sesuai kebutuhan dan anggaran usaha kami?",
};

export type BundleSectionContent = {
  /** Eyebrow label above the Bundle card, distinct from `BUNDLE.name`. */
  heading: string;
  ctaLabel: string;
};

export const BUNDLE_SECTION: BundleSectionContent = {
  heading: "Satu paket, satu tim",
  ctaLabel: "Diskusikan paket ini",
};

/**
 * Everything RapiNexa delivered for one Client (CONTEXT.md: Work), shown as
 * proof of capability. Deliberately has **no** `period`, `role`,
 * `title`, or `department` field — the reference project's FeaturedProjects
 * carried all four, and the spec ("Content layer") requires that adding one
 * back fails `yarn typecheck`. This is a plain object type (not a
 * `Record<string, unknown>` or an indexed type), so TypeScript's
 * excess-property check on a `Work` object literal below catches an added
 * field immediately — verified by temporarily adding `period` to an entry
 * and confirming `yarn typecheck` fails.
 */
export type Work = {
  /** The business this Work was delivered for (CONTEXT.md: Client). */
  client: string;
  /** Outcome-focused: what the Work achieved for the Client, not a task list. */
  summary: string;
  /** A single system delivered within the Work (CONTEXT.md: Deliverable), e.g. "POS Kasir". */
  deliverables: string[];
  /** Optional Platform ids (see `PLATFORMS`/`getPlatformsByIds`) rendered as chips. */
  platforms?: string[];
  /** Optional image paths; a Work with none renders the `initials` placeholder instead. */
  screenshots?: string[];
  /** Placeholder shown when `screenshots` is absent/empty, e.g. "DJ". */
  initials: string;
};

/**
 * RapiNexa's Works, one per Client. Adding an entry here renders
 * an additional Karya card with no component change — the ticket's
 * "add a third Work" acceptance check exercises exactly this. Facts are
 * sourced from `docs/projects/DJAMPI_JAWI_POS_PORTFOLIO.md`,
 * `DJAMPI_JAWI_PANEL_PORTFOLIO.md`, and `MOMENT_STOCKIST_PORTFOLIO.md`;
 * summaries describe supported outcomes without unverified metrics.
 */
export const WORKS: Work[] = [
  {
    client: "Djampi Jawi",
    summary:
      "Transaksi, pesanan, stok, dan produksi jamu Djampi Jawi lebih mudah dipantau lintas cabang. Sistem kasir dan panel pengelolaan membantu pencatatan dari pesanan masuk hingga laporan akhir giliran kerja.",
    deliverables: ["POS Kasir", "Panel Pengelolaan Usaha"],
    // platforms: ["react-native", "laravel"],
    screenshots: [
      "/assets/screenshots/djampi-jawi-pos-1.jpg",
      "/assets/screenshots/djampi-jawi-pos-2.jpg",
      "/assets/screenshots/djampi-jawi-pos-3.jpg",
    ],
    initials: "DJ",
  },
  {
    client: "Moment Stockist",
    summary:
      "Toko online Moment Stockist membantu pelanggan mengenal produk suplemen dan berbelanja dari katalog hingga penyelesaian pesanan. Pelanggan dapat menyimpan alamat pengiriman dan melihat riwayat pesanan lewat akun mereka.",
    deliverables: ["Website dan Pengelolaan Konten", "Integrasi Sistem"],
    screenshots: ["/assets/screenshots/moment-stockist-1.png"],
    initials: "MS",
  },
];

export type KaryaSectionContent = {
  heading: string;
  subheading?: string;
};

export const KARYA_SECTION: KaryaSectionContent = {
  heading: "Karya untuk usaha nyata",
  subheading: "Dari transaksi harian hingga informasi untuk pelanggan, berikut solusi yang kami kerjakan untuk membantu bisnis klien berjalan lebih rapi.",
};

export type CtaContent = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaMessage: string;
};

/**
 * Closing CTA section: the last thing a visitor sees before the
 * Footer, inviting them to chat on WhatsApp.
 */
export const CTA: CtaContent = {
  heading: "Mulai dari kebutuhan usaha Anda",
  body: "Ceritakan pekerjaan yang ingin dirapikan atau penawaran yang ingin dikenalkan. Kami bantu pilih langkah yang sesuai kebutuhan dan anggaran Anda lewat konsultasi awal tanpa biaya.",
  ctaLabel: "Diskusi Lewat WhatsApp",
  ctaMessage:
    "Halo RapiNexa, boleh minta rekomendasi layanan digital yang sesuai dengan kebutuhan dan anggaran usaha kami?",
};
