import { Outlet } from "react-router";
import { useTheme } from "../hooks/useTheme";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/**
 * Wraps every public route. Applies the persisted theme to <html> and
 * renders the themed page background plus the always-visible Navbar and
 * the closing Footer (ticket 03) around whatever the route renders.
 * Starfield is added by a later page-frame ticket.
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
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
