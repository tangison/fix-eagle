import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { VehiclesExplorer } from "@/components/widgets/vehicles-explorer";
import { vehicles } from "@/data/vehicles";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vehicles in stock",
  description:
    "Vehicles currently available at Fix Eagle Auctioneers: bakkies, SUVs and runabouts on the yard in Windhoek, plus auction bargains and the buying desk. Enquire on WhatsApp.",
  alternates: { canonical: "/vehicles" },
  openGraph: {
    title: "Vehicles in stock | Fix Eagle Investments Auctioneers",
    description:
      "Bakkies, SUVs and runabouts on the yard in Windhoek, plus auction bargains and the buying desk.",
    url: `${site.url}/vehicles`,
    images: [{ url: "/images/og-inner.jpg", width: 1200, height: 630 }],
  },
};

export default function VehiclesPage() {
  const availableCount = vehicles.filter((v) => v.status === "available").length;
  const auctionCount = vehicles.filter((v) => v.status === "auction").length;
  const auctionPhrase =
    auctionCount === 1
      ? ", and 1 auction bargain runs on the clock"
      : auctionCount > 1
        ? `, and ${auctionCount} auction bargains run on the clock`
        : "";

  return (
    <>
      <PageHero title="Vehicles on the yard">
        <p>
          Stock moves through the yard every week: bakkies, SUVs and
          runabouts, sold on a first come basis, and auction bargains when a
          lot lands. Every listing below is photographed where it stands in
          Prosperita. {availableCount} vehicles are available now
          {auctionPhrase}. What you see is what you inspect.
        </p>
      </PageHero>

      <section className="shell pb-20 md:pb-28" aria-label="Vehicle stock">
        <VehiclesExplorer vehicles={vehicles} />
      </section>

      {/* Buying desk strip */}
      <section className="hair-t section" aria-label="Sell us your vehicle">
        <div className="shell">
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">
                Selling a vehicle?
              </h2>
              <p className="measure mt-5 text-soft">
                We buy used vehicles for the yard outright, take vehicles on
                consignment, and auction fleets for banks, insurers and
                institutions. Send us the details and photos on WhatsApp and
                we will come back with a number.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 md:justify-end">
              <Link href="/contact" className="btn">
                Request a valuation
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
              <Link href="/services" className="link-type text-[0.95rem]">
                How selling works
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
