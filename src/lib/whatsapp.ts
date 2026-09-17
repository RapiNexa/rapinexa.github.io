import { getConfig } from "./config";

/**
 * Pure helper that builds a WhatsApp chat link from the configured
 * `whatsapp_url` plus an optional pre-filled message. The message is
 * URL-encoded into the `text` query parameter, matching the format
 * WhatsApp's `wa.me` links expect.
 *
 * Never reads DOM/browser state — safe to call during render.
 *
 * @param message Optional pre-filled message text (not URL-encoded by the caller)
 * @returns The full WhatsApp chat URL
 */
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = getConfig("whatsapp_url") as string;

  if (!message) {
    return baseUrl;
  }

  const separator = baseUrl.includes("?") ? "&" : "?";

  return `${baseUrl}${separator}text=${encodeURIComponent(message)}`;
}
