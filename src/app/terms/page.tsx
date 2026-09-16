import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms for using this website and for participating in Fix Eagle auctions, including the as-is basis of sale and the buyer's premium.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    h: "The entity",
    body: [
      `These terms are issued by ${site.legalName}, trading as ${site.tradingName}, of ${site.address} ("Fix Eagle", "we"). By using this website or participating in an auction we conduct, you accept these terms and any auction-specific conditions announced for a particular sale.`,
    ],
  },
  {
    h: "This website",
    body: [
      "The website describes our services and invites enquiries. Nothing on it is an offer to buy or sell, a quotation, or a valuation. Written terms, valuations and sales plans are issued individually after we have assessed the assets in question.",
      "We keep the site accurate, but we do not warrant that every detail remains current at all times, and we accept no liability for decisions made on the strength of website content alone.",
    ],
  },
  {
    h: "Participating in an auction",
    body: [
      "To bid at a live auction you must register before the sale. To bid in an online auction you must register on the platform announced for that sale. We may refuse registration at our discretion, and bids may be rejected where a bidder cannot be identified or has an unpaid account with us.",
      "Every auction is announced with its own conditions of sale, including the date, venue or platform, viewing arrangements and payment terms for that sale. Those conditions form part of the contract of sale.",
    ],
  },
  {
    h: "Assets are sold as is",
    body: [
      "Unless a specific condition of sale states otherwise, all assets are sold as is, where is, voetstoots, without warranty of condition, fitness, quality or description. Descriptions and photographs in a catalogue are for identification only. Bidders are expected to inspect assets during the announced viewing period and bid on their own judgment.",
    ],
  },
  {
    h: "Buyer's premium and costs",
    body: [
      "A buyer's premium may be payable on the hammer price. Where a premium applies, its rate and calculation are announced in the conditions of the specific auction before bidding opens.",
    ],
  },
  {
    h: "Payment and collection",
    body: [
      "Payment terms, acceptable methods and collection deadlines are set out in the conditions of each auction. Ownership passes and assets may be collected only once the full purchase price and all applicable costs have been received in cleared funds. Storage may be charged on assets left behind after the announced deadline.",
    ],
  },
  {
    h: "Valuations and sworn appraisals",
    body: [
      "Valuations represent our professional opinion at the date stated, based on the information available at that time. Market conditions change, and no valuation guarantees a future sale price. See our separate disclaimer for the full position.",
    ],
  },
  {
    h: "Governing law",
    body: [
      "These terms and any auction we conduct are governed by the laws of the Republic of Namibia, and the courts of Namibia have jurisdiction.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms and conditions">
        The rules of the house, for the website and for the auctions we
        conduct. Auction-specific conditions are announced with each sale.
      </PageHero>
      <section className="shell pb-28">
        {sections.map((section) => (
          <div key={section.h} className="hair-t grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-14">
            <h2 className="text-[1.35rem] font-medium">{section.h}</h2>
            <div className="measure space-y-4 text-muted">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ))}
        <div className="hair-t pt-6 text-[0.85rem] text-muted">
          Last updated September 2026.
        </div>
      </section>
    </>
  );
}
