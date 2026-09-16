import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The Fix Eagle Investments Auctioneers brand: the eagle on the gold disc, the palette sampled from the company profile, and the typefaces of this site.",
  alternates: { canonical: "/brand" },
};

const palette = [
  { name: "Gold", hex: "#CDA666", usage: "Logo disc, accents, rules" },
  { name: "Charcoal", hex: "#393936", usage: "Ink, dark surfaces" },
  { name: "Slate navy", hex: "#44536A", usage: "Secondary text in print" },
  { name: "Burnt orange", hex: "#EC7C30", usage: "Print accent line" },
  { name: "White", hex: "#FFFFFF", usage: "Print base" },
];

export default function BrandPage() {
  return (
    <>
      <PageHero title="The brand">
        The marks, colours and type of Fix Eagle Investments Auctioneers,
        documented so the identity travels intact.
      </PageHero>

      <section className="shell pb-28" aria-label="Brand assets">
        <div className="hair-t grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-14">
          <h2 className="text-[1.35rem] font-medium">The mark</h2>
          <div className="measure space-y-6 text-muted">
            <p>
              The eagle on the gold disc, drawn from the company profile. The
              full-colour mark is used on light and dark surfaces; the eagle
              alone is reserved for tight placements where the disc would crowd.
            </p>
            <div className="flex flex-wrap items-end gap-10 not-italic">
              <figure>
                <Image
                  src="/images/logo-full.png"
                  alt="Full-colour Fix Eagle logo, eagle on gold disc"
                  width={120}
                  height={131}
                  className="h-[8rem] w-auto"
                />
                <figcaption className="caption mt-2">
                  Full lockup, transparent
                </figcaption>
              </figure>
              <figure>
                <Image
                  src="/images/logo-eagle.png"
                  alt="Eagle mark without the gold disc"
                  width={120}
                  height={124}
                  className="h-[8rem] w-auto"
                />
                <figcaption className="caption mt-2">
                  Eagle only, tight placements
                </figcaption>
              </figure>
            </div>
            <p>
              Clear space around the mark is at least half the disc's diameter.
              The mark is never redrawn, rotated, recoloured or placed on busy
              photography without a scrim.
            </p>
          </div>
        </div>

        <div className="hair-t grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-14">
          <h2 className="text-[1.35rem] font-medium">Colour</h2>
          <div className="measure space-y-6 text-muted">
            <p>
              Sampled directly from the cover page of the company profile. On
              this site, gold is the single accent; charcoal carries the ink,
              and the paper is a warm ivory tinted toward the gold.
            </p>
            <ul className="space-y-0">
              {palette.map((swatch) => (
                <li
                  key={swatch.hex}
                  className="hair-b flex flex-wrap items-center gap-x-6 gap-y-2 py-4"
                >
                  <span
                    aria-hidden
                    className="h-9 w-9 flex-none border border-rule"
                    style={{ background: swatch.hex }}
                  />
                  <span className="font-medium text-ink">{swatch.name}</span>
                  <span className="tnum text-[0.9rem]">{swatch.hex}</span>
                  <span className="text-[0.85rem]">{swatch.usage}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hair-t grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-14">
          <h2 className="text-[1.35rem] font-medium">Type</h2>
          <div className="measure space-y-4 text-muted">
            <p>
              Cormorant Garamond sets the headlines, in the classical register
              of the auction catalogue. Switzer, a neutral grotesque, sets the
              body, the labels and the numbers.
            </p>
            <p className="font-serif text-[1.9rem] leading-tight text-ink">
              Cormorant Garamond, display
            </p>
            <p>Switzer, body and interface</p>
          </div>
        </div>

        <div className="hair-t grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-14">
          <h2 className="text-[1.35rem] font-medium">Voice</h2>
          <div className="measure space-y-4 text-muted">
            <p>
              Short sentences. Named places, dates and numbers. The register of
              a sworn appraiser: measured, specific, answerable. The tagline is
              a promise, and every page is expected to keep it.
            </p>
            <p className="font-serif text-[1.7rem] text-ink">
              We add value to your assets.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
