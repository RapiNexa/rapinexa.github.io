# 07 — Add the transparent logo mark

**Status:** ready-for-human

**Blocked by:** None — can start immediately.

**Spec:** `.scratch/company-profile/spec.md`

**What to build:** The RapiNexa R-N mark (gold with purple accents, no wordmark) exists in the repo as a PNG with a transparent background, so the branding ticket can place it on dark and light themes and generate favicons and the social preview image from it.

Notes:
- The versions shared in conversation are unusable as-is: one has a white background, the other is baked into a blurred backdrop.
- Place the file under the public brand assets folder as `rapinexa-mark.png`. Any size ≥ 512×512 is fine — ticket 08 resizes it.

## Acceptance criteria

- [ ] A transparent-background PNG of the mark (mark only, no wordmark) is committed under the public brand assets folder as `rapinexa-mark.png`.
- [ ] It is at least 512×512 and square (or close to it).
- [ ] It shows no white box when viewed on a dark background.
