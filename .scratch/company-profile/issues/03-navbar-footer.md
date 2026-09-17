# 03 — Navbar and Footer

**Status:** ready-for-agent

**Blocked by:** 01 — Starter site on React Router 8 with a working WhatsApp CTA

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** A visitor always has a Navbar showing the "RapiNexa" wordmark, links that smooth-scroll to Layanan, Karya, and Platform, a theme toggle, and a WhatsApp button; on a phone the same items live in a mobile menu. At the bottom of the page, a Footer shows the wordmark, "Melayani seluruh Indonesia", the WhatsApp contact, the GitHub organisation, and any other social/contact link a team member has filled in `config.json`.

Notes:
- Port the reference Navbar and Footer (`docs/reactjs/`) and adapt them:
  - Navbar: route links (About/Projects) become in-page anchor links using the section anchor ids from the content layer; GitHub/LinkedIn buttons are replaced by a `WhatsAppButton` (`source: navbar`); keep the theme toggle; keep the mobile menu with the same items. No route navigation.
  - Footer: remove the rotating role list and personal links; show wordmark, service-area line, WhatsApp link (`source: footer`), and social icons driven by config.
- Wordmark: "RapiNexa" as live text in the display font using the gold token (not an image). Ticket 08 later adds the logo mark next to it — leave an obvious place for it.
- Social/contact links: each optional `config.json` key (GitHub, Instagram, TikTok, LinkedIn, email) renders an icon/link only when its value is non-empty. GitHub is set; the others are empty.
- Navbar/Footer labels and the service-area line come from the content layer (placeholder copy is fine except "Melayani seluruh Indonesia", which is decided).
- Anchor links may point at sections that land in other tickets; they must not throw when the target is missing.

## Acceptance criteria

- [ ] `yarn typecheck` and `yarn build` pass.
- [ ] The Navbar shows the gold "RapiNexa" wordmark, anchor links to Layanan, Karya, and Platform, a theme toggle, and a WhatsApp button whose `href` starts with `whatsapp_url`.
- [ ] Clicking an anchor link smooth-scrolls to the matching section when it exists (Platform exists after ticket 02).
- [ ] At phone width (~375px) the links, toggle, and WhatsApp button are reachable through a mobile menu that opens and closes.
- [ ] The Footer shows the wordmark, "Melayani seluruh Indonesia", a WhatsApp link, and a GitHub link to `https://github.com/RapiNexa`.
- [ ] Filling an empty social key (e.g. Instagram) in `config.json` makes its icon appear; emptying it hides it — no component change.
- [ ] No personal links, names, or role lists from the reference remain.
- [ ] Both render correctly in dark and light themes with no horizontal scroll at phone width.
