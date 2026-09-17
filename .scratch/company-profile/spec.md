# Spec: RapiNexa Company Profile (Home page)

Status: ready-for-agent

## Problem Statement

RapiNexa is a software developer team selling productized digital Services (business websites, Video Shorts/Reels, POS Kasir Standard, simple automation, and the Paket Digital UMKM Bundle) to Indonesian small businesses (UMKM). Today the offer only exists as a WhatsApp outreach template signed by an individual. There is no public place a prospective customer can visit to see what RapiNexa sells, what it costs, what RapiNexa has already delivered for real Clients, and what Platforms it can build on — and no single, obvious way to start a conversation.

The repository `RapiNexa/rapinexa.github.io` currently contains only a fresh React Router 8 scaffold with server rendering enabled, which cannot run on GitHub Pages. A polished personal-portfolio template (Aldila Rochidias' site) exists as a reference project, but its content is personal (years of experience, job roles, periods, employers) and does not fit a company profile.

## Solution

A single-page, Indonesian-language company profile served as a static site at `https://rapinexa.github.io/`, built on the reference template's design system (dark starfield look, purple accent) with RapiNexa branding (gold-and-purple R-N mark, "RapiNexa" wordmark).

The Home page presents, in order: Navbar, Hero, Profil singkat, Layanan (Services with "mulai dari" Starting prices), Bundle (Paket Digital UMKM), Karya (Works — one card per Client, with Deliverables and a screenshot gallery), Platform (logo grid), a closing CTA, and a Footer. Every CTA opens a WhatsApp chat with RapiNexa, pre-filled with the Service of interest where relevant. The WhatsApp link and optional social links live in `config.json`, so contact details change without touching components. All copy lives in one typed content layer, so copywriting can be done independently of component work.

## User Stories

### Prospective customer — first impression

1. As a small-business owner, I want the page to be in Indonesian, so that I understand the offer without translating it.
2. As a small-business owner, I want the first screen to tell me who RapiNexa is and what it does, so that I know within seconds whether it is relevant to me.
3. As a small-business owner, I want a clearly visible WhatsApp button on the first screen, so that I can ask a question immediately.
4. As a small-business owner browsing on my phone, I want the page to be fully usable at phone width, so that I don't have to zoom or scroll sideways.
5. As a visitor, I want the page to load quickly on a mobile connection, so that I don't give up before it renders.
6. As a visitor, I want to see the RapiNexa logo and name, so that I recognise the brand when I see it elsewhere (WhatsApp, social media).
7. As a visitor, I want a short company statement (Profil singkat), so that I understand RapiNexa is a team, not a single freelancer.

### Prospective customer — Services and pricing

8. As a small-business owner, I want to see every Service RapiNexa offers, so that I can find the one that fits my need.
9. As a small-business owner, I want each Service to show a "mulai dari" Starting price, so that I know whether it fits my budget before contacting anyone.
10. As a small-business owner, I want a short description of what each Service includes, so that I know what I get for the price.
11. As a small-business owner interested in a website, I want to see both the one-page landing page and the Company Profile All-In options, so that I can choose the right scope.
12. As a content creator or educator, I want to see the Video Shorts/Reels Service, so that I know RapiNexa can turn my long videos into short vertical clips.
13. As a shop owner still recording sales manually, I want to see the POS Kasir Standard Service and that it is a one-time payment, so that I know there is no subscription.
14. As a business owner, I want to see the simple automation Service, so that I know my orders, leads, follow-ups, or reports can be recorded automatically to a spreadsheet.
15. As a budget-conscious owner, I want the Paket Digital UMKM Bundle highlighted separately with the Services it includes, so that I can see the saving of buying them together.
16. As a small-business owner, I want a WhatsApp button on each Service card, so that I can ask about that specific Service in one tap.
17. As a small-business owner, I want the WhatsApp chat to open with a message already naming the Service I tapped, so that I don't have to type an introduction.
18. As a small-business owner, I want reassurance that I don't need to buy everything, so that I feel comfortable asking for a recommendation.

### Prospective customer — proof of capability

19. As a sceptical prospect, I want to see real Works RapiNexa has delivered, so that I trust the team can deliver.
20. As a prospect, I want each Work to name the Client, so that I know these are real businesses.
21. As a prospect, I want each Work to list its Deliverables (e.g. POS Kasir, Panel Admin), so that I understand what was built.
22. As a prospect, I want each Work described by what it achieved for the Client, so that I can imagine the benefit for my own business.
23. As a prospect, I want to view screenshots of a Work, so that I can judge the quality of the result.
24. As a prospect, I want to tap a screenshot and view it large, swiping between images, so that I can inspect details on my phone.
25. As a prospect, I want to see Djampi Jawi's POS screenshots, so that I can see a real point-of-sale built by RapiNexa.
26. As a prospect, I want to see Ella Skin Care's website screenshot, so that I can see a real, polished client website.
27. As a prospect, I don't want to see employment periods, job titles, or departments, so that the Works read as company deliveries rather than a personal CV.

### Prospective customer — Platforms

28. As a technically aware prospect, I want to see the Platforms RapiNexa can build on or integrate with, so that I know my existing tools are supported.
29. As a prospect, I want to recognise familiar logos (Google, OpenAI, AWS, WhatsApp, Midtrans, …), so that I trust the team works with established technology.
30. As a prospect using Indonesian payment gateways, I want to see Xendit and Midtrans, so that I know online payments can be integrated.
31. As a prospect, I want the Platform section to be brief and visual, so that it doesn't distract from the Services.

### Prospective customer — contact and navigation

32. As a visitor, I want navbar links that scroll to Layanan, Karya, and Platform, so that I can jump to what interests me.
33. As a mobile visitor, I want a mobile menu with the same links and the WhatsApp button, so that navigation works on a small screen.
34. As a visitor who scrolled to the bottom, I want a closing CTA, so that I can contact RapiNexa without scrolling back up.
35. As a visitor, I want the footer to state "Melayani seluruh Indonesia", so that I know RapiNexa serves my city.
36. As a visitor, I want the footer to show the WhatsApp contact and the GitHub organisation, so that I have more than one way to verify the team.
37. As a visitor, I want to switch between dark and light themes, so that I can read comfortably in daylight.
38. As a returning visitor, I want my theme choice remembered, so that I don't have to switch it again.
39. As a first-time visitor, I want the page to open in the dark theme, so that I see the brand's intended look.
40. As a visitor sharing the link in WhatsApp or social media, I want a rich preview (title, description, image with the RapiNexa mark), so that the shared link looks trustworthy.
41. As a visitor, I want a recognisable browser tab icon, so that I can find the tab again.
42. As a visitor who follows an unknown path on the site, I want to still land on the Home page rather than a GitHub 404, so that I am not lost.

### RapiNexa team — operating the site

43. As a RapiNexa team member, I want the WhatsApp link stored in `config.json`, so that I can change the number without touching components.
44. As a team member, I want optional social/contact links (e.g. Instagram, email, LinkedIn) as `config.json` keys that only render when filled, so that I can add channels later without code changes.
45. As a team member, I want all Services, Starting prices, the Bundle, Works, Deliverables, and Platforms in one typed content layer, so that I can update the offer in one place.
46. As a team member, I want to add a third (or any number of) Work by adding a data entry, so that the Karya section grows without component changes.
47. As a team member, I want a Work without screenshots to still render with an initials placeholder, so that I can publish a Work before I have images.
48. As a team member, I want to add screenshots to a Work by placing images and listing them in its data entry, so that the gallery appears automatically.
49. As a team member, I want to add or remove a Platform logo with a one-line data change, so that the showcase stays current.
50. As a team member, I want to change a Starting price in the content layer only, so that prices never drift between components.
51. As a team member, I want to deploy with a single `yarn deploy`, so that publishing does not require remembering manual steps.
52. As a team member, I want source to stay on `main` and build output on a separate `gh-pages` branch, so that the source history is not mixed with compiled files.
53. As a team member, I want brand colours defined as a small set of theme variables, so that a future rebrand is a one-place edit.
54. As a team member, I want every CTA to pass through one shared WhatsApp button that knows where it was clicked from, so that analytics can be added later in one place.
55. As a copywriter, I want to write all Indonesian copy (sections, meta tags, pre-filled messages) in the content layer only, so that I can work without touching component code.
56. As a developer, I want `yarn typecheck` to catch a malformed Service, Bundle, Work, or Platform entry, so that content mistakes fail before deploy.

## Implementation Decisions

### Foundation

- Port the reference template onto the existing React Router **8** dependencies (not the reference's 7.16). The reference already enables the `v8_*` future flags, so the port is expected to be small; drop flags that are defaults in v8.
- Single-page application mode: `ssr: false`. No server `loader`/`action` exports. Data is imported statically at build time.
- Non-default app directory, matching the reference: the app lives under `src/app`; shared code lives under `src/` (`data`, `lib`, `states`, `types`, `assets`). The scaffold's `app/` directory is removed.
- Config-based routing with a single index route (Home) inside the public layout. The reference's `/projects` route is not ported.
- Root document uses `lang="id"`, loads Space Grotesk / Manrope / Space Mono, and sets title, description, Open Graph, and Twitter card meta from the content layer.
- Import conventions follow the reference: absolute from repo root for cross-directory imports, relative for siblings. The stale `~/*` alias is removed or corrected rather than carried over as a trap.
- Dependencies: keep `photoswipe`, `zustand`, `clsx`; add `react-icons` (Platform logos) and `gh-pages` (deploy). Do **not** port `@heroui/*` or `embla-carousel-react` — unused in the reference.
- Remove the `Dockerfile` and `.dockerignore`; rewrite `README.md` for this project (commands, deploy flow, content-editing guide).
- Deploy: `yarn deploy` builds then publishes the client build output to the `gh-pages` branch; a post-build step copies `index.html` to `404.html` for SPA fallback. Site is served at the domain root, so no router basename. Source stays on `main`.

### Theme and branding

- Port the reference theme variables (dark default, light override) and keep the purple accent unchanged. Add one secondary brand token, **gold** (≈ `#d8b36a`, tuned for contrast in both themes), used sparingly: wordmark, highlighted Bundle card, small highlights.
- Theme state: port the reference's single persisted UI store (theme only persisted, default dark) and theme hook that writes `data-theme` onto `<html>`. Storage keys are renamed to a RapiNexa namespace.
- Logo mark: provided by the user as a transparent PNG. If larger than ~512px it is resized to 512px and exported as optimised PNG + WebP. From it, generate a favicon set (32, 180 apple-touch, 512) and a 1200×630 Open Graph image (mark + wordmark on the dark background).
- Wordmark: "RapiNexa" rendered as live text in the display font using the gold token — not an image.

### Configuration module

- Port the reference config reader (`getConfig(key)`: dev reads `config.json`; prod reads `config.prod.json` falling back to `config.json`). Both files stay key-compatible.
- Keys: app name/display name, storage keys, `experiments` (empty), `whatsapp_url` = `https://wa.me/62123456789`, and optional social/contact keys (GitHub organisation set to `https://github.com/RapiNexa`; Instagram, TikTok, LinkedIn, email present but empty). The service-area line is copy, not config.
- No analytics key is required now; analytics is explicitly deferred.

### Content layer (deep module, single source of truth)

One typed content module under `src/data` replaces the reference's portfolio data. Every section component imports from it and holds no copy of its own. Shape (names indicative):

- **Site meta**: title, description, OG title/description, OG image path.
- **Hero**: eyebrow, headline, sub-headline, CTA label, orbit Platform selection.
- **Profile**: company statement (may mark highlighted phrases).
- **Services**: list of `Service` — `id` (stable slug, also used as CTA source), `name`, `summary`, `includes` (bullet list), `startingPrice` (number, in Rupiah), optional `priceNote` (e.g. "sekali bayar", "maks. 48 jam"), optional `options` (for Website bisnis: Landing Page vs Company Profile All-In, each with its own Starting price), `whatsappMessage`.
- **Bundle**: `name` ("Paket Digital UMKM"), `price`, `includes` (references to Service ids plus quantity/notes), `summary`, `whatsappMessage`.
- **Works**: list of `Work` — `client`, `summary` (outcome-focused), `deliverables` (list of strings), `platforms` (optional list of Platform ids), `screenshots` (optional list of image paths), `initials` (placeholder fallback). **No period, role, or department fields exist in the type.**
- **Platforms**: list of `Platform` — `id`, `name`, `icon` (react-icons component reference, optional), `brandColor` (optional). Initial list (14): OpenAI, Google Gemini, Google Cloud, AWS, Cloudflare, Laravel, React, React Native, Next.js, WhatsApp, Google Sheets, Xendit, Midtrans, Firebase. Any Platform without an icon in react-icons renders as a text label.
- **Section headings/labels** for Layanan, Bundle, Karya, Platform, CTA, Footer (including "Melayani seluruh Indonesia").
- **Starting price formatting** is a single helper producing "mulai dari Rp249.000" style strings (Indonesian thousands separator); components never format prices themselves.
- Code tickets populate this module with placeholder copy and the known facts (Service list, Starting prices, Clients, Deliverables, Platforms). The copywriting ticket replaces placeholder text only.

Starting prices (from the services template):

| Service | Starting price |
|---|---|
| Website bisnis — Landing Page / Company Profile All-In | Rp249.000 / Rp1.249.000 |
| Video Shorts/Reels (5 videos) | Rp150.000 |
| POS Kasir Standard (one-time payment) | Rp499.000 |
| Automation sederhana | Rp150.000 |
| Bundle: Paket Digital UMKM | Rp1.499.000 |

Works (initial):

| Client | Deliverables source | Screenshots |
|---|---|---|
| Djampi Jawi | POS app + admin Panel (reference project docs) | 3 POS mockups copied from the reference project |
| Ella Skin Care | Website/CMS & API, document archive, work-order ticketing (reference project docs); copy should match the provided website screenshot | the provided 1440×1024 website mockup |

Both Clients are cleared for public display by name. A third Work is TBD and must not block launch.

### WhatsApp CTA module

- A pure helper builds the WhatsApp URL from `whatsapp_url` plus an optional message, URL-encoding the message as the `text` query parameter.
- One shared `WhatsAppButton` component is the only way any section renders a CTA. Props: `source` (e.g. `navbar`, `hero`, `service:<id>`, `bundle`, `cta`, `footer`), optional `message`, visual variant, label. It opens in a new tab with safe `rel`. `source` is unused today and exists as the single future analytics hook.

### Sections (ported/adapted from the reference)

- **Navbar**: wordmark + mark; in-page anchor links (Layanan · Karya · Platform) with smooth scroll; theme toggle; WhatsApp button replacing the reference's GitHub/LinkedIn buttons; mobile menu with the same items.
- **Hero**: reference Hero + Starfield + HeroOrbit; orbit chips show Platform names/logos from the content layer; primary WhatsApp CTA. Personal text ("Senior Software Engineer · 10+ Years", name) is replaced.
- **Profil singkat**: reference ProfileSection with RapiNexa statement.
- **Layanan**: new section in the reference's card language; one card per Service with name, summary, includes, Starting price (and options for Website bisnis), price note, and a per-Service WhatsApp button with its pre-filled message.
- **Bundle**: one highlighted card (gold accent) with the Bundle price, the included Services, a "tidak perlu ambil semuanya" reassurance line, and its WhatsApp button.
- **Karya**: reference FeaturedProjects + ScreenshotGallery (PhotoSwipe) reworked to one card per Client: Client name, outcome summary, Deliverable chips, optional Platform chips, and a gallery; initials placeholder when no screenshots. Renders any number of Works. No navigation to a projects page.
- **Platform**: simple responsive grid of monochrome logos with names; logos use the theme text colour and may shift to brand colour on hover; text-label fallback.
- **CTA**: reference CtaSection with a WhatsApp CTA replacing email/social links.
- **Footer**: wordmark, "Melayani seluruh Indonesia", WhatsApp link, GitHub organisation, and any filled optional social keys; the reference's rotating role list is removed.
- **Dropped from the reference**: StatsSection, ExperienceTimeline, ShowcaseSection, SpotlightGrid (unless reused internally by a new section), `/projects` route, resume PDF, and all screenshots other than Djampi Jawi's.

### Work breakdown

Delivered as ten tickets under `.scratch/company-profile/issues/`: foundation; content layer + WhatsApp CTA; add transparent mark (human); branding assets; page frame (Navbar, Hero, Profil singkat, CTA, Footer); Layanan + Bundle; Karya; Platform; **copywriting (isolated, for a higher-reasoning model)**; go-live (human: set Pages source to `gh-pages`, first deploy).

## Testing Decisions

- There is no test runner and none will be added. The acceptance seam is the **built Home page** — the highest seam available — plus the type checker.
- A good check verifies externally observable behaviour only: what renders, where links point, how the page behaves at different widths and themes. It does not assert internal component structure.
- Every code ticket must pass:
  1. `yarn typecheck` — also validates that content entries conform to the Service / Bundle / Work / Platform types (a Work cannot carry a period or role because the type has no such field).
  2. `yarn build` — succeeds and emits both `index.html` and `404.html` in the client output.
  3. A browser check of the built/served page: all sections render in order; dark (default) and light themes both legible; layout works at phone (~375px) and desktop widths with no horizontal scroll; every CTA `href` begins with the configured `whatsapp_url` and pre-filled messages are URL-encoded; navbar anchors scroll to their sections; the Karya gallery opens and swipes; Works without screenshots show the initials placeholder; theme choice persists across reload.
- Modules exercised by these checks: content layer (via typecheck and render), WhatsApp link helper and button (via CTA hrefs), config reader (via `whatsapp_url` and optional social keys rendering only when set), sections, theme store.
- Prior art: the reference project uses `yarn typecheck` as its only automated gate; this project follows the same convention, adding build output and browser verification.

## Out of Scope

- Pages other than Home (no `/projects`, no per-Service or per-Work detail pages, no blog).
- English or any other language; language switching.
- Analytics, tracking pixels, cookie/consent banners.
- Contact forms, email sending, chatbots, or any backend.
- Online checkout or payment for Services.
- Server-side rendering and Docker deployment.
- Custom domain setup.
- Stats/metrics section (no verified team-level figures yet).
- Team member profiles.
- Creating the transparent logo mark itself (supplied by the user).
- Choosing the third Work.
- Unit-test infrastructure.

## Further Notes

- Domain vocabulary is defined in `CONTEXT.md` (RapiNexa, Service, Starting price, Bundle, Work, Client, Deliverable, Platform, CTA). Use these terms in code identifiers and copy guidance; avoid "project", "portfolio", "skill", "experience".
- Source material for copy: the services template in `docs/notebooks/`, and per-Client project docs in `docs/projects/` (Djampi Jawi POS/Panel, Ella CMS/Doc/Ticket). The reference project lives in `docs/reactjs/` and is git-ignored; both `docs/reactjs/` and `docs/projects/` are local-only references.
- The services template is signed by an individual and addressed informally ("Kak"); site copy must speak as RapiNexa (the team), friendly but professional. Starting prices are introductory and expected to change — keep them only in the content layer.
- The Ella Skin Care screenshot shows the public website; Deliverable copy should be consistent with it.
- The WhatsApp number `62123456789` is a placeholder and must be replaced in `config.json` before real launch.
- GitHub Pages must be configured once (by a human) to serve from the `gh-pages` branch.
