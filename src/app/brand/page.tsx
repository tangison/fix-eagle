import type { Metadata } from "next";
import Image from "next/image";
import { BrownPage } from "@/components/site/brown-page";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The Fix Eagle Investments Auctioneers brand: the eagle on the gold disc, the palette sampled from the company profile, and the typeface of this site.",
  alternates: { canonical: "/brand" },
};

const palette = [
  { name: "Gold", hex: "#CDA666", usage: "Logo disc, accents, headings on brown" },
  { name: "Charcoal", hex: "#393936", usage: "Ink, dark surfaces" },
  { name: "Slate navy", hex: "#44536A", usage: "Headings" },
  { name: "Burnt orange", hex: "#EC7C30", usage: "Accent line, used sparingly" },
  { name: "White", hex: "#FFFFFF", usage: "Base background" },
];

export default function BrandPage() {
  return (
    <BrownPage>
      <>
        <PageHero title="The brand">
          The marks, colours and type of Fix Eagle Investments Auctioneers,
          documented so the identity travels intact.
        </PageHero>

        <section className="shell pb-28" aria-label="Brand assets">
          <div className="hair-t grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-14">
            <h2 className="text-[1.35rem] font-semibold">The mark</h2>
            <div className="measure space-y-6 text-soft">
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
            <h2 className="text-[1.35rem] font-semibold">Colour</h2>
            <div className="measure space-y-6 text-soft">
              <p>
                Sampled directly from the cover page of the company profile.
                On this site, gold is the single accent, charcoal carries the
                ink, slate-navy sets the headings, and the paper is the brand
                white. Text-heavy pages run on the brown ground you are
                reading now.
              </p>
              <ul className="space-y-0">
                {palette.map((swatch) => (
                  <li
                    key={swatch.hex}
                    className="hair-b flex flex-wrap items-center gap-x-6 gap-y-2 py-4"
                  >
                    <span
                      aria-hidden
                      className="h-9 w-9 flex-none rounded-[8px] border border-rule"
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
            <h2 className="text-[1.35rem] font-semibold">Type</h2>
            <div className="measure space-y-4 text-soft">
              <p>
                One family carries the whole site: Inter, the grotesque in the
                Target register. Body text runs at 400, emphasis at 500 and
                600, headlines at 700 with tight tracking. The weights do the
                work; no second typeface is needed.
              </p>
              <p className="text-[1.9rem] font-bold leading-tight tracking-[-0.022em] text-ink">
                Inter, headline weight
              </p>
              <p>Inter, body and interface</p>
            </div>
          </div>

          <div className="hair-t grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-14">
            <h2 className="text-[1.35rem] font-semibold">Voice</h2>
            <div className="measure space-y-4 text-soft">
              <p>
                Short sentences. Named places, dates and numbers. The register of
                a sworn appraiser: measured, specific, answerable. The tagline is
                a promise, and every page is expected to keep it.
              </p>
              <p className="text-[1.7rem] font-bold tracking-[-0.022em] text-ink">
                We add value to your assets.
              </p>
            </div>
          </div>
        </section>
      </>
    </BrownPage>
  );
}
