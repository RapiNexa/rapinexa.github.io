import { Outlet } from "react-router";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "../components/ThemeToggle";

/**
 * Wraps every public route. Applies the persisted theme to <html> and
 * renders the themed page background. Navbar/Footer/Starfield are added by
 * the page-frame ticket (03/05) — this ticket only needs the themed shell
 * around the placeholder Hero, plus a standalone theme toggle until the
 * Navbar's own control replaces it.
 */
export default function PublicLayout() {
  useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-sans)",
        transition: "background .45s ease, color .45s ease",
        overflowX: "hidden",
      }}
    >
      <ThemeToggle />
      <Outlet />
    </div>
  );
}
