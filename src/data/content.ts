/**
 * RapiNexa's typed content layer. Every section component imports its copy
 * from here instead of holding its own strings, so copywriting
 * and data updates never require touching component code.
 */

import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa6";
import {
  LuBadgeCheck,
  LuCircleAlert,
  LuCode,
  LuDatabase,
  LuGauge,
  LuGlobe,
  LuHandshake,
  LuKeyRound,
  LuLayoutDashboard,
  LuLink,
  LuLock,
  LuMessageCircle,
  LuReceipt,
  LuSettings,
  LuShieldAlert,
  LuShoppingBag,
  LuWrench,
} from "react-icons/lu";
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
import { formatRupiah } from "src/lib/currency";

export type SiteMeta = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
};

export const SITE_META: SiteMeta = {
  title: "RapiNexa — Web Developer untuk UMKM dan Bisnis",
  description:
    "Jasa pembuatan website, aplikasi web, dan perawatan website untuk UMKM dan bisnis. Lihat harga layanan RapiNexa dan konsultasi gratis lewat WhatsApp.",
  ogTitle: "RapiNexa — Web Developer untuk UMKM dan Bisnis",
  ogDescription:
    "Website, aplikasi web bisnis, maintenance, serta perbaikan dan fitur tambahan. Lihat layanan, harga mulai dari, dan karya RapiNexa.",
  ogImage: "https://rapinexa.biz.id/assets/brand/og-image.png",
  ogUrl: "https://rapinexa.biz.id/",
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
  eyebrow: "Web developer untuk UMKM dan bisnis",
  headline: "Usaha Dikenal, Kerja Lebih Rapi",
  subheadline:
    "Jasa pembuatan website, aplikasi web, dan perawatan website untuk UMKM dan bisnis.",
  ctaLabel: "Diskusi Lewat WhatsApp",
  ctaMessage:
    "Halo RapiNexa, boleh minta rekomendasi layanan digital yang sesuai dengan kebutuhan dan anggaran usaha kami?",
  orbitLabel: "Web Developer",
};

/**
 * Section anchor ids shared by the Navbar, the Layanan jump menu, and the
 * sections themselves so every in-page link and heading agrees on the
 * same id.
 */
