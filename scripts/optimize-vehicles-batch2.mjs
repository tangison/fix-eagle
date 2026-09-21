/**
 * Fix Eagle vehicles asset pipeline · batch 2 (September 2026 scrape).
 * Sources: /tmp/fb/dl (full-resolution Facebook photos, harvested with
 * Scrapling + browser at up to 2048x1536).
 *
 * Rules (same as optimize-images.mjs):
 * - upscale anything under 1536px wide by 1.5x (Lanczos3) so gallery
 *   views stay sharp
 * - emit WebP q82 into public/images/vehicles/
 * - generate a branded "photo pending" placeholder for listings whose
 *   source post carries no photo
 */
import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const SRC = "/tmp/fb/dl";
const OUT = "/home/z/my-project/public/images/vehicles";
mkdirSync(OUT, { recursive: true });

// [source file, output name]
const jobs = [
  // Renault Koleos · primary already exists (renault-koleos-2013.webp)
  ["koleos_809766927_28381698651450404.jpg", "renault-koleos-2013-2.webp"],
  ["koleos_810118426_28381697718117164.jpg", "renault-koleos-2013-3.webp"],
  ["koleos_809287711_28381698161450453.jpg", "renault-koleos-2013-4.webp"],
  ["koleos_810350860_28381699214783681.jpg", "renault-koleos-2013-5.webp"],
  ["wanted_809146666_28378539711766298.jpg", "renault-koleos-2013-6.webp"],
  ["wanted_809655985_28378540365099566.jpg", "renault-koleos-2013-7.webp"],
  // VW Amarok · primary exists (vw-amarok-2014.webp)
  ["amarok_809167997_28380568024896800.jpg", "vw-amarok-2014-2.webp"],
  ["amarok_809235375_28380569038230032.jpg", "vw-amarok-2014-3.webp"],
  ["amarok_809386655_28380569571563312.jpg", "vw-amarok-2014-4.webp"],
  ["amarok_810118434_28380568554896747.jpg", "vw-amarok-2014-5.webp"],
  // Nissan Note · primary exists (nissan-note.webp)
  ["nissan_784664909_28143640255256246.jpg", "nissan-note-2.webp"],
  ["nissan_786493005_28143640558589549.jpg", "nissan-note-3.webp"],
  ["nissan_785759532_28143639341923004.jpg", "nissan-note-4.webp"],
  ["nissan_782169210_28143639938589611.jpg", "nissan-note-5.webp"],
  ["nissan-sep_813020865_28421051337515135.jpg", "nissan-note-6.webp"],
  // Jeep Patriot · primary exists (jeep-patriot.webp)
  ["jeep_802356994_28323322787287991.jpg", "jeep-patriot-2.webp"],
  ["jeep_802459188_28323323837287886.jpg", "jeep-patriot-3.webp"],
  ["jeep_802308493_28323323223954614.jpg", "jeep-patriot-4.webp"],
  // Toyota Ipsum · new listing
  ["jeep_801149723_28323324293954507.jpg", "toyota-ipsum-2006.webp"],
  ["jeep_802002941_28323324830621120.jpg", "toyota-ipsum-2006-2.webp"],
  // Ford Ranger · primary exists (ford-ranger-king-cab.webp)
  ["ranger_790366515_28193850650235206.jpg", "ford-ranger-king-cab-2.webp"],
  ["ranger_790683934_28193852723568332.jpg", "ford-ranger-king-cab-3.webp"],
  ["ranger_791179096_28193853336901604.jpg", "ford-ranger-king-cab-4.webp"],
  ["ranger_790791874_28193852083568396.jpg", "ford-ranger-king-cab-5.webp"],
  ["ranger_791660056_28193851286901809.jpg", "ford-ranger-king-cab-6.webp"],
  // Mercedes-Benz B180 · primary exists (mercedes-b-class.webp)
  ["mercedes_777298579_28017667734520166.jpg", "mercedes-b-class-2.webp"],
  ["mercedes_775260284_28017668017853471.jpg", "mercedes-b-class-3.webp"],
  ["mercedes_775547146_28017667271186879.jpg", "mercedes-b-class-4.webp"],
  ["mercedes_775904919_28017667521186854.jpg", "mercedes-b-class-5.webp"],
  // Chevrolet Aveo · new listing (photos sat inside the wanted post)
  ["wanted_809094883_28378538408433095.jpg", "chevrolet-aveo-2015.webp"],
  ["wanted_809235400_28378539308433005.jpg", "chevrolet-aveo-2015-2.webp"],
  ["wanted_809373965_28378538845099718.jpg", "chevrolet-aveo-2015-3.webp"],
];

const out = [];
for (const [src, name] of jobs) {
  const s = join(SRC, src);
  const o = join(OUT, name);
  const meta = await sharp(s).metadata();
  let p = sharp(s);
  if (meta.width < 1536) {
    p = p.resize({ width: Math.round(meta.width * 1.5), kernel: "lanczos3" });
  }
  await p.webp({ quality: 82 }).toFile(o);
  out.push(`${name}: ${meta.width}x${meta.height} -> ${statSync(o).size} bytes`);
}
console.log(out.join("\n"));

// Branded placeholder for listings whose post has no photo.
const ph = join(OUT, "stock-photo-pending.webp");
const W = 1600;
const H = 1200;
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#393936"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#CDA666" stroke-width="2"/>
  <text x="${W / 2}" y="${H / 2 - 40}" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#CDA666" text-anchor="middle" letter-spacing="6">FIX EAGLE</text>
  <text x="${W / 2}" y="${H / 2 + 60}" font-family="Helvetica, Arial, sans-serif" font-size="34" fill="#F5F1E8" text-anchor="middle" letter-spacing="2">PHOTO TO FOLLOW</text>
  <text x="${W / 2}" y="${H / 2 + 130}" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#B9B4A6" text-anchor="middle">Enquire on WhatsApp for the latest photos of this vehicle</text>
</svg>`);
await sharp(svg).webp({ quality: 82 }).toFile(ph);
console.log(`stock-photo-pending.webp: ${statSync(ph).size} bytes`);
