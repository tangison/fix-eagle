import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fix Eagle Investments Auctioneers, an exclusively Namibian owned auction house established in Windhoek in 2013, managed by Niklaas Kisilipile.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Fix Eagle Investments Auctioneers",
    description:
      "An exclusively Namibian owned auction house, est. 2013, Windhoek.",
    url: "/about",
    images: [{ url: "/images/og-inner.jpg", width: 1200, height: 630 }],
  },
};

const pillars = [
  {
    name: "Extensive industry experience",
    body: "Corporate governance, seventeen years of banking, sales and customer service.",
  },
  {
    name: "Diversified sales portfolio",
    body: "Household and office furniture, vehicles, salvage accident vehicles, earthmoving and industrial specialised equipment, and the appraisal of moveable assets.",
  },
  {
    name: "Sales achievements",
    body: "Over one hundred auction sales completed since 2013, every one of them concluded. A 97 percent sales achievement.",
  },
  {
    name: "Supporting local empowerment",
    body: "More than fifty casuals trained through our regional auctions, with financial and skills compensation.",
  },
  {
    name: "Adaptation to industry standards",
    body: "Commitment, competence and experience as our flagship. We will never stop learning how to grow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="An exclusively Namibian auction house">
        Established, registered and founded in Windhoek in 2013, trading as
        Fix Eagle Investments Auctioneers: more than a decade of auctioneering,
        sales, appraisal and valuation.
      </PageHero>

      <section className="shell" aria-label="The record">
        <dl className="tnum hair-t grid grid-cols-2 gap-x-8 gap-y-10 py-14 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[2.3rem] font-bold leading-none tracking-[-0.02em]">
                {stat.value}
              </dd>
              <dd className="caption mt-2">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section hair-t" aria-label="The principal">
        <div className="shell grid items-start gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div>
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">
              {site.principal.name}
            </h2>
            <p className="label-caps mt-3 text-soft">{site.principal.role}</p>
            <p className="measure mt-7 text-soft">{site.principal.bio}</p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {[
                "BIPA registered",
                "Qualified auctioneer, 2017",
                "Sworn appraiser, 2018",
                "Scrap certified, 2018",
              ].map((chip) => (
                <li
                  key={chip}
                  className="rounded-[var(--r-pill)] border border-rule bg-paper-2 px-4 py-1.5 text-[0.82rem] font-medium text-ink-2"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-10">
            <PhotoFigure
              src="/images/graduation-ceremony.jpg"
              alt="Niklaas Kisilipile at his graduation ceremony in Kempton Park"
              ratio="aspect-[16/10]"
              caption="Graduation ceremony, Kempton Park, South Africa. December 2017."
            />
            <PhotoFigure
              src="/images/diploma-certificate.jpg"
              alt="Diploma certificate from the South African College of Auctioneering"
              ratio="aspect-[16/10]"
              caption="Diploma, South African College of Auctioneering."
            />
          </div>
        </div>
      </section>

      <section className="section hair-t" aria-label="What we stand on">
        <div className="shell">
          <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">What we stand on</h2>
          <dl className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.name}
                className="rounded-[var(--r-card)] border border-rule-2 bg-paper-2 p-6"
              >
                <dt className="text-[1.15rem] font-semibold tracking-[-0.01em] text-ink-2">
                  {pillar.name}
                </dt>
                <dd className="mt-2.5 text-[0.9rem] leading-relaxed text-soft">
                  {pillar.body}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-12">
            <Link href="/case-studies" className="link-type text-[0.95rem]">
              See what that earns: the trade references
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
