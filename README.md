# RapiNexa Company Profile

The public, single-page company profile of RapiNexa — an Indonesian
software developer team — served as a static site at
[rapinexa.github.io](https://rapinexa.github.io/). It advertises RapiNexa's
Services to Indonesian small businesses (UMKM) and showcases past Works to
earn trust, funnelling visitors into a WhatsApp conversation.

Domain vocabulary (RapiNexa, Service, Starting price, Bundle, Work, Client,
Deliverable, Platform, CTA) is defined in [CONTEXT.md](CONTEXT.md); the full
product spec lives under [.scratch/company-profile/](.scratch/company-profile/spec.md).

## Commands

```bash
yarn install    # install dependencies
yarn dev        # dev server on :5173
yarn build      # react-router build -> build/client, then copies
                # index.html -> 404.html (SPA fallback for GitHub Pages)
yarn typecheck  # react-router typegen && tsc -- the only verification gate
yarn deploy     # predeploy builds, then gh-pages publishes build/client
                # to the gh-pages branch
```

There is no test suite and no linter. `yarn typecheck` is the only automated
check — run it before considering a change done. It regenerates route types
first, so run it (not bare `tsc`) after touching routes.

## Architecture

**Static SPA.** `ssr: false` in [react-router.config.ts](react-router.config.ts).
There is no server runtime in the deployed site — no server `loader`/`action`
exports, no `build/server` output. Data is imported statically at build
time; browser APIs (`document`, `localStorage`) are used directly in
components and hooks.

**Non-default app directory.** `appDirectory: "./src/app"`, so route
modules, `root.tsx`, and `routes.ts` live under `src/app/`, not `./app/`.
Shared code lives under `src/` (`data`, `lib`, `states`, `types`, `assets`).

**Routing.** Config-based, declared in [src/app/routes.ts](src/app/routes.ts).
A single index route (Home) lives inside `PublicLayout`. There is no router
basename — the site is served at the domain root.

**State.** A single Zustand store, [src/states/uiState.ts](src/states/uiState.ts),
persists only `theme` to `localStorage` (default `dark`). Theme is applied
by [useTheme](src/app/hooks/useTheme.ts), which writes `data-theme` onto
`<html>`.

**Config.** [src/lib/config.ts](src/lib/config.ts) exposes `getConfig(key)`,
which reads `src/config.json` in dev and `src/config.prod.json` (falling
back to `config.json`) in prod. Both files must stay key-compatible — a key
added to only one will silently resolve differently between environments.

**WhatsApp CTA.** [src/lib/whatsapp.ts](src/lib/whatsapp.ts) builds a
`wa.me` chat link from the configured `whatsapp_url` plus an optional
pre-filled, URL-encoded message. Every CTA on the site renders through the
shared [WhatsAppButton](src/app/components/WhatsAppButton.tsx) component —
components never build the link themselves.

**Content layer.** [src/data/content.ts](src/data/content.ts) is the site's
typed content module. Every section component imports its copy from here
and holds none of its own, so copywriting can happen without touching
component code.

**Styling.** Tailwind 4 via the Vite plugin, single stylesheet at
[src/assets/styles/app.css](src/assets/styles/app.css). Theme variables
(dark default, light override) live there — purple (`--accent`) is the
primary brand accent, gold (`--gold`) is the secondary brand token. Fonts
(Space Grotesk / Manrope / Space Mono) are loaded in `src/app/root.tsx`.

## Editing content and config

- **Copy, site meta, section text** — edit [src/data/content.ts](src/data/content.ts).
- **WhatsApp number, social/contact links** — edit `whatsapp_url` and the
  `social_*`/`contact_email` keys in [src/config.json](src/config.json) and
  [src/config.prod.json](src/config.prod.json) (keep both files' keys in
  sync). An optional social/contact key only needs a value; sections that
  read it render it only when it is non-empty.
- **Brand colours** — edit the theme variables in
  [src/assets/styles/app.css](src/assets/styles/app.css).

## Import conventions

- Cross-directory: absolute from the repo root — `import { getConfig } from "src/lib/config"`.
  Works via `baseUrl: "."` in [tsconfig.json](tsconfig.json).
- Sibling/nearby: relative — `import Hero from "../../components/Hero"`.
- There is no `~/*` alias. Use the conventions above instead.

## Deploying

Source stays on `main`; `yarn deploy` publishes the contents of
`build/client` to the `gh-pages` branch via the `gh-pages` package. GitHub
Pages must be configured once (by a human) to serve from that branch — see
`.scratch/company-profile/issues/10-go-live.md`.

```bash
yarn deploy
```
