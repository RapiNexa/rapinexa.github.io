# 08 — Branding assets

**Status:** ready-for-agent

**Blocked by:** 03 — Navbar and Footer; 07 — Add the transparent logo mark

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** A visitor sees the RapiNexa mark next to the wordmark in the Navbar and Footer, a recognisable RapiNexa icon in the browser tab and on their phone's home screen, and a rich preview (title, description, image with the mark) when the link is shared on WhatsApp or social media.

Notes:
- If the provided mark is larger than ~512px, resize it to 512×512 and export optimised PNG and WebP; keep transparency. Serve WebP with PNG fallback where the mark is displayed.
- Place the mark beside the gold "RapiNexa" wordmark in the Navbar and Footer (ticket 03 left a place for it). Wordmark stays live text.
- Generate from the mark: favicon 32×32, apple-touch icon 180×180, 512×512 icon; replace the scaffold `favicon.ico`.
- Generate a 1200×630 Open Graph image: mark + "RapiNexa" wordmark (gold, display font) on the dark theme background.
- Link favicons and wire Open Graph / Twitter card meta (`og:title`, `og:description`, `og:image`, `og:url` = `https://rapinexa.github.io/`, `twitter:card` = `summary_large_image`) using values from the content layer's site meta. Image URLs in meta must be absolute.
- Use any local tooling to generate the images (e.g. a small script); do not add image tooling as a runtime dependency. Commit the generated files.

## Acceptance criteria

- [ ] `yarn typecheck` and `yarn build` pass.
- [ ] The mark file served to the page is ≤ 512×512, transparent, and available as WebP and PNG.
- [ ] The Navbar and Footer show the mark beside the wordmark, with no white box, in both dark and light themes.
- [ ] The browser tab shows the RapiNexa favicon; an apple-touch icon and a 512px icon are linked in the document head.
- [ ] A 1200×630 OG image exists and the document head contains `og:title`, `og:description`, `og:image` (absolute URL), `og:url`, and `twitter:card`.
- [ ] The scaffold favicon is gone.
