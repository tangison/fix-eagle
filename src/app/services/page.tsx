import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { PhotoFigure } from "@/components/site/photo-figure";
import { saleChannels, services, site } from "@/lib/site";

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
        <dl>
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className="hair-t grid gap-4 scroll-mt-28 py-12 md:grid-cols-[18rem_1fr] md:gap-14 md:py-16"
            >
              <dt>
                <span className="label-caps tnum text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.5rem)]">
                  {service.name}
                </h2>
              </dt>
              <dd className="measure self-start text-muted md:pt-10">
                <p>{service.detail}</p>
                <p className="mt-4 text-[0.95rem]">{service.summary}</p>
              </dd>
            </div>
          ))}
          <div className="hair-t" aria-hidden />
        </dl>
      </section>

      <section className="section" aria-label="Choosing a channel">
        <div className="shell grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">
              Choosing a channel
            </h2>
            <p className="measure mt-7 text-muted">
              Every disposal starts with advice. We assess the assets, then
              recommend the channel that will draw the right buyers, whether
              that is a live auction, an online sale, or a negotiated private
              treaty.
            </p>
          </div>
          <dl>
            {saleChannels.map((channel) => (
              <div key={channel.name} className="hair-b py-6">
                <dt className="font-serif text-[1.35rem] font-medium">
                  {channel.name}
                </dt>
                <dd className="measure mt-2 text-[0.95rem] text-muted">
                  {channel.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Marketing of assets" className="pb-4">
        <PhotoFigure
          src="/images/marketing-delivery-truck.jpg"
          alt="Delivery truck used in an auction marketing campaign"
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/9]"
        />
        <div className="shell mt-10 md:mt-14">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">
            Marketing of assets
          </h2>
          <p className="measure mt-7 text-muted">
            Fix Eagle has, over the years, created a market place: activities
            that bring together buyers and sellers, directing the correct flow
            of goods and services. Our marketing activities are tailored and
            segmented so the right buyers are targeted for every auction.
          </p>
          <p className="mt-6">
            <a href={site.whatsapp} className="link-type text-[0.95rem]">
              Discuss a disposal
            </a>
          </p>
        </div>
      </section>

      <section className="section" aria-label="Next step">
        <div className="shell">
          <p className="font-serif text-[clamp(1.5rem,2.5vw,2.1rem)]">
            Not sure where to start?
          </p>
          <p className="measure mt-4 text-muted">
            Start with a conversation. We will tell you what the assets are
            worth and how we would sell them.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-7">
            <a href={site.whatsapp} className="btn-outline">
              Request an appraisal
            </a>
            <Link href="/process" className="link-type text-[0.95rem]">
              See how an auction runs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