export const SECTION_IDS = {
  tentang: "tentang",
  layanan: "layanan",
  website: "website",
  aplikasi: "aplikasi",
  karya: "karya",
  platform: "platform",
  maintenance: "maintenance",
  perbaikan: "perbaikan",
  caraKerja: "cara-kerja",
  kenapa: "kenapa",
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
 * per the ticket. Two Platforms have no icon in either set and render
 * as text labels: OpenAI (`si` only ships `SiOpenaigym`, not a plain
 * OpenAI mark, in this version) and Midtrans (no Indonesian payment-gateway
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
  "firebase",
  "whatsapp",
  "xendit",
  "google-sheets",
];

/** A labelled group of Platform ids, rendered as one row of tiles. */
export type PlatformGroup = {
  title: string;
  platformIds: string[];
};

export type PlatformSectionContent = SectionHeaderContent & {
  groups: PlatformGroup[];
};

/** Grouped as in the company-profile deck's "Teknologi" slide. */
export const PLATFORM_SECTION: PlatformSectionContent = {
  eyebrow: "Teknologi",
  heading: "Dibangun dengan teknologi yang teruji",
  lead: "Kami membangun dan menghubungkan layanan dengan platform berikut, sesuai kebutuhan usaha Anda.",
  groups: [
    { title: "Pengembangan", platformIds: ["laravel", "react", "nextjs", "firebase"] },
    { title: "Infrastruktur", platformIds: ["google-cloud", "aws", "cloudflare"] },
    { title: "Pembayaran & integrasi", platformIds: ["xendit", "midtrans", "whatsapp", "google-sheets"] },
    { title: "AI", platformIds: ["openai", "google-gemini"] },
  ],
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
 * desktop nav and the mobile drawer.
 */
export const NAVBAR: NavbarContent = {
  links: [
    { id: SECTION_IDS.layanan, label: "Layanan" },
    { id: SECTION_IDS.maintenance, label: "Maintenance" },
    { id: SECTION_IDS.karya, label: "Karya" },
    { id: SECTION_IDS.caraKerja, label: "Cara Kerja" },
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
 * Shared header copy for a page section: a small mono eyebrow, the `<h2>`
 * heading, and an optional lead paragraph (rendered by `SectionHeader`).
 * `highlight` is a substring of `heading` rendered in the accent colour —
 * data, not markup, so components never parse copy for emphasis syntax.
 */
export type SectionHeaderContent = {
  eyebrow: string;
  heading: string;
  highlight?: string;
  lead?: string;
};

/** An icon + title + one-sentence card, reused by several sections. */
export type FeatureCard = {
  icon: IconType;
  title: string;
  body: string;
};

/** A title + one-sentence item without an icon (steps, repair items). */
export type TextItem = {
  title: string;
  body: string;
};

/* ------------------------------------------------------------------ */
/* Tentang Kami                                                        */
/* ------------------------------------------------------------------ */

export type AboutContent = SectionHeaderContent & {
  points: FeatureCard[];
};

/** Tentang Kami, per the company-profile deck's "Tentang Kami" slide. */
export const ABOUT: AboutContent = {
  eyebrow: "Tentang Kami",
  heading: "Tim pengembang web untuk UMKM dan bisnis",
  lead: "Kami membantu usaha Anda tampil profesional secara online dan merapikan pekerjaan sehari-hari lewat aplikasi berbasis web. Ceritakan kebutuhan dan anggaran Anda; kami bantu memilih solusi yang paling berguna.",
  points: [
    {
      icon: LuGlobe,
      title: "Usaha lebih dikenal",
      body: "Website yang membantu calon pelanggan mengenal usaha dan langsung menghubungi Anda.",
    },
    {
      icon: LuSettings,
      title: "Kerja lebih rapi",
      body: "Aplikasi web untuk transaksi, pesanan, stok, dan laporan tanpa catat ulang.",
    },
    {
      icon: LuLock,
      title: "Tetap terawat",
      body: "Monitoring, backup, dan update keamanan agar sistem terus berjalan stabil.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Layanan: the four service lines, shown as a jump menu               */
/* ------------------------------------------------------------------ */

/**
 * One of RapiNexa's four service lines (CONTEXT.md: Service line). The
 * Layanan section renders these as an overview whose cards scroll to the
 * line's own detail section (`target`), so every price is visible on one
 * screen before the visitor dives in.
 */
export type ServiceLine = {
  target: SectionId;
  icon: IconType;
  name: string;
  summary: string;
  /** Already formatted, e.g. "Mulai Rp500.000" or "Sesuai kebutuhan". */
  priceLabel: string;
};

export type LayananSectionContent = SectionHeaderContent & {
  detailLabel: string;
};

export const LAYANAN_SECTION: LayananSectionContent = {
  eyebrow: "Layanan Kami",
  heading: "Dari membangun hingga merawat website Anda",
  highlight: "merawat",
  lead: "Pilih kebutuhan Anda untuk melihat detail dan harganya, lalu diskusikan cakupannya bersama kami.",
  detailLabel: "Lihat detail",
};

/* ------------------------------------------------------------------ */
/* Pembuatan Website                                                   */
/* ------------------------------------------------------------------ */

/**
 * One Website tier (CONTEXT.md: Website tier). `id` is a stable slug used
 * as the WhatsApp CTA's `source: website:<id>`.
 */
export type WebsiteTier = {
  id: string;
  name: string;
  startingPrice: number;
  summary: string;
  /** Rendered as the highlighted (dark) card, like the deck. */
  featured?: boolean;
  whatsappMessage: string;
};

export type WebsiteSectionContent = SectionHeaderContent & {
  tiers: WebsiteTier[];
  note: string;
  ctaLabel: string;
};

/**
 * Prices per the company-profile deck (2026-11): the deck is the source of
 * truth for every price on the site. Changing a number here changes it
 * everywhere it is rendered, the Layanan overview included.
 */
export const WEBSITE_SECTION: WebsiteSectionContent = {
  eyebrow: "Pembuatan Website",
  heading: "Website sesuai skala usaha Anda",
  highlight: "skala usaha",
  lead: "Semua website responsif di ponsel, terhubung langsung ke WhatsApp, dengan domain dan hosting atas nama Anda.",
  tiers: [
    {
      id: "landing-page",
      name: "Landing Page",
      startingPrice: 500_000,
      summary: "Satu halaman untuk mengenalkan usaha dan penawaran Anda, dengan ajakan langsung ke WhatsApp.",
      whatsappMessage:
        "Halo RapiNexa, kami tertarik membuat Landing Page. Boleh bantu jelaskan cakupan dan langkah awalnya untuk usaha kami?",
    },
    {
      id: "company-profile-all-in",
      name: "Company Profile All-In",
      startingPrice: 1_249_000,
      summary: "Profil usaha lengkap, tanpa batas jumlah halaman untuk konten profil standar.",
      whatsappMessage:
        "Halo RapiNexa, kami tertarik dengan Company Profile All-In. Boleh bantu menilai konten profil yang perlu kami siapkan?",
    },
    {
      id: "custom-web-professional",
      name: "Custom Web Professional",
      startingPrice: 3_500_000,
      summary: "Desain dan fitur dibuat khusus sesuai kebutuhan dan alur bisnis Anda.",
      featured: true,
      whatsappMessage:
        "Halo RapiNexa, kami tertarik dengan Custom Web Professional. Boleh kami ceritakan kebutuhan dan alur bisnis kami untuk dibuatkan penawaran?",
    },
  ],
  note: "Domain dan hosting dibayar langsung oleh Anda agar kepemilikan tetap di tangan Anda.",
  ctaLabel: "Tanya Paket Ini",
};

/* ------------------------------------------------------------------ */
/* Aplikasi Web Bisnis                                                 */
/* ------------------------------------------------------------------ */

export type AplikasiSectionContent = SectionHeaderContent & {
  items: FeatureCard[];
  priceNote: string;
  ctaLabel: string;
  whatsappMessage: string;
};

export const APLIKASI_SECTION: AplikasiSectionContent = {
  eyebrow: "Aplikasi Web Bisnis",
  heading: "Aplikasi web untuk merapikan operasional usaha",
  items: [
    {
      icon: LuReceipt,
      title: "POS Kasir",
      body: "Catat transaksi di peramban komputer atau Android, kelola daftar produk, dan lihat laporan penjualan harian.",
    },
    {
      icon: LuLayoutDashboard,
      title: "Panel Pengelolaan",
      body: "Pantau pesanan, stok, produksi, dan laporan lintas cabang dari satu panel.",
    },
    {
      icon: LuShoppingBag,
      title: "Toko Online",
      body: "Katalog produk, akun pelanggan, alamat pengiriman, dan riwayat pesanan.",
    },
    {
      icon: LuLink,
      title: "Integrasi Sistem",
      body: "Hubungkan dengan pembayaran Xendit atau Midtrans, WhatsApp, dan Google Sheets.",
    },
  ],
  priceNote: "Biaya dihitung sesuai cakupan dan kebutuhan, setelah konsultasi awal gratis.",
  ctaLabel: "Konsultasi Aplikasi",
  whatsappMessage:
    "Halo RapiNexa, kami ingin merapikan operasional usaha dengan aplikasi web, misalnya kasir, stok, atau toko online. Boleh konsultasi untuk menentukan cakupannya?",
};

/* ------------------------------------------------------------------ */
/* Maintenance                                                         */
/* ------------------------------------------------------------------ */

/**
 * A monthly website/application care plan (CONTEXT.md: Maintenance
 * package). `priceFrom` marks a price that is a minimum ("mulai").
 */
export type MaintenancePackage = {
  id: string;
  name: string;
  monthlyPrice: number;
  priceFrom?: boolean;
  audience: string;
  includes: string[];
  featured?: boolean;
  whatsappMessage: string;
};

export type MaintenanceSectionContent = SectionHeaderContent & {
  risksHeading: string;
  risks: FeatureCard[];
  packagesHeading: string;
  packages: MaintenancePackage[];
  note: string;
  ctaLabel: string;
};

export const MAINTENANCE_SECTION: MaintenanceSectionContent = {
  eyebrow: "Maintenance Website",
  heading: "Dua paket perawatan, sesuai jenis sistem Anda",
  highlight: "jenis sistem",
  risksHeading: "Website yang dibiarkan diam-diam merugikan bisnis",
  risks: [
    {
      icon: LuShieldAlert,
      title: "Celah keamanan",
      body: "Plugin, framework, dan dependency yang usang membuka jalan bagi malware.",
    },
    {
      icon: LuGauge,
      title: "Website melambat",
      body: "Halaman yang lambat membuat calon pelanggan pergi sebelum menghubungi Anda.",
    },
    {
      icon: LuDatabase,
      title: "Data bisa hilang",
      body: "Tanpa backup terjadwal, satu kerusakan server dapat menghapus konten dan data.",
    },
    {
      icon: LuCircleAlert,
      title: "Fitur rusak tak terlihat",
      body: "Formulir kontak atau integrasi yang error berarti pesan pelanggan tidak sampai.",
    },
  ],
  packagesHeading: "Pilih paket perawatan",
  packages: [
    {
      id: "professional-care",
      name: "Professional Care",
      monthlyPrice: 899_000,
      audience: "Untuk website bisnis yang aktif: landing page, company profile, dan website custom.",
      includes: [
        "Monitoring website, uptime, dan keamanan",
        "Backup rutin dan pemeriksaan database",
        "Update sistem, dependency, dan SSL",
        "Optimasi performa dan perbaikan bug ringan",
        "Pembaruan konten website",
        "Prioritas dukungan dan laporan teknis bulanan",
      ],
      whatsappMessage:
        "Halo RapiNexa, kami tertarik dengan paket maintenance Professional Care untuk website kami. Boleh bantu cek apakah paket ini sesuai?",
    },
    {
      id: "custom-application-care",
      name: "Custom Application Care",
      monthlyPrice: 2_000_000,
      priceFrom: true,
      audience: "Untuk aplikasi custom, dashboard, CRM, ERP, dan sistem informasi perusahaan.",
      includes: [
        "Monitoring aplikasi dan database",
        "Backup database terjadwal",
        "Update dependency, framework, dan security patch",
        "Bug fixing dan pemeriksaan integrasi API",
        "Optimasi performa dan stabilitas sistem",
        "Laporan teknis berkala",
      ],
      featured: true,
      whatsappMessage:
        "Halo RapiNexa, kami tertarik dengan Custom Application Care untuk aplikasi kami. Boleh bantu menilai kebutuhan perawatannya?",
    },
  ],
  note: "Harga Custom Application Care disesuaikan dengan kompleksitas aplikasi dan infrastruktur.",
  ctaLabel: "Tanya Paket Ini",
};

/* ------------------------------------------------------------------ */
/* Perbaikan & Fitur                                                   */
/* ------------------------------------------------------------------ */

export type PerbaikanGroup = {
  id: string;
  title: string;
  heading: string;
  items: TextItem[];
  note: string;
  ctaLabel: string;
  whatsappMessage: string;
};

export type PerbaikanSectionContent = SectionHeaderContent & {
  groups: PerbaikanGroup[];
};

export const PERBAIKAN_SECTION: PerbaikanSectionContent = {
  eyebrow: "Perbaikan & Fitur",
  heading: "Website bermasalah atau perlu fitur baru? Kami tangani.",
  highlight: "Kami tangani.",
  groups: [
    {
      id: "repair",
      title: "Repair & Troubleshooting",
      heading: "Website bermasalah",
      items: [
        { title: "Bug fixing", body: "Memperbaiki error dan fitur yang tidak berjalan, dari ringan hingga kompleks." },
        { title: "Perbaikan database", body: "Memulihkan data dan struktur database yang rusak atau tidak sinkron." },
        { title: "Website recovery", body: "Menghidupkan kembali website yang down, blank, atau tidak bisa diakses." },
        { title: "Malware cleanup", body: "Membersihkan malware dan menutup celah keamanan yang dimanfaatkan." },
        { title: "Error server", body: "Menangani error konfigurasi server, hosting, dan sertifikat SSL." },
        { title: "Optimasi kecepatan", body: "Mempercepat waktu muat agar pengunjung tidak keburu pergi." },
        { title: "Migrasi hosting", body: "Memindahkan website ke hosting atau server baru dengan aman." },
        { title: "Emergency support", body: "Penanganan darurat, termasuk di luar jam operasional." },
      ],
      note: "Biaya ditentukan setelah pemeriksaan dan analisis kerusakan.",
      ctaLabel: "Laporkan Masalah",
      whatsappMessage:
        "Halo RapiNexa, website kami sedang bermasalah. Boleh bantu periksa dan perkirakan biaya perbaikannya?",
    },
    {
      id: "development",
      title: "Pengembangan & Fitur Tambahan",
      heading: "Tambah fitur tanpa membangun ulang",
      items: [
        { title: "Update konten", body: "Memperbarui teks, gambar, harga, dan informasi usaha." },
        { title: "Section & halaman", body: "Menambah section atau halaman baru, seperti promo, galeri, dan FAQ." },
        { title: "Formulir", body: "Formulir kontak, pemesanan, pendaftaran, atau survei pelanggan." },
        { title: "Integrasi WhatsApp", body: "Tombol chat dan pesan otomatis ke WhatsApp usaha." },
        { title: "Integrasi API", body: "Hubungkan ke pembayaran, Google Sheets, atau layanan lain." },
        { title: "Fitur baru", body: "Fitur khusus sesuai alur bisnis, seperti katalog, booking, atau login." },
        { title: "Modul aplikasi", body: "Modul baru untuk aplikasi web yang sudah berjalan, seperti stok atau laporan." },
        { title: "Penyegaran desain", body: "Memperbarui tampilan agar lebih modern dan sesuai identitas brand." },
      ],
      note: "Biaya sesuai cakupan, dikerjakan setelah Anda menyetujui penawaran.",
      ctaLabel: "Diskusikan Fitur",
      whatsappMessage:
        "Halo RapiNexa, kami ingin menambah fitur di website atau aplikasi kami. Boleh diskusikan cakupan dan biayanya?",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Cara Kerja & Kenapa RapiNexa                                        */
/* ------------------------------------------------------------------ */

export type CaraKerjaSectionContent = SectionHeaderContent & {
  steps: TextItem[];
};

export const CARA_KERJA_SECTION: CaraKerjaSectionContent = {
  eyebrow: "Cara Kerja",
  heading: "Transparan dari pemeriksaan hingga laporan",
  steps: [
    { title: "Konsultasi gratis", body: "Ceritakan kebutuhan, kondisi website, dan anggaran Anda." },
    { title: "Pemeriksaan", body: "Kami analisis masalah dan kebutuhan teknisnya." },
    { title: "Persetujuan biaya", body: "Pekerjaan dimulai setelah Anda menyetujui biaya." },
    { title: "Pengerjaan", body: "Perawatan, perbaikan, atau pengembangan dijalankan." },
    { title: "Laporan", body: "Hasil kerja dilaporkan secara berkala." },
  ],
};

export type KenapaSectionContent = SectionHeaderContent & {
  reasons: FeatureCard[];
};

export const KENAPA_SECTION: KenapaSectionContent = {
  eyebrow: "Kenapa RapiNexa",
  heading: "Partner web yang jelas dan dapat diandalkan",
  reasons: [
    {
      icon: LuMessageCircle,
      title: "Konsultasi gratis",
      body: "Diskusikan kebutuhan dan anggaran sebelum memutuskan apa pun.",
    },
    {
      icon: LuKeyRound,
      title: "Milik Anda sepenuhnya",
      body: "Domain dan hosting atas nama Anda, sehingga kepemilikan tetap di tangan Anda.",
    },
    {
      icon: LuHandshake,
      title: "Biaya transparan",
      body: "Penawaran jelas di awal, dan pekerjaan tambahan selalu disetujui klien lebih dulu.",
    },
    {
      icon: LuBadgeCheck,
      title: "Dirawat setelah jadi",
      body: "Paket maintenance dengan laporan rutin agar website terus prima.",
    },
  ],
};

/**
 * The four service lines in deck order. Price labels are derived from the
 * detail sections' data so the overview can never disagree with them.
 */
export const SERVICE_LINES: ServiceLine[] = [
  {
    target: SECTION_IDS.website,
    icon: LuGlobe,
    name: "Pembuatan Website",
    summary: "Landing page, company profile, hingga website custom profesional.",
    priceLabel: `Mulai ${formatRupiah(Math.min(...WEBSITE_SECTION.tiers.map((tier) => tier.startingPrice)))}`,
  },
  {
    target: SECTION_IDS.aplikasi,
    icon: LuCode,
    name: "Aplikasi Web Bisnis",
    summary: "POS kasir, panel pengelolaan, toko online, dan integrasi sistem.",
    priceLabel: "Sesuai kebutuhan",
  },
  {
    target: SECTION_IDS.maintenance,
    icon: LuSettings,
    name: "Maintenance Website",
    summary: "Monitoring, backup, update keamanan, dan laporan rutin.",
    priceLabel: `Mulai ${formatRupiah(Math.min(...MAINTENANCE_SECTION.packages.map((pkg) => pkg.monthlyPrice)))}/bln`,
  },
  {
    target: SECTION_IDS.perbaikan,
    icon: LuWrench,
    name: "Perbaikan & Fitur",
    summary: "Perbaikan bug, recovery, migrasi server, dan penambahan fitur.",
    priceLabel: "Sesuai cakupan",
  },
];

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
      "Transaksi, pesanan, stok, dan produksi jamu kini mudah dipantau lintas cabang. Sistem kasir dan panel pengelolaan membantu pencatatan dari pesanan masuk hingga laporan akhir giliran kerja.",
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
      "Toko online produk suplemen, dari katalog hingga penyelesaian pesanan. Pelanggan dapat menyimpan alamat pengiriman dan melihat riwayat pesanan lewat akun mereka.",
    deliverables: ["Toko Online", "Integrasi Sistem"],
    screenshots: ["/assets/screenshots/moment-stockist-1.png"],
    initials: "MS",
  },
];

export type KaryaSectionContent = SectionHeaderContent;

export const KARYA_SECTION: KaryaSectionContent = {
  eyebrow: "Portofolio",
  heading: "Karya untuk usaha nyata",
  lead: "Dari transaksi harian hingga informasi untuk pelanggan, berikut solusi yang kami kerjakan untuk membantu bisnis klien berjalan lebih rapi.",
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
  heading: "Mulai dari kebutuhan usaha Anda.",
  body: "Konsultasi awal tanpa biaya. Ceritakan pekerjaan yang ingin dirapikan atau penawaran yang ingin dikenalkan.",
  ctaLabel: "Diskusi Lewat WhatsApp",
  ctaMessage:
    "Halo RapiNexa, boleh minta rekomendasi layanan digital yang sesuai dengan kebutuhan dan anggaran usaha kami?",
};
