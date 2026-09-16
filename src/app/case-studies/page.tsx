import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { references } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Trade references for Fix Eagle Investments Auctioneers: NamWater, NamPower, RCC, the French Embassy, Hollard, Whale Cheetah Cement, NWR, DBN, law firms and private clients.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies | Fix Eagle Investments Auctioneers",
    description:
      "Contracts, scopes and performance across Namibia's institutions, from 2016 to today.",
    url: "/case-studies",
    images: [{ url: "/images/og-inner.jpg", width: 1200, height: 630 }],
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero title="Case studies">
        Every contract below was executed and reported on. The scopes, periods
        and outcomes are drawn from the company profile; referees are available
        on request.
      </PageHero>

      <section className="shell" aria-label="Selected commissions">
        <div className="grid gap-14 md:grid-cols-2 md:gap-10">
          <PhotoFigure
            src="/images/case-study-front-loader.jpg"
            alt="Earthmoving front loader offered at auction"
            ratio="aspect-[4/3]"
            caption="Earthmoving equipment disposal, NamWater and RCC contracts."
          />
          <PhotoFigure
            src="/images/case-study-toyota-hilux.jpg"
            alt="Toyota Hilux from a vehicle fleet disposal"
            ratio="aspect-[4/3]"
            caption="Vehicle fleet disposal, over 500 vehicles appraised and auctioned."
          />
          <PhotoFigure
            src="/images/case-study-nampower-truck.jpg"
            alt="Flatbed truck offered at a NamPower auction"
            ratio="aspect-[4/3]"
            caption="Flatbed truck, NamPower auction."
          />
          <PhotoFigure
            src="/images/case-study-filing-cabinets.jpg"
            alt="Filing cabinets and office furniture at a NamWater disposal"
            ratio="aspect-[4/3]"
            caption="Office furniture disposal, NamWater."
          />
        </div>
      </section>

      <section className="section" aria-label="Trade references">
        <div className="shell">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">Trade references</h2>

          {/* Desktop: the auction register. Mobile: stacked entries. */}
          <div className="mt-12 md:block">
            <table className="ref-table tnum hidden md:table">
              <thead>
                <tr>
                  <th scope="col">Entity</th>
                  <th scope="col">Scope</th>
                  <th scope="col">Period</th>
                  <th scope="col">Performance</th>
                </tr>
              </thead>
              <tbody>
                {references.map((ref) => (
                  <tr key={ref.entity}>
                    <td>
                      {ref.entity}
                      {ref.referee ? (
                        <span className="caption mt-1 block">
                          {ref.referee}
                        </span>
                      ) : null}
                    </td>
                    <td>{ref.scope}</td>
                    <td>{ref.period}</td>
                    <td>{ref.performance}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="md:hidden">
              {references.map((ref) => (
                <div key={ref.entity} className="hair-b py-7">
                  <dt className="font-serif text-[1.45rem] font-medium">
                    {ref.entity}
                  </dt>
                  <dd className="mt-3 space-y-2 text-[0.92rem] text-muted">
                    <p>{ref.scope}</p>
                    <p className="tnum">{ref.period}</p>
                    <p>{ref.performance}</p>
                    {ref.referee ? (
                      <p className="caption">{ref.referee}</p>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
