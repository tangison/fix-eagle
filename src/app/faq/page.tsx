import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How to sell assets through Fix Eagle, what a sworn appraisal means, which regions and asset categories we cover, and how live, online and private treaty sales differ.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Fix Eagle Investments Auctioneers",
    description:
      "Selling, valuation, coverage, channels and after-sale, answered.",
    url: "/faq",
    images: [{ url: "/images/og-inner.jpg", width: 1200, height: 630 }],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero title="Questions, answered">
        What clients ask before they sell. Anything else, message us on
        WhatsApp and {site.principal.name.split(" ")[0]} or the team will
        answer directly.
      </PageHero>

      <section className="shell pb-28" aria-label="Frequently asked questions">
        <FaqAccordion items={faqs} />
        <p className="mt-12 text-soft">
          Still unsure?{" "}
          <a href={site.whatsapp} className="link-type">
            Ask on WhatsApp
          </a>{" "}
          or{" "}
          <a href={`mailto:${site.email}`} className="link-type">
            write to us
          </a>
          .
        </p>
      </section>
    </>
  );
}
