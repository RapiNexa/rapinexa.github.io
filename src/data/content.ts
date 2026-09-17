/**
 * RapiNexa's typed content layer. Every section component imports its copy
 * from here instead of holding its own strings, so copywriting (ticket 09)
 * and data updates never require touching component code.
 *
 * Ticket 01 seeded site meta and the Hero. Ticket 02 adds Platforms. Later
 * tickets extend this module with Profile, Services, Bundle, Works, and the
 * remaining section headings — add new exports here rather than starting a
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

export type PlatformSectionContent = {
  heading: string;
  subheading?: string;
};

export const PLATFORM_SECTION: PlatformSectionContent = {
  heading: "Platform yang kami dukung",
  subheading:
    "Sebagian teknologi dan layanan pihak ketiga yang bisa RapiNexa integrasikan ke dalam Layanan Anda.",
};
