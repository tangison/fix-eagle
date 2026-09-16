import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PhotoCarousel } from "@/components/site/photo-carousel";
import { ChannelTabs } from "@/components/site/channel-tabs";
import {
  featuredWork,
  processSteps,
  services,
  site,
  stats,
} from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "AuctionHouse",
  name: site.tradingName,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/images/logo-full.png`,
  image: `${site.url}/images/og-default.jpg`,
  description: site.description,
  foundingDate: "2013",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rem Erf 46, Platinum Street, Prosperita",
    addressLocality: "Windhoek",
    addressCountry: "NA",
  },
  telephone: site.phoneDisplay,
  email: site.email,
  areaServed: "Namibia",
  founder: {
    "@type": "Person",
    name: site.principal.name,
    jobTitle: site.principal.role,
  },
};

const channels = [
  {
    name: "Live auctions",
    body: "Onsite auctions, planned, coordinated and executed for maximum sales and full attendance of prospective bidders.",
    photo: "/images/live-auction-crowd.jpg",
    alt: "Bidders gathered under a shed at a live auction",
    caption: "Live auction, NamPower. Onsite bidding.",
  },
  {
    name: "Online auctions",
    body: "A web-based online auction sale, used to dispose of specialised equipment that requires a wider range of prospective clientele.",
    photo: "/images/sale-3d-render.jpg",
    alt: "Gold sale graphic representing online auction sales",
    caption: "Web-based sales for specialised assets.",
  },
  {
    name: "Private treaty",
    body: "The preferred sales method for specialised assets. We negotiate with a selected group of buyers on your behalf, to a predetermined end date.",
    photo: "/images/gavel-stock.jpg",
    alt: "Auction gavel resting on a block",
    caption: "Negotiated sales to selected buyers.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Hero: the eagle portrait carries the fold. */}
      <section className="relative" aria-label="Introduction">
        <div id="hero-sentinel" aria-hidden="true" className="absolute top-0 h-px w-full" />
        <div className="relative flex min-h-[94dvh] items-end">
          <Image
            src="/images/hero-eagle-cover.jpg"
            alt="Eagle portrait, the Fix Eagle mark"
            fill
            priority
            fetchPriority="high"
            quality={82}
            sizes="(min-width: 90rem) 1440px, 100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,oklch(18%_0.012_80/0.88)_0%,oklch(18%_0.012_80/0.55)_42%,oklch(18%_0.012_80/0.15)_100%)] max-md:bg-[linear-gradient(to_top,oklch(18%_0.012_80/0.92)_0%,oklch(18%_0.012_80/0.4)_55%,oklch(18%_0.012_80/0.25)_100%)]"
          />
          <div className="shell relative pb-20 pt-40 md:pb-28">
            <p
              className="reveal label-caps photo-text opacity-80"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              Windhoek, Namibia · Since 2013
            </p>
            <h1
              className="reveal mt-5 max-w-[11ch] text-[clamp(2.9rem,6.5vw_+_0.5rem,5.5rem)] font-extrabold leading-[1.08] tracking-[-0.035em] photo-text"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              We add value to your assets.
            </h1>
            <p
              className="reveal measure mt-7 max-w-[40ch] text-[1.12rem] leading-relaxed photo-text opacity-90"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              Live auctions, sworn valuation and private sales across all
              fourteen regions of Namibia.
            </p>
            <div
              className="reveal mt-10 flex flex-wrap items-center gap-6"
              style={{ "--i": 3 } as React.CSSProperties}
            >
              <a href={site.whatsapp} className="btn on-dark">
                Request an appraisal
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </a>
              <Link
                href="/services"
                className="btn-outline on-photo !px-5 !py-2.5 text-[0.85rem]"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The record, in numbers taken from the profile. */}
      <section className="hair-t hair-b" aria-label="The record">
        <dl className="shell tnum grid grid-cols-2 gap-x-8 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-[2.5rem] font-bold leading-none tracking-[-0.02em]">
                {stat.value}
              </dd>
              <dd className="caption mt-2">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Services: the catalogue register as tiles. */}
      <section className="section" aria-label="Services">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">What we do</h2>
            <Link href="/services" className="link-type text-[0.95rem]">
              All services
              <ArrowRight
                className="ml-1 inline h-4 w-4"
                strokeWidth={1.75}
                aria-hidden
              />
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, i) => (
              <li key={service.id}>
                <Link href={`/services#${service.id}`} className="service-tile">
                  <span className="tile-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="tile-name">{service.name}</span>
                  <span className="tile-desc line-clamp-3">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <a href={site.whatsapp} className="service-tile group">
                <span className="tile-num">08</span>
                <span className="tile-name">Something else?</span>
                <span className="tile-desc">
                  If it is a moveable asset, talk to us about disposing of it.
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.85rem] font-semibold text-accent-deep">
                  Start a conversation
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Three ways to sell, as tabs. */}
      <section className="section hair-t" aria-label="Ways to sell">
        <div className="shell">
          <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">Three ways to sell</h2>
          <div className="mt-10">
            <ChannelTabs channels={channels} />
          </div>
        </div>
      </section>

      {/* Selected work, as a carousel. */}
      <section className="section hair-t" aria-label="Selected work">
        <div className="shell-wide">
          <div className="shell-wide flex flex-wrap items-end justify-between gap-6 px-[var(--gutter)]">
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">Selected work</h2>
            <Link href="/case-studies" className="link-type text-[0.95rem]">
              All trade references
            </Link>
          </div>
          <div className="shell-wide mt-10 px-[var(--gutter)]">
            <PhotoCarousel items={featuredWork} />
          </div>
        </div>
      </section>

      {/* The six-step process, compact register. */}
      <section className="section hair-t" aria-label="Sales process">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">
              How an auction runs
            </h2>
            <Link href="/process" className="link-type text-[0.95rem]">
              The process in full
            </Link>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, i) => (
              <li
                key={step.name}
                className="rounded-[var(--r-card)] border border-rule-2 bg-paper-2 p-6"
              >
                <span className="label-caps tnum text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[1.2rem]">{step.name}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-soft line-clamp-3">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we are, in brief. */}
      <section className="section hair-t" aria-label="About">
        <div className="shell grid items-center gap-12 md:grid-cols-[1fr_1.15fr] md:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--r-card)]">
            <Image
              src="/images/graduation-ceremony.jpg"
              alt="Niklaas Kisilipile at his graduation ceremony"
              fill
              sizes="(min-width: 48rem) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">Who we are</h2>
            <p className="measure mt-6 text-soft">
              An exclusively Namibian owned auction house, run by{" "}
              {site.principal.name}: former corporate banker, qualified
              auctioneer, sworn appraiser admitted to the Magistrate Court of
              Namibia.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {[
                "Est. 2013",
                "BIPA registered",
                "Sworn appraiser",
                "Scrap certified",
              ].map((chip) => (
                <li
                  key={chip}
                  className="rounded-[var(--r-pill)] border border-rule bg-paper-2 px-4 py-1.5 text-[0.82rem] font-medium text-ink-2"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href="/about" className="link-type text-[0.95rem]">
                About Fix Eagle
                <ArrowUpRight
                  className="ml-1 inline h-4 w-4"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Closing band: the brand statement over charcoal. */}
      <section className="section" aria-label="Closing">
        <div className="shell">
          <div className="rounded-[var(--r-card)] bg-ink px-6 py-16 text-center text-paper md:px-16 md:py-20">
            <p className="mx-auto max-w-[18ch] text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.022em]">
              With us you can go so much further.
            </p>
            <p className="mx-auto mt-4 max-w-[44ch] text-[1rem] leading-relaxed opacity-75">
              Tell us what you need to sell. We will tell you what it is worth
              and how we would sell it.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
              <a href={site.whatsapp} className="btn on-dark">
                WhatsApp {site.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="link-type on-photo text-[0.95rem] font-medium"
              >
                Or use the contact form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
