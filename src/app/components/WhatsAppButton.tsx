import clsx from "clsx";
import { getWhatsAppUrl } from "src/lib/whatsapp";

export type WhatsAppButtonVariant = "primary" | "secondary";

export type WhatsAppButtonProps = {
  /**
   * Where this CTA was clicked from (e.g. `navbar`, `hero`, `service:<id>`,
   * `bundle`, `cta`, `footer`). Not read by anything yet — it is written to
   * the DOM as `data-cta-source` so a future analytics hook has one place
   * to read it from, per every CTA on the site sharing this component.
   */
  source: string;
  /** Pre-filled WhatsApp message; URL-encoded into the `text` param. */
  message?: string;
  label: string;
  variant?: WhatsAppButtonVariant;
  className?: string;
};

/**
 * The only way any section renders a WhatsApp CTA. Opens the configured
 * `whatsapp_url` (optionally with a pre-filled message) in a new tab.
 */
export default function WhatsAppButton({
  source,
  message,
  label,
  variant = "primary",
  className,
}: WhatsAppButtonProps) {
  const href = getWhatsAppUrl(message);
  const isPrimary = variant === "primary";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-source={source}
      className={clsx(
        "inline-flex items-center gap-2 no-underline hover:-translate-y-0.5 active:translate-y-0",
        className,
        !isPrimary && "border border-gray-500 hover:bg-black/10 dark:hover:bg-white/10",
      )}
      style={{
        padding: "14px 24px",
        borderRadius: 13,
        fontWeight: 700,
        fontSize: 15,
        transition: "all .2s ease-in-out",
        ...(isPrimary
          ? {
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 10px 34px var(--accent-soft)",
            }
          : {
              color: "var(--text)",
            }),
      }}
    >
      {label}
      <WhatsAppIcon />
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.44-1.36a9.9 9.9 0 0 0 4.6 1.14h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.15c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.6.82 2.06.89 2.21.07.14.11.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.71 1.18 1.53 1.91 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.55.73 1.82.86.27.14.45.2.51.32.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}
