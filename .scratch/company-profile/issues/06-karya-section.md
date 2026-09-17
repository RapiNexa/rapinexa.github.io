# 06 — Karya section

**Status:** ready-for-agent

**Blocked by:** 01 — Starter site on React Router 8 with a working WhatsApp CTA

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** A prospect sees RapiNexa's Works — one card per Client (Djampi Jawi, Ella Skin Care) with the Client name, an outcome-focused summary, Deliverable chips, and screenshots they can tap to view large and swipe through. A Work without screenshots still renders with an initials placeholder. A team member can add any number of Works by adding content entries.

Notes:
- Add the `Work` type to the content layer: `client`, `summary`, `deliverables` (strings), optional `platforms` (Platform ids), optional `screenshots` (image paths), `initials`. The type must **not** have period, role, or department fields.
- Port the reference FeaturedProjects and ScreenshotGallery (PhotoSwipe) from `docs/reactjs/`, reworked to one card per Client. Remove navigation to a projects page. Add `photoswipe` as a dependency.
- Copy the three Djampi Jawi POS screenshots from the reference project's public screenshots folder into this project's public screenshots folder. The Ella Skin Care screenshot is already present (`ella-skin-care.png`, 1440×1024). All are 1440×1024 framed mockups.
- Initial data (placeholder wording; ticket 09 writes final copy):
  - **Djampi Jawi** — Deliverables: POS Kasir, Panel Admin. Screenshots: the 3 POS mockups. Source: `docs/projects/DJAMPI_JAWI_POS_PORTFOLIO.md`, `DJAMPI_JAWI_PANEL_PORTFOLIO.md`.
  - **Ella Skin Care** — Deliverables consistent with the provided website screenshot and the docs (website/CMS & API, document archive, work-order ticketing). Screenshot: `ella-skin-care.png`. Source: `docs/projects/ELLA_*_PORTFOLIO.md`.
- Platform chips on Work cards are optional. Only render them if ticket 02's Platform entries already exist when you start; otherwise leave `platforms` unset and skip the chips.
- Section uses the `karya` anchor id and sits after Bundle, before Platform.

## Acceptance criteria

- [ ] `yarn typecheck` and `yarn build` pass; adding a `period` or `role` to a Work entry fails typecheck.
- [ ] Karya shows a Djampi Jawi card and an Ella Skin Care card, each with Client name, summary, and Deliverable chips.
- [ ] Tapping a screenshot opens the PhotoSwipe viewer; swiping moves between that Work's screenshots; closing returns to the page.
- [ ] Temporarily removing a Work's screenshots shows the initials placeholder instead of a broken image.
- [ ] Adding a third Work entry renders a third card with no component change.
- [ ] No employment periods, job titles, departments, or links to a projects page appear.
- [ ] The section carries the `karya` anchor id.
- [ ] Cards and gallery work at phone width (~375px) with no horizontal scroll and are legible in both themes.
