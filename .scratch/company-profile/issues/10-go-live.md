# 10 — Go live

**Status:** ready-for-human

**Blocked by:** 08 — Branding assets; 09 — Copywriting (Indonesian)

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** The RapiNexa company profile is publicly reachable at `https://rapinexa.github.io/`, and every WhatsApp CTA reaches RapiNexa's real number.

Steps:
1. Replace the placeholder `whatsapp_url` (`https://wa.me/62123456789`) with the real number in `config.json` (and `config.prod.json` if it overrides it). Fill any optional social/contact keys you want shown.
2. Run `yarn deploy` to publish the build to the `gh-pages` branch.
3. In the `RapiNexa/rapinexa.github.io` repository settings → Pages, set the source to the `gh-pages` branch, root folder.
4. Wait for the Pages build, then verify the live site.

## Acceptance criteria

- [ ] `https://rapinexa.github.io/` serves the Home page over HTTPS.
- [ ] An unknown path (e.g. `/abc`) still shows the Home page rather than GitHub's 404.
- [ ] Tapping a WhatsApp CTA on a phone opens a chat with RapiNexa's real number, with the pre-filled message.
- [ ] Sharing the URL in WhatsApp shows the OG preview (title, description, image).
- [ ] The favicon shows in the browser tab.
- [ ] `main` contains source only; build output lives only on `gh-pages`.
