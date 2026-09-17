# 02 — Platform section

**Status:** ready-for-agent

**Blocked by:** 01 — Starter site on React Router 8 with a working WhatsApp CTA

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** A visitor scrolling the Home page sees a short, visual Platform section: a responsive grid of recognisable monochrome logos with names, showing the third-party technologies RapiNexa can build on or integrate with. A team member can add or remove a Platform with a one-line change in the content layer.

Notes:
- Add the `Platform` type to the content layer: `id`, `name`, optional `icon` (a `react-icons` component), optional `brandColor`.
- Initial list (14): OpenAI, Google Gemini, Google Cloud, AWS, Cloudflare, Laravel, React, React Native, Next.js, WhatsApp, Google Sheets, Xendit, Midtrans, Firebase. Use Simple Icons (`si`) where available; Font Awesome brands where Simple Icons lacks one (e.g. AWS). A Platform with no available icon renders as a text label — check Xendit and Midtrans in particular.
- Add `react-icons` as a dependency.
- Logos use the theme text colour; hover may shift to `brandColor`. Keep the section simple — heading, grid, nothing else.
- The section uses the `platform` anchor id from the content layer and is placed on Home after where Karya will go (final order: Hero, Profil singkat, Layanan, Bundle, Karya, Platform, CTA). Placeholder heading copy is fine.
- Ticket 04's Hero orbit will read a selection of these Platforms, so export them in a form it can reuse.

## Acceptance criteria

- [ ] `yarn typecheck` and `yarn build` pass.
- [ ] The Home page shows a Platform section with all 14 Platforms, each with a name and either a logo or a text-label fallback.
- [ ] Logos are legible in both dark and light themes.
- [ ] The grid reflows at phone width (~375px) with no horizontal scroll.
- [ ] The section element carries the `platform` anchor id.
- [ ] Adding or removing one entry in the content layer adds or removes one tile, with no component change.
