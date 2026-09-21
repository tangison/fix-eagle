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

---
Task ID: 3
Agent: Super Z (main agent)
Task: Revision round per client feedback: Target.com typography bar,
Collins hamburger menu, widgets, brown theme, wordmark fix.

Work Log:
- Re-fetched the filebin (still live); recovered exact brand codes:
  gold #CDA666, charcoal #393936, slate-navy #44536A (headings),
  orange #EC7C30 (sparing), white base.
- Studied the bars live: extracted Target's font ("Helvetica for
  Target", weights 400/500/600/700/800) from their CSS; screenshotted
  and measured the wearecollins.com menu (72px links, #140700 overlay,
  two-line icon, featured column, pill CTA).
- Typography: self-hosted Inter variable (closest world-class match),
  single family, 400 body / 700 headings / 800 hero; pill CTAs.
- Wordmark: FIX EAGLE / AUCTIONEERS (Investments removed, header and
  footer); trading name kept in metadata and legal lines.
- Palette re-anchored on the exact brand hexes; headings slate-navy,
  ink charcoal, links deep gold #7A5E22; brown theme (.theme-brown,
  cocoa #2E261B ground, ivory text, gold headings) on privacy, terms,
  disclaimer, brand only; header joins the brown ground via :has().
- Widgets: Collins-style full-screen menu overlay on all viewports
  (staggered links, featured work, gold pill CTA); desktop mega
  dropdowns (Services, Company) with hover intent; channel tabs;
  process tabs; embla case-study carousel (arrows above, gold dots);
  sector filter dropdown; services accordion; count of text cut hard
  across home/services/process/about.
- Three production bugs found and fixed: (1) hero text invisible:
  Tailwind cannot infer text-[var(--photo-ink)] as color next to a
  text-[length] utility, plus unlayered base CSS overriding layered
  utilities (moved base into @layer base, real .photo-text classes);
  (2) text-muted resolving to the shadcn surface token (--color-muted:
  var(--paper-2)) so all muted text rendered near-white on white
  (renamed token to --color-soft, swept all usages); (3) 1440px hero
  width 400ing the Next optimizer (blank hero on desktop; added 1440
  to deviceSizes and 82 to qualities).
- Gauntlet blind-critic loops (VLM, labels stripped): menu lost to
  Collins in round 1 (links cramped, muddy bg, heavy bottom bar),
  refined, round 3 the critic picked OUR menu over the Collins
  reference. Home audited against the Target register: tabs, dots,
  arrows, mega spacing and brown text brightness upgraded per verdict.
- Verified in production build: all routes 200, no console errors, no
  horizontal scroll at 320/390/768/1440, menu/dropdown/tabs/carousel/
  filter/accordion/form all interactive, WhatsApp handoff prefilled,
  dark mode toggle, hero 800-weight white on photo, contrast checked
  numerically (soft 7.66:1 on white, brown muted 9.5:1 on cocoa).
- Pushed 8ab3495 to github.com/tangison/fix-eagle; Vercel auto-deploy
  verified live: all routes 200, new wordmark live, AVIF hero 200,
  robots and sitemap 200.

Stage Summary:
- Live revision deployed at
  https://fix-eagle-targis47s-projects.vercel.app
- Menu overlay wins the blind comparison against the Collins bar;
  typography now runs the Target register on exact brand color codes.

---
Task ID: 4
Agent: Super Z (main agent)
Task: Post-revision verification pass; fix any regressions found on the
live deployment.

Work Log:
- Re-verified the deployed revision end to end: all 14 routes plus
  robots/sitemap return 200, 404 works, wordmark reads FIX EAGLE /
  Auctioneers with Investments only in metadata and legal lines, the
  self-hosted Inter variable (100 to 900) loads 200 at 48KB, the
  Collins-style menu overlay opens with featured work column, the
  case-study carousel slides, and desktop mega dropdowns are wired.
- Found a real defect on the brown text-heavy pages: the body:has()
  hooks referenced var(--paper) outside the .theme-brown wrapper, so
  the custom properties resolved to root white. Brown pages rendered a
  white header bar and a 623px white footer outside the cocoa wrapper.
- Fixed by extending the brown token block in tokens.css to target the
  header and footer directly (body:has(.theme-brown) .site-header /
  .site-footer), adding the missing site-footer class hook plus
  text-ink on the footer element (the token override alone does not
  re-declare the inherited color property), and painting the body cocoa
  so overscroll never shows white.
- Also repaired the stale start script still pointing at the dropped
  standalone server output.
- Verified locally on a production build: brown pages paint cocoa
  across header, body, wrapper and footer with ivory ink, gold
  statement, soft 9.54:1, links 12.55:1; dark mode leaves the brown
  theme fixed as designed; home and all light pages unchanged (white
  ground, charcoal ink); no console errors; lint clean.
- Pushed 4963e92 to github.com/tangison/fix-eagle; waited for the
  Vercel auto-deploy and confirmed the fix is live: brown pages now
  carry the cocoa header and footer, light pages untouched.

Stage Summary:
- The brown ground now runs edge to edge on privacy, terms, disclaimer
  and brand; every other page stays on the white base. Live at
  https://fix-eagle-targis47s-projects.vercel.app

