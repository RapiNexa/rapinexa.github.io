import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6";
import { FOOTER, WORDMARK } from "src/data/content";
import { getConfig } from "src/lib/config";
import WhatsAppButton from "./WhatsAppButton";

type SocialLink = {
  key: string;
  label: string;
  href: string;
  icon: IconType;
};

/**
 * Builds the optional social/contact link list straight from `config.json`.
 * Every key here (GitHub included) renders only when its config value is
 * non-empty, so filling in Instagram/TikTok/LinkedIn/email later — or
 * changing GitHub — is a config-only change with zero edits to this file.
 */
function getSocialLinks(): SocialLink[] {
  const candidates: SocialLink[] = [
    { key: "github", label: "GitHub", href: (getConfig("social_github") as string) || "", icon: FaGithub },
    { key: "instagram", label: "Instagram", href: (getConfig("social_instagram") as string) || "", icon: FaInstagram },
    { key: "tiktok", label: "TikTok", href: (getConfig("social_tiktok") as string) || "", icon: FaTiktok },
    { key: "linkedin", label: "LinkedIn", href: (getConfig("social_linkedin") as string) || "", icon: FaLinkedin },
    {
      key: "email",
      label: "Email",
      href: (getConfig("contact_email") as string) ? `mailto:${getConfig("contact_email")}` : "",
      icon: FaEnvelope,
    },
  ];

  return candidates.filter((link) => link.href !== "");
}

/**
 * Site Footer (ticket 03): wordmark (same live-text gold treatment as the
 * Navbar, with the same RapiNexa mark from ticket 08 beside it), the service-area line, a
 * `WhatsAppButton` (`source: footer`), and social/contact icons driven by
 * `config.json` — rendered only when their value is non-empty.
 *
 * Ported from `docs/reactjs/src/app/components/Footer.tsx` with the
 * rotating role list and all personal names/links removed.
 */
export default function Footer() {
  const socialLinks = getSocialLinks();

  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)" }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "44px clamp(20px,5vw,40px) 40px" }}>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <picture>
              <source srcSet="/assets/brand/rapinexa-mark.webp" type="image/webp" />
              <img
                src="/assets/brand/rapinexa-mark.png"
                alt=""
                width={44}
                height={44}
                style={{
                  width: 44,
                  height: 44,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            </picture>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--gold)",
                }}
              >
                {WORDMARK}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{FOOTER.serviceArea}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-[10px]">
            <WhatsAppButton
              source="footer"
              message={FOOTER.whatsappMessage}
              label={FOOTER.whatsappLabel}
              variant="secondary"
            />
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex items-center justify-center hover:bg-[var(--surface)]"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 11,
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  transition: "background .2s, border-color .2s",
                }}
              >
                <link.icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
