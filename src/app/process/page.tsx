import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { ProcessTabs } from "@/components/site/process-tabs";
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
        <ProcessTabs steps={processSteps} />
      </section>

      <section className="section" aria-label="Methodology">
        <div className="shell grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">Our footprint</h2>
            <p className="measure mt-7 text-soft">
              With all our auction sales, our objective is to beat the odds and
              create a unique sales experience for buyers and sellers alike.
              Outside Windhoek, we train and remunerate local casuals to be
              part of the auction team: more than fifty trained through our
              regional auctions so far.
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
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">
              Records you can rely on
            </h2>
            <p className="measure mt-7 text-soft">
              Every asset and process is documented through FlexiAuction, the
              auctioneering software used by auction houses. It generates the
              data behind every sale: reports of sales, clients, turnover,
              proceeds and payments collected.
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
          <div className="rounded-[var(--r-card)] bg-paper-2 px-6 py-14 md:px-14 md:py-16">
            <p className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold tracking-[-0.02em]">
              Ready to put assets on the block?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href={site.whatsapp} className="btn">
                Request an appraisal
              </a>
              <Link href="/case-studies" className="link-type text-[0.95rem]">
                See the trade references
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
