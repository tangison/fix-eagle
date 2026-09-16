import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PhotoFigure } from "@/components/site/photo-figure";
import { processSteps, references, saleChannels, services, site, stats } from "@/lib/site";

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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* Hero: the eagle portrait carries the fold. Text sits low and left. */}
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
            className="absolute inset-0 bg-[linear-gradient(to_right,oklch(21%_0.012_80/0.88)_0%,oklch(21%_0.012_80/0.55)_42%,oklch(21%_0.012_80/0.15)_100%)] max-md:bg-[linear-gradient(to_top,oklch(21%_0.012_80/0.92)_0%,oklch(21%_0.012_80/0.4)_55%,oklch(21%_0.012_80/0.25)_100%)]"
          />
          <div className="shell relative pb-20 pt-40 md:pb-28">
            <h1
              className="reveal max-w-[11ch] text-[clamp(2.9rem,6.5vw_+_0.5rem,5.5rem)] font-medium leading-[1.04] text-[var(--photo-ink)]"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              We add value to your assets.
            </h1>
            <p
              className="reveal measure mt-6 max-w-[38ch] text-[1.1rem] leading-relaxed text-[var(--photo-ink)] opacity-90"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              Live auctions, sworn valuation and private sales across all
              fourteen regions of Namibia. Windhoek, since 2013.
            </p>
            <div
              className="reveal mt-10 flex flex-wrap items-center gap-7"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <a href={site.whatsapp} className="btn-outline on-photo">
                Request an appraisal
              </a>
              <Link
                href="/services"
                className="link-type on-photo text-[0.95rem] font-medium opacity-75"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro statement and the record, in numbers taken from the profile. */}
      <section className="section" aria-label="Who we are">
        <div className="shell grid gap-14 md:grid-cols-[1.35fr_1fr] md:gap-20">
          <div>
            <h2 className="max-w-[16ch] text-[clamp(1.9rem,3.5vw,3rem)]">
              Auctioneers to Namibia&rsquo;s institutions.
            </h2>
            <p className="measure mt-7 text-muted">
              Fix Eagle Investments Auctioneers is an exclusively Namibian owned
              auction house, established in Windhoek in 2013. We plan,
              coordinate and execute live auctions, provide court-appointed
              sworn valuation, and manage private sales for government,
              corporate and private clients.
            </p>
            <p className="measure mt-5 text-muted">
              The business is managed by {site.principal.name}, a former
              corporate banker of seventeen years, a qualified auctioneer and a
              sworn appraiser admitted to the Magistrate Court of Namibia.
            </p>
          </div>
          <dl className="tnum grid grid-cols-2 gap-x-8 gap-y-10 self-end pb-2 sm:grid-cols-3 md:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-[2.4rem] font-medium leading-none">
                  {stat.value}
                </dd>
                <dd className="caption mt-2">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services index, the auction catalogue register. */}
      <section className="section hair-t" aria-label="Services">
        <div className="shell">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">What we do</h2>
          <ul className="mt-14 grid gap-x-16 md:grid-cols-2">
            {services.map((service) => (
              <li key={service.id} className="hair-b">
                <Link
                  href={`/services#${service.id}`}
                  className="group flex items-baseline justify-between gap-6 py-7"
                >
                  <span>
                    <span className="font-serif text-[1.65rem] font-medium leading-tight transition-colors duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-accent-deep">
                      {service.name}
                    </span>
                    <span className="mt-2 block max-w-[42ch] text-[0.95rem] text-muted">
                      {service.summary}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-5 w-5 flex-none translate-x-0 opacity-0 transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:opacity-100 max-md:hidden"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Photographic fold: the live auction. The photograph is the section. */}
      <section aria-label="Live auction" className="relative">
        <PhotoFigure
          src="/images/live-auction-crowd.jpg"
          alt="Bidders gathered under a shed at a live auction"
          sizes="(min-width: 90rem) 1440px, 100vw"
          ratio="aspect-[16/10] max-md:aspect-[4/3]"
          className="w-full"
        />
        <p className="shell-wide caption mt-3">
          Live auction, NamPower. Onsite bidding, planned and coordinated for
          full attendance.
        </p>
      </section>

      {/* Three ways to sell. */}
      <section className="section" aria-label="Ways to sell">
        <div className="shell">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">Three ways to sell</h2>
          <dl className="mt-12">
            {saleChannels.map((channel) => (
              <div
                key={channel.name}
                className="hair-b grid gap-3 py-8 md:grid-cols-[15rem_1fr] md:gap-12"
              >
                <dt className="font-serif text-[1.55rem] font-medium">
                  {channel.name}
                </dt>
                <dd className="measure text-muted">{channel.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Selected work: two commissions, alternating. */}
      <section className="section hair-t" aria-label="Selected work">
        <div className="shell">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">Selected work</h2>

          <div className="mt-14 grid items-center gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
            <PhotoFigure
              src="/images/case-study-filing-cabinets.jpg"
              alt="Office furniture and filing cabinets lined up for disposal at a NamWater auction"
              ratio="aspect-[4/3]"
              caption="Office furniture disposal, NamWater."
            />
            <div>
              <p className="caption tnum">2018 to 2021, 2022 to 2025</p>
              <h3 className="mt-3 text-[clamp(1.7rem,2.8vw,2.4rem)]">
                Namibia Water Corporation
              </h3>
              <p className="measure mt-5 text-muted">
                Six live auctions under two consecutive three-year contracts.
                All moveable assets: over 500 vehicles, earthmoving and
                specialised equipment, scrap metal, household and office
                furniture. Complete sell-out, sales targets exceeded on every
                auction.
              </p>
            </div>
          </div>

          <div className="mt-16 grid items-center gap-10 md:mt-24 md:grid-cols-2 md:gap-16">
            <div className="md:order-2">
              <PhotoFigure
                src="/images/namibia-power-loco.jpg"
                alt="Yellow rail locomotive offered at a NamPower auction"
                ratio="aspect-[4/3]"
                caption="Rail locomotive, NamPower auction, September 2025."
              />
            </div>
            <div className="md:order-1">
              <p className="caption tnum">2019 to 2025</p>
              <h3 className="mt-3 text-[clamp(1.7rem,2.8vw,2.4rem)]">
                Namibia Power Corporation
              </h3>
              <p className="measure mt-5 text-muted">
                More than twenty public live auctions conducted countrywide,
                each sold out. Vehicle fleet, earthmoving equipment, loose
                goods, building material and scrap steel, under contract from
                2021 with an extension to August 2025.
              </p>
            </div>
          </div>

          <p className="mt-16">
            <Link href="/case-studies" className="link-type text-[0.95rem]">
              All trade references
            </Link>
          </p>
        </div>
      </section>

      {/* The six-step process, lot-number register. */}
      <section className="section hair-t" aria-label="Sales process">
        <div className="shell">
          <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">
            How an auction runs
          </h2>
          <ol className="mt-14 grid gap-x-16 md:grid-cols-2">
            {processSteps.map((step, i) => (
              <li key={step.name} className="hair-b flex gap-6 py-7">
                <span className="label-caps tnum pt-2 text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <h3 className="text-[1.45rem] font-medium">{step.name}</h3>
                  <p className="mt-2 max-w-[44ch] text-[0.95rem] text-muted">
                    {step.body}
                  </p>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10">
            <Link href="/process" className="link-type text-[0.95rem]">
              The process in full
            </Link>
          </p>
        </div>
      </section>

      {/* Who we are, with the principal at his graduation. */}
      <section className="section hair-t" aria-label="About">
        <div className="shell grid items-center gap-12 md:grid-cols-[1fr_1.15fr] md:gap-20">
          <PhotoFigure
            src="/images/graduation-ceremony.jpg"
            alt="Niklaas Kisilipile at his graduation ceremony"
            ratio="aspect-[4/3]"
            caption="Graduation ceremony, SA College of Auctioneering, Kempton Park, December 2017."
          />
          <div>
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)]">Who we are</h2>
            <p className="measure mt-7 text-muted">{site.principal.bio}</p>
            <ul className="mt-8">
              {[
                "Registered with the Ministry of Industrialisation and SME Development, BIPA",
                "Qualified auctioneer, South African College of Auctioneering, 2017",
                "Sworn appraiser, Magistrate Court of Namibia, 2018",
                "Certified by the office of the Inspector General to sell second-hand goods, 2018",
              ].map((item) => (
                <li key={item} className="hair-b py-4 text-[0.95rem] text-muted">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link href="/about" className="link-type text-[0.95rem]">
                About Fix Eagle
                <ArrowUpRight
                  className="ml-1 inline h-4 w-4"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
