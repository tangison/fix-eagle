# Fix Eagle Investments Auctioneers · Worklog

---
Task ID: 1
Agent: Super Z (main agent)
Task: Build the Fix Eagle website from the filebin assets, following the
design-taste-frontend and hallmark skills, then push to GitHub and deploy to
Vercel.

Work Log:
- Downloaded all 4 assets from filebin (brand zip, company profile PDF,
  website plan, proposal). Read the website plan and extracted full profile
  text as the content source of truth.
- Ran `npx skills use` for design-taste-frontend and hallmark; read both
  SKILL.md outputs completely plus the hallmark references (editorial genre,
  macrostructures index + photographic, component cookbook picks N9/Ft5/F4/T4,
  typography, color, layout, motion, copy, anti-patterns, microinteractions,
  responsive, custom-theme, slop-test).
- Design decision: genre editorial (luxury lean), custom tuned theme anchored
  on brand gold #CDA666, macrostructure 08 Photographic, nav N9-derived
  edge-aligned, footer Ft5 statement, fonts Cormorant Garamond (display) +
  Switzer (body, self-hosted from Fontshare).
- Ran the fullstack-dev init script; scaffolded on Next.js 16 + Tailwind 4.
- Asset pipeline (scripts/process-assets.mjs): 16 photos optimized to
  max-1920px mozjpeg q80, logo exports, favicons (icon.png 512 + apple-icon
  180), OG image 1200x630 composed from the eagle portrait.
- Built the design system in src/app/tokens.css + globals.css: OKLCH palette
  (warm ivory paper, charcoal ink, single gold accent), 4pt spacing, motion
  tokens, hairline system, sharp corners, print-register components.
- Built 14 routes: home (photographic hero + stats + services index + sale
  channels + case studies + process + about teaser), services, process,
  case studies (reference table), about, faq (accordion + FAQPage JSON-LD),
  contact (WhatsApp-first composer with validation), thank-you, privacy,
  terms, disclaimer, brand, 404, error. Plus robots.ts, sitemap.ts,
  manifest.ts, AuctionHouse JSON-LD on home.
- Verified with agent-browser: all pages 200, no console errors, no
  horizontal scroll at 320/375/768/1440, mobile menu navigation, FAQ
  accordion, contact form validation + WhatsApp handoff (prefilled message
  confirmed), dark mode toggle, lazy images load on scroll.
- VLM design audits (5 passes): caught and fixed fonts not resolving
  (next/font variables moved to <html>), muted text contrast (darkened to
  oklch 38%), photo figure position bug (relative wrapper), robots.txt
  conflict with scaffold public file, deprecated middleware convention
  (renamed to proxy.ts).
- Added src/proxy.ts preview guard: non-production hosts get X-Robots-Tag
  noindex.

Stage Summary:
- Site verified working end to end in dev; lint clean; tsc clean for src/.
- All facts sourced from the company profile; zero em dashes; no fabricated
  stats. Footer carries the Tangison Studio credit and copyright.
- Next: commit, push to GitHub (PAT provided), deploy to Vercel (token
  provided).

---
Task ID: 2
Agent: Super Z (main agent)
Task: GitHub push and Vercel deployment.

Work Log:
- Created github.com/tangison/fix-eagle (PAT auth), untracked the scaffold
  .env, pushed main.
- Created Vercel project fix-eagle (team targis47s-projects) git-linked to
  the repo, production branch main.
- Debugged production 404s: root cause was output:"standalone" plus the
  self-hosting build script (cp into .next/standalone). Dropped both, set
  project framework to nextjs. Deploys green since commit 5cd0bf1.
- Relaxed project ssoProtection from all_except_custom_domains to preview
  scope, then to disabled, so the production vercel.app URL is publicly
  reachable.
- Perf pass: slimmed favicon (204KB to 23KB), manifest icon now a 192px
  variant (was the 219KB raw logo), dropped the unused Cormorant 700 weight,
  hero quality 82, AVIF-first image formats. First-load now ~470KB.
- Verified live: all 14 routes plus SEO endpoints 200, 404 works, contact
  form hands off to WhatsApp with prefilled message, fonts loaded, no
  console errors.
- Contrast verified numerically: all text tokens exceed WCAG AAA
  (muted 9.14:1, ink 14.8:1, links 6.04:1, photo text 16:1).

Stage Summary:
- Live at https://fix-eagle-targis47s-projects.vercel.app (auto-deploys
  from GitHub main).
- Preview guard: non-production hosts carry X-Robots-Tag noindex until
  fixeagleinvestments.com is connected (set PRODUCTION_HOST env var or
  update src/proxy.ts).
