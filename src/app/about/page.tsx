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
    body: "Over one hundred auction sales completed since 2013, every one of them concluded. A 97 percent sales achievement, exceeding the targets of most clients.",
  },
  {
    name: "Supporting local empowerment",
    body: "Our business mirrors the transfer of skills. More than fifty casuals have been trained through our regional auctions, with financial and skills compensation.",
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
        Fix Eagle Investments CC, trading as Fix Eagle Investments
        Auctioneers, was established, registered and founded in Windhoek in
        2013. Exclusively Namibian owned, the business has spent more than a
        decade perfecting its services: auctioneering, sales, appraisal and
        valuation.
      </PageHero>

      <section className="shell" aria-label="The record">
        <dl className="tnum hair-t grid grid-cols-2 gap-x-8 gap-y-10 py-14 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-serif text-[2.2rem] font-medium leading-none">
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
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">
              {site.principal.name}
            </h2>
            <p className="label-caps mt-3 text-muted">
              {site.principal.role}
            </p>
            <p className="measure mt-7 text-muted">{site.principal.bio}</p>
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

      <section className="section hair-t" aria-label="Professional set-up">
        <div className="shell grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-20">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">
            Professional set-up
          </h2>
          <ul>
            {[
              "Registered company with the Ministry of Industrialisation and SME Development, BIPA",
              "Qualified auctioneer, registered with the South African College of Auctioneering, 2017",
              "Sworn appraiser, admitted to the Magistrate Court of Namibia to appraise all categories of moveable assets, 2018",
              "Certified by the office of the Inspector General, Ministry of Safety and Security, to sell second-hand goods, 2018",
            ].map((item) => (
              <li key={item} className="hair-b py-6 text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section hair-t" aria-label="Value proposition">
        <div className="shell">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">
            What we stand on
          </h2>
          <dl className="mt-12 grid gap-x-16 md:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.name} className="hair-b py-8">
                <dt className="font-serif text-[1.5rem] font-medium">
                  {pillar.name}
                </dt>
                <dd className="measure mt-3 text-[0.95rem] text-muted">
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
