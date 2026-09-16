import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { PhotoCarousel } from "@/components/site/photo-carousel";
import { ReferenceTable } from "@/components/site/reference-table";
import { featuredWork, references } from "@/lib/site";

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

      <section className="shell-wide px-[var(--gutter)] pb-4" aria-label="Selected commissions">
        <PhotoCarousel items={featuredWork} />
      </section>

      <section className="section" aria-label="Trade references">
        <div className="shell">
          <ReferenceTable references={references} />
        </div>
      </section>
    </>
  );
}
