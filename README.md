# TIBE — ADHD-fueled urban design

Portfolio/brand site voor Tibe. Next.js 15 (static export), Tailwind 4, GSAP, Framer Motion.

```bash
npm run dev                          # lokaal op http://localhost:3000
python3 scripts/optimize-images.py   # bronbeelden → WebP (600/1000/1600) + blueprints
scripts/deploy-pages.sh              # build + push naar gh-pages
```

- Productdata, specs, prijzen en contact-e-mail: `lib/data.ts`
- Bronbeelden (PNG uit ChatGPT) staan in `assets-src/` en zitten niet in git; enkel de WebP-varianten in `public/img/` worden gepubliceerd.
- Ontbrekende beelden tonen automatisch een zilveren placeholderkaart; modelshots die niet bestaan worden bij de build overgeslagen.
- Winkelmand en bestelling leven in `localStorage` (statische site, geen server). Betalen staat nog niet open: `/checkout/pay/` houdt de bestelling vast en opent een mail naar Tibe.
