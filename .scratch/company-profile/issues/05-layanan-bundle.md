# 05 — Layanan and Bundle sections

**Status:** ready-for-agent

**Blocked by:** 01 — Starter site on React Router 8 with a working WhatsApp CTA

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** A small-business owner sees every Service RapiNexa sells as a card with a short summary, what's included, a "mulai dari Rp…" Starting price, and a WhatsApp button that opens a chat pre-filled with that Service's name. Below, the Paket Digital UMKM Bundle is highlighted as its own gold-accented card listing the Services it includes, its price, a "no need to take everything" reassurance, and its own WhatsApp button.

Notes:
- Add `Service` and `Bundle` types to the content layer (shape in the spec: stable `id`, `name`, `summary`, `includes`, `startingPrice` in Rupiah as a number, optional `priceNote`, optional `options` each with its own Starting price, `whatsappMessage`; Bundle with `name`, `price`, `includes` referencing Service ids plus notes, `summary`, `whatsappMessage`).
- Add one price-formatting helper producing Indonesian format ("mulai dari Rp249.000"); components never format prices themselves.
- Data (facts are fixed; wording is placeholder until ticket 09):

  | Service | Starting price | Note |
  |---|---|---|
  | Website bisnis — options: Landing Page / Company Profile All-In | Rp249.000 / Rp1.249.000 | domain & hosting paid by the customer |
  | Video Shorts/Reels (5 vertical videos) | Rp150.000 | max 48 hours |
  | POS Kasir Standard | Rp499.000 | one-time payment, no subscription |
  | Automation sederhana | Rp150.000 | depends on needs |
  | **Bundle:** Paket Digital UMKM — landing page, 5 Shorts/Reels, POS Kasir Standard, 1 simple automation | Rp1.499.000 | |

  Source: `docs/notebooks/template-proposal-penawaran.md`.
- Each Service card's CTA is a `WhatsAppButton` with `source: service:<id>` and the Service's `whatsappMessage`; the Bundle's uses `source: bundle`.
- Card styling follows the reference card language (surface, border, accent); the Bundle card uses the gold token.
- Layanan uses the `layanan` anchor id; Bundle sits directly after it. Section headings come from the content layer.

## Acceptance criteria

- [ ] `yarn typecheck` and `yarn build` pass; a Service entry missing a required field fails typecheck.
- [ ] Layanan shows 4 Service cards; Website bisnis shows both options with their own Starting prices.
- [ ] Every price is rendered by the shared helper in Indonesian format (e.g. "Rp1.249.000"), prefixed "mulai dari" for Starting prices.
- [ ] Each Service card's WhatsApp `href` starts with `whatsapp_url` and carries that Service's URL-encoded pre-filled message.
- [ ] The Bundle card is visually distinct (gold accent), lists its included Services, shows Rp1.499.000, and has its own WhatsApp button with its pre-filled message.
- [ ] Changing a price in the content layer changes it on the page with no component change.
- [ ] The Layanan section carries the `layanan` anchor id.
- [ ] Cards stack cleanly at phone width (~375px) with no horizontal scroll, and are legible in both themes.
