/**
 * Smooth-scrolls to an in-page section by its anchor id. Never throws when
 * the target is missing; it scrolls to the top of the page instead.
 */
export function scrollToSection(id: string) {
  if (typeof document === "undefined") return;

  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