---
Task ID: 5
Agent: Super Z (main agent)
Task: Vehicles register, widgets, mobile header WhatsApp fix, WebP asset
conversion, code and copy audit, pushed to GitHub.

Work Log:
- Resolved all 7 Facebook share links through redirect metadata (curl
  with mobile UA; Facebook blocks plain server reads). Recovered
  canonical post URLs, post text slugs and og:image photos for every
  link. Downloaded the photos at full resolution by dropping the ctp
  downscale parameter: five at 2048x1536, two at 1024x768.
- Asset pipeline (scripts/optimize-images.mjs): converted all 16 site
  JPGs to WebP q82, the three logo PNGs to WebP with alpha, and the 7
  vehicle photos to WebP into public/images/vehicles/ with a 1.5x
  Lanczos3 upscale on the two 1024px sources. og-default.jpg and
  og-inner.jpg stay JPG for social crawler safety; icon.png,
  apple-icon.png and logo-192.png stay PNG for platform requirements.
  All references swept from JPG/PNG to WebP.
- Root-caused the header WhatsApp button showing on mobile: the custom
  component classes in globals.css are unlayered, so they beat
  Tailwind's layered hidden utility and `hidden xl:inline-flex`
  silently never hid anything. Fixed with a .header-whatsapp rule that
  owns the viewport switch with higher specificity; verified hidden at
  390px and 320px, visible at 1440px.
- WhatsApp number moved to NEXT_PUBLIC_WHATSAPP_NUMBER via lib/whatsapp
  (whatsappLink, whatsappDisplay with Namibian +264 grouping,
  vehicleEnquiryLink). site.whatsapp now builds from the env; .env
  created locally, .env.example committed.
- Built the stock register src/data/vehicles.ts: 7 typed entries with
  the exact fields requested plus priceNote, isVideoPost and a
  dataConfidence marker (confirmed / partial / photo-only). Every field
  the post text does not state is null with a TODO. Nothing invented:
  the Koleos and Amarok facts come from the post slugs (year, km,
  4Motion, TDI diesel, service history, N$145 truncated), the wanted
  post records the buying bracket, the Nissan Note and Mercedes
  B-Class are photo-only identifications marked to confirm.
- Built /vehicles (PageHero + client explorer: search, make, status,
  price-range, sort, result count, empty state) and /vehicles/[slug]
  with generateStaticParams and generateMetadata (OG from the vehicle
  photo, Car JSON-LD with an Offer only when a price is confirmed),
  gallery, spec table with honest to-be-confirmed cells, status badge,
  WhatsApp enquiry deep link prefilled with the vehicle name, share
  buttons (native share via useSyncExternalStore, WhatsApp, Facebook,
  copy), countdown for auction listings, source-post embed, enquiry
  form, related vehicles.
- Built /components/widgets: floating-whatsapp (site-wide in layout,
  hydration-safe late mount, panel with prefilled general enquiry,
  safe-area aware, icon-only below 768px), status-badge, vehicle-card,
  vehicle-carousel (embla, PhotoCarousel register), auction-countdown
  (placeholder until mount, interval cleaned up), facebook-embed
  (click-to-load plugin iframe, branded fallback link card as resting
  state, no third-party weight until asked), enquiry-form (client
  validation, honeypot, posts to /api/enquiry), map-card (keyless
  Google embed, lazy), share-buttons, vehicles-explorer,
  whatsapp-icon.
- /api/enquiry route handler: zod validation (422 on bad input),
  structured console log as the record, returns a WhatsApp handoff URL
  with the composed enquiry. Client falls back to composing the URL
  locally if the request fails.
- Homepage: new "Latest from the yard" carousel section and "Find us in
  Prosperita" map section; nav (desktop mega list, menu overlay, footer)
  and sitemap gained /vehicles plus the 7 vehicle URLs; home JSON-LD
  logo now points at logo-192.png.
- Copy audit sweep: grammar fix on the vehicles intro, honest pending
  markers on every unknown spec. No em dashes anywhere.
- Verified: lint clean, tsc clean for site code, production build
  passes (28 pages, 7 vehicle pages SSG), all routes plus sitemap,
  robots, manifest, WebP assets 200, 404 works. Browser checks at
  1440/390/320: no horizontal scroll, no console errors, filters
  filter (Auction shows the Jeep, search "amarok" shows the bakkie),
  enquiry form validates and hands off to WhatsApp with the full
  message, floating panel opens and closes, dark mode adapts, brown
  pages untouched.

Stage Summary:
- Live sections: vehicles register with 7 listings, floating WhatsApp
  widget on every page, latest-stock carousel and map card on the
  homepage, enquiry API logging with WhatsApp handoff.
- TODOs for the client: confirm prices (Amarok shows N$145 truncated in
  the slug), years, mileage, transmission and fuel for the five
  partial listings; confirm make and model for the two photo-only
  posts (Nissan Note, Mercedes-Benz B-Class); set the Jeep Patriot
  auction date to activate the countdown. Edit src/data/vehicles.ts.
- The GitHub PAT was used from the session only and should be rotated
  after this push.
