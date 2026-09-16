import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { processSteps, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "The six-step Fix Eagle sales process: advisory, asset identification, catalogue, marketing campaign, project management and client fulfilment.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Process | Fix Eagle Investments Auctioneers",
    description:
      "From first advice to final pay-over: how a Fix Eagle auction runs, step by step.",
    url: "/process",
    images: [{ url: "/images/og-inner.jpg", width: 1200, height: 630 }],
  },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero title="How an auction runs">
        Six stages, from the first conversation to the pay-over and site
        clearance. The same sequence whether the sale is live, online, or by
        private treaty.
      </PageHero>

      <section className="shell" aria-label="Process steps">
        <ol>
          {processSteps.map((step, i) => (
            <li
              key={step.name}
              className="hair-t grid gap-4 py-12 md:grid-cols-[18rem_1fr] md:gap-14 md:py-16"
            >
              <div>
                <span className="label-caps tnum text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)]">
                  {step.name}
                </h2>
              </div>
              <p className="measure self-start text-muted md:pt-10">
                {step.body}
              </p>
            </li>
          ))}
          <li className="hair-t" aria-hidden />
        </ol>
      </section>

      <section className="section" aria-label="Methodology">
        <div className="shell grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">Our footprint</h2>
            <p className="measure mt-7 text-muted">
              Our work is our footprint. We always strive to provide the best
              possible service, adding value to our clients. To us,
              auctioneering is about passion, tenacity and hard work: with all
              our auction sales, our objective is to beat the odds and create a
              unique sales experience for buyers and sellers alike.
            </p>
            <p className="measure mt-5 text-muted">
              If an auction falls outside Windhoek, we train local casuals to
              be part of the auction team, with financial and skills
              compensation. More than fifty casuals have been trained through
              our regional auctions.
            </p>
          </div>
          <PhotoFigure
            src="/images/loose-goods-auction-yard.jpg"
            alt="Loose goods laid out in an auction yard"
            ratio="aspect-[4/3]"
            caption="Loose goods auction, NamPower training centre, October 2025."
          />
        </div>
      </section>

      <section className="section hair-t" aria-label="Records">
        <div className="shell grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="md:order-2">
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">
              Records you can rely on
            </h2>
            <p className="measure mt-7 text-muted">
              Every asset and process is documented through FlexiAuction, the
              auctioneering software commonly used by auction houses. It
              generates the data and records behind every sale: reports of
              sales, clients, records of turnover, and all proceeds and
              payments collected.
            </p>
            <p className="mt-6">
              <a href={site.whatsapp} className="link-type text-[0.95rem]">
                Start a conversation
              </a>
            </p>
          </div>
          <div className="md:order-1">
            <PhotoFigure
              src="/images/flexiauction-software-screenshot.jpg"
              alt="FlexiAuction auctioneering software, the system Fix Eagle uses to document every sale"
              ratio="aspect-[16/9]"
              caption="FlexiAuction, the auctioneering software behind our records."
            />
          </div>
        </div>
      </section>

      <section className="section hair-t" aria-label="Next step">
        <div className="shell">
          <p className="font-serif text-[clamp(1.5rem,2.5vw,2.1rem)]">
            Ready to put assets on the block?
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-7">
            <a href={site.whatsapp} className="btn-outline">
              Request an appraisal
            </a>
            <Link href="/case-studies" className="link-type text-[0.95rem]">
              See the trade references
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
