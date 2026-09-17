# 01 — Starter site on React Router 8 with a working WhatsApp CTA

**Status:** ready-for-agent

**Blocked by:** None — can start immediately.

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** A visitor opening the built site sees an Indonesian, dark-themed Home page with a basic Hero (placeholder headline) and one WhatsApp button that opens the `whatsapp_url` from `config.json`. They can switch to light theme and the choice survives a reload. The site builds as a static SPA ready for GitHub Pages, and a team member can publish it with `yarn deploy`.

This is the tracer bullet: it ports the reference template's foundation (`docs/reactjs/`) onto the existing React Router 8 dependencies and establishes the modules every later ticket builds on — the content layer, the config reader, the WhatsApp link helper, and the shared `WhatsAppButton`.

Notes:
- Keep React Router 8 (do not downgrade to the reference's 7.16). SPA mode (`ssr: false`), app directory under `src/app`, config-based routes with a single index route inside the public layout. No `/projects` route.
- Port from the reference: root document (fonts, `lang="id"`), public/base layouts, theme store (persist theme only, default dark, RapiNexa storage keys), theme hook, stylesheet and theme variables (keep purple accent), config reader (`config.json` + key-compatible `config.prod.json`), utility types.
- Add a **gold** secondary brand token (≈ `#d8b36a`, legible in both themes) next to the accent tokens.
- Dependencies: add `clsx`, `zustand`, `gh-pages` now (later tickets add `photoswipe`, `react-icons`). Do not add `@heroui/*` or `embla-carousel-react`.
- Content layer seed (see spec "Content layer"): site meta (title, description, OG fields), Hero text, and the **section anchor ids** (`layanan`, `karya`, `platform`, plus any others) that the Navbar and all sections will use. Placeholder copy is fine — ticket 09 writes the real copy.
- WhatsApp: pure helper that builds the URL from `whatsapp_url` + optional message (URL-encoded `text` param); `WhatsAppButton` with `source`, optional `message`, variant, label; opens in a new tab with safe `rel`. `source` is not used for anything yet (future analytics hook).
- Config keys: name/display name, storage keys, `experiments: []`, `whatsapp_url: "https://wa.me/62123456789"`, `social_github: "https://github.com/RapiNexa"`, and empty optional keys for Instagram, TikTok, LinkedIn, email.
- Remove the scaffold `app/` directory, `Dockerfile`, `.dockerignore`. Fix or remove the stale `~/*` tsconfig alias. Rewrite `README.md` (commands, deploy flow, where to edit content/config).
- Scripts: `postbuild` copies `index.html` → `404.html`; `predeploy` builds; `deploy` publishes the client build output to the `gh-pages` branch (source stays on `main`). No router basename (site is at the domain root).

## Acceptance criteria

- [ ] `yarn typecheck` passes.
- [ ] `yarn build` succeeds and the client output contains both `index.html` and `404.html`.
- [ ] The served build shows the Home page with `<html lang="id">`, a page title and meta description from the content layer, and a Hero with a WhatsApp button.
- [ ] The WhatsApp button's `href` starts with the `whatsapp_url` from `config.json`; when given a message, the message appears URL-encoded in the `text` parameter; it opens in a new tab.
- [ ] Changing `whatsapp_url` in `config.json` changes the button's link without touching components.
- [ ] The page opens in the dark theme; a theme toggle switches to light; the choice persists after reload.
- [ ] A gold token is available in both themes alongside the unchanged purple accent.
- [ ] No server `loader`/`action` exports; the scaffold `app/` directory, `Dockerfile`, and `.dockerignore` are gone.
- [ ] `package.json` has working `deploy`/`predeploy`/`postbuild` scripts targeting the `gh-pages` branch.
- [ ] `README.md` describes this project, not the React Router template.
