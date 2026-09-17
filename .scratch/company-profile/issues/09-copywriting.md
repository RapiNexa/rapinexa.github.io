# 09 — Copywriting (Indonesian)

**Status:** ready-for-agent

**Blocked by:** 02 — Platform section; 03 — Navbar and Footer; 04 — Hero, Profil singkat, and closing CTA; 05 — Layanan and Bundle sections; 06 — Karya section

**Spec:** `.scratch/company-profile/spec.md`

> Intended for a higher-reasoning model. This ticket changes **only the content layer** — no components, styles, or config.

**What to build:** Every piece of text a visitor reads — and every WhatsApp message they send — is final, persuasive Indonesian copy written in RapiNexa's voice, replacing all placeholder text left by the code tickets.

Scope — all copy fields in the content layer:
- Site meta: page title, meta description, OG title/description.
- Navbar/Footer labels (keep "Melayani seluruh Indonesia").
- Hero: eyebrow, headline, sub-headline, CTA label.
- Profil singkat statement (with highlighted phrases).
- Layanan: section heading/intro; each Service's name, summary, includes, price note, CTA label, pre-filled WhatsApp message.
- Bundle: name ("Paket Digital UMKM"), summary, includes wording, reassurance line (don't need to take everything; we can help pick the most relevant and economical option), CTA label, pre-filled WhatsApp message.
- Karya: section heading/intro; each Work's outcome-focused summary and Deliverable labels.
- Platform: section heading/intro.
- Closing CTA: heading, body, label.
- A general pre-filled WhatsApp message for non-Service CTAs (navbar, hero, cta, footer).

Voice and rules:
- Indonesian only. Friendly but professional; speak as **RapiNexa** (the team — "kami"), never as an individual ("saya") and never signed by a person.
- Audience: Indonesian small-business owners (UMKM). Plain language; keep familiar loanwords (landing page, company profile, POS, Shorts/Reels, automation) where the audience uses them.
- Use the glossary in `CONTEXT.md` (Service, Starting price, Bundle, Work, Client, Deliverable, Platform, CTA) to understand concepts; visible copy is Indonesian.
- Works: describe what was achieved for the Client. **No periods, job titles, departments, personal names, internal metrics that can't be verified, or technical jargon dumps.** Ella Skin Care copy must be consistent with its screenshot (public website) as well as the docs.
- Starting prices are facts from ticket 05 — do not change numbers; describe them as "mulai dari".
- Pre-filled WhatsApp messages: short, polite, name the Service/Bundle, and invite a recommendation (e.g. "Halo RapiNexa, saya tertarik dengan …").
- Meta description ≤ ~155 characters; title ≤ ~60 characters.

Sources:
- Services: `docs/notebooks/template-proposal-penawaran.md` (re-voice from individual to team).
- Works: `docs/projects/DJAMPI_JAWI_POS_PORTFOLIO.md`, `DJAMPI_JAWI_PANEL_PORTFOLIO.md`, `ELLA_CMS_PORTFOLIO.md`, `ELLA_DOC_PORTFOLIO.md`, `ELLA_TICKET_PORTFOLIO.md`; screenshots in the public screenshots folder.

## Acceptance criteria

- [ ] Only the content layer changed; `yarn typecheck` and `yarn build` pass.
- [ ] No placeholder, lorem ipsum, or English UI copy remains on the page (brand/Platform names and accepted loanwords excepted).
- [ ] No copy uses "saya", a personal name, employment periods, job titles, or departments.
- [ ] Every Service and the Bundle have a pre-filled WhatsApp message naming it; general CTAs have a general message.
- [ ] Prices on the page are unchanged from ticket 05.
- [ ] Page title ≤ ~60 characters and meta description ≤ ~155 characters.
- [ ] Text fits the layout at phone width (~375px) without overflow or awkward wrapping in the Hero headline.
