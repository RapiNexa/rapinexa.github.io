import { Outlet } from "react-router";
import { useTheme } from "../hooks/useTheme";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Starfield from "../components/Starfield";

/**
 * Wraps every public route. Applies the persisted theme to <html> and
 * renders the themed page background, the fixed `Starfield` canvas, and
 * the always-visible Navbar/Footer around whatever the route renders.
 *
 * `Starfield` paints to a `position: fixed` canvas with `z-index: 0`; the
 * `relative z-1` wrapper below lifts the Navbar/route content/Footer above
 * it in the stacking order (ported from
 * `docs/reactjs/src/app/layouts/PublicLayout.tsx`), so page content stays
 * legible over the animated background in both themes.
 */
export default function PublicLayout() {
  useTheme();

  return (
    <div
      className="relative"
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-sans)",
        transition: "background .45s ease, color .45s ease",
        overflowX: "hidden",
      }}
    >
      <Starfield />
      <div className="relative z-1">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
