import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { ServicesAccordion } from "@/components/site/services-accordion";
import { services, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Live auctions, sworn asset valuation, private sales, online auctioneering, registered scrap dealing, project management and sales advisory across Namibia.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Fix Eagle Investments Auctioneers",
    description:
      "Live auctions, sworn valuation, private sales and more, across all fourteen regions of Namibia.",
    url: "/services",
    images: [{ url: "/images/og-inner.jpg", width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services">
        Seven services, one discipline: disposing of moveable assets at the
        best possible market price, with every step documented.
      </PageHero>

      <section className="shell pb-4 md:pb-8" aria-label="Service list">
        <ServicesAccordion items={services} />
        <div className="hair-t" aria-hidden />
      </section>

      {/* Marketing of assets, photographic band. */}
      <section aria-label="Marketing of assets" className="pb-4">
        <div className="relative aspect-[16/9]">
          <Image
            src="/images/marketing-delivery-truck.jpg"
            alt="Delivery truck used in an auction marketing campaign"
            fill
            sizes="(min-width: 90rem) 1440px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="shell mt-10 md:mt-14">
          <div className="grid items-end gap-10 md:grid-cols-[1.2fr_1fr] md:gap-20">
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">
              A market place, built over a decade
            </h2>
            <p className="text-soft">
              Our marketing activities are tailored and segmented so the right
              buyers are targeted for every auction: activities that bring
              together buyers and sellers, directing the correct flow of goods
              and services.
            </p>
          </div>
          <p className="mt-8">
            <a href={site.whatsapp} className="link-type text-[0.95rem]">
              Discuss a disposal
            </a>
          </p>
        </div>
      </section>

      <section className="section" aria-label="Next step">
        <div className="shell">
          <div className="rounded-[var(--r-card)] bg-paper-2 px-6 py-14 md:px-14 md:py-16">
            <p className="text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold tracking-[-0.02em]">
              Not sure where to start?
            </p>
            <p className="measure mt-4 text-soft">
              Start with a conversation. We will tell you what the assets are
              worth and how we would sell them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href={site.whatsapp} className="btn">
                Request an appraisal
              </a>
              <Link href="/process" className="link-type text-[0.95rem]">
                See how an auction runs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
