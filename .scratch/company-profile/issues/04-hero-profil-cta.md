# 04 — Hero, Profil singkat, and closing CTA

**Status:** ready-for-agent

**Blocked by:** 01 — Starter site on React Router 8 with a working WhatsApp CTA; 02 — Platform section

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** A visitor landing on the Home page sees the full reference-style Hero — starfield background, animated orbit whose chips show RapiNexa's Platforms, an eyebrow, headline, sub-headline, and a prominent WhatsApp CTA — followed by a Profil singkat statement introducing RapiNexa as a team. At the end of the page, a closing CTA section invites them to chat on WhatsApp.

Notes:
- Port the reference Hero, Starfield, HeroOrbit, ProfileSection, and CtaSection (`docs/reactjs/`), replacing the basic Hero from ticket 01.
- HeroOrbit chips come from a Platform selection defined in the content layer (reusing ticket 02's Platform entries), not hardcoded names.
- Remove all personal content (name, "Senior Software Engineer · 10+ Years", resume link, email/social CTAs). Hero and CTA buttons are `WhatsAppButton`s (`source: hero` / `source: cta`).
- All text (eyebrow, headline, sub-headline, Profil statement incl. highlighted phrases, CTA heading/body/label) comes from the content layer; placeholder copy is fine — ticket 09 writes the final copy.
- Starfield must respect the theme store (as in the reference) and remain legible in light theme.
- Final section order on Home: Hero, Profil singkat, Layanan, Bundle, Karya, Platform, CTA.

## Acceptance criteria

- [ ] `yarn typecheck` and `yarn build` pass.
- [ ] The Hero renders with the starfield background, the orbit animation, and orbit chips whose labels match the configured Platform selection.
- [ ] Changing the Platform selection in the content layer changes the orbit chips with no component change.
- [ ] The Hero and closing CTA each contain a WhatsApp button whose `href` starts with `whatsapp_url`.
- [ ] A Profil singkat section renders its statement from the content layer.
- [ ] No personal name, job title, years-of-experience claim, resume link, or personal email remains.
- [ ] Hero, Profil singkat, and CTA are legible in dark and light themes and have no horizontal scroll at phone width (~375px).
- [ ] Sections appear in the order listed above (sections not yet built are simply absent).
