# Quantum Water Systems — site handoff

Static, self-contained marketing site. No build step, no dependencies.
`index.html` + `styles.css` + `script.js` + `assets/`.

## Preview locally
```bash
cd ~/Code/quantum-water-systems
python3 -m http.server 8747
# open http://localhost:8747
```

## Deploy
Drop the folder onto any static host (Netlify, Vercel, Cloudflare Pages, GitHub
Pages, S3). No server required. Point the domain (e.g. QuantumWaterhouses.com) at it.

## Things to finalize (each is a small, marked edit)

### 1. Booking form delivery — `script.js`, `CONFIG` block at top of the form section
- `bookingEmail`: currently `donny@pureluxbio.com`. Change to the real booking inbox.
- `endpoint`: leave blank and the form delivers leads by opening the visitor's
  email client pre-filled (works today). For silent delivery, paste a form
  endpoint (Web3Forms — free, no backend — or Formspree, or your own CRM URL).
  When set, submissions POST there as JSON and the visitor just sees the
  thank-you message.

### 2. Real photography — `styles.css`, the `.scene-*` classes (HealthyTex tiles)
  and the product renders in `index.html` (`#pr-undersink`, `#pr-shower`, `#pr-tower`).
- Tiles: replace each `.scene-mattress / .scene-air / .scene-steam / .scene-cook`
  `background` with `url('assets/<photo>.jpg') center/cover;`. Sizes: feature
  (mattress) ~820×1040, others ~820×500.
- Water systems: swap the inline `<svg class="prod__render">` for `<img>` product
  shots on transparent/white backgrounds if you have them.
- Hero can take a background video/photo behind `.hero__bg` if desired.

### 3. Brand + domain
- Name currently renders as **Quantum Water Systems** (from the pitch deck).
  If the brand is "Quantum Waterworks" or the site lives on QuantumWaterhouses.com,
  find-and-replace the brand name in `index.html` (nav, footer, `<title>`, OG tags).

### 4. Copy / compliance
- Health claims are deliberately conservative with an FDA disclaimer in the
  footer and science section. Have counsel review before adding stronger claims
  (cellular healing, oncology, etc. from the source deck were intentionally left out).

## Content source
Built from Tim Sullivan's forwarded materials (Quantum Water Systems infographic
+ "AWM Quantum Water Systems" go-to-market deck). Product line: under-sink /
shower / whole-home water, plus HealthyTex mattress, air purifier, steam cleaner,
cookware. Pilot market: Newport Beach / OC "Golden Triangle."
