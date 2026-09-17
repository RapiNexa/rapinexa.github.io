import { useEffect, useState } from "react";
import { NAVBAR, WORDMARK, type SectionId } from "src/data/content";
import ThemeToggle from "./ThemeToggle";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Smooth-scrolls to a section by its `SECTION_IDS` anchor. Layanan and
 * Karya don't have rendered sections yet (tickets 05/06), so this must
 * never throw when the target is missing — it falls back to scrolling to
 * the top of the page instead.
 */
function scrollToSection(id: SectionId) {
  if (typeof document === "undefined") return;

  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/**
 * Always-visible site Navbar (ticket 03): gold "RapiNexa" wordmark with the
 * RapiNexa mark (ticket 08) beside it, in-page anchor links to
 * Layanan/Karya/Platform, the theme toggle, and a `WhatsAppButton`
 * (`source: navbar`). At phone width the links/toggle/WhatsApp button move
 * into a hamburger-triggered mobile drawer instead of the desktop row.
 *
 * Ported from `docs/reactjs/src/app/components/Navbar.tsx`: route links
 * (About/Projects) become in-page smooth-scroll anchors, and the
 * GitHub/LinkedIn buttons are replaced by the shared `WhatsAppButton`.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (id: SectionId) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "var(--bg2)" : "transparent",
          backdropFilter: scrolled ? "saturate(180%) blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(16px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          transition: "background .35s ease, border-color .35s ease",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: 1280,
            padding: "0 clamp(20px,5vw,40px)",
            height: 74,
          }}
        >
          {/* Wordmark: live text in the gold token, not an image. The mark
              (ticket 08) sits beside it as a decorative image — the
              wordmark text is the accessible name for the lockup. */}
          <div className="flex items-center gap-3">
            <picture>
              <source srcSet="/assets/brand/rapinexa-mark.webp" type="image/webp" />
              <img
                src="/assets/brand/rapinexa-mark.png"
                alt=""
                width={40}
                height={40}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
            </picture>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: 0.2,
              }}
            >
              {WORDMARK}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAVBAR.links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className="cursor-pointer rounded-lg px-4 py-2 no-underline transition-colors duration-200 hover:bg-[var(--surface)]"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--text)",
                  letterSpacing: ".01em",
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ marginLeft: 8 }}>
              <ThemeToggle />
            </div>
            <div style={{ marginLeft: 8 }}>
              <WhatsAppButton
                source="navbar"
                message={NAVBAR.whatsappMessage}
                label={NAVBAR.whatsappLabel}
                variant="secondary"
              />
            </div>
          </div>

          {/* Mobile trigger */}
          <div className="flex items-center gap-[10px] md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={NAVBAR.menuOpenLabel}
              aria-expanded={menuOpen}
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(4,4,8,0.6)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity .35s ease",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Mobile drawer: same links, theme toggle, and WhatsApp button */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 70,
          width: "min(280px,82vw)",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg2)",
          borderLeft: "1px solid var(--border)",
          transform: menuOpen ? "translateX(0)" : "translateX(106%)",
          transition: "transform .38s cubic-bezier(.4,0,.15,1)",
          boxShadow: "-30px 0 60px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 17,
              color: "var(--gold)",
            }}
          >
            {WORDMARK}
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label={NAVBAR.menuCloseLabel}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col" style={{ padding: 14 }}>
          {NAVBAR.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.id);
              }}
              className="cursor-pointer no-underline hover:bg-[var(--surface)]"
              style={{
                padding: "14px 12px",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 19,
                color: "var(--text)",
                borderRadius: 10,
                transition: "background .2s",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="mt-auto flex flex-col items-stretch gap-3"
          style={{ padding: 20, borderTop: "1px solid var(--border)" }}
        >
          <ThemeToggle />
          <WhatsAppButton
            source="navbar"
            message={NAVBAR.whatsappMessage}
            label={NAVBAR.whatsappLabel}
            variant="primary"
            className="justify-center"
          />
        </div>
      </aside>
    </>
  );
}
