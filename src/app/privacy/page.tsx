import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Fix Eagle Investments CC collects, uses and protects personal information, and the rights you have over it.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    h: "Who we are",
    body: [
      `This website is operated by ${site.legalName}, trading as ${site.tradingName}, established at ${site.address}. We are an auctioneering, valuation and private sales business. For any privacy question, write to ${site.email} or call ${site.phoneDisplay}.`,
    ],
  },
  {
    h: "What we collect",
    body: [
      "When you contact us through this website, through WhatsApp, by phone or by email, we collect the information you choose to give us: your name, phone number, the region and asset type you write about, and the content of your message.",
      "We also keep ordinary technical records, such as server logs, which help us keep the site working and secure. This site does not use advertising cookies or third-party analytics trackers.",
    ],
  },
  {
    h: "Why we collect it",
    body: [
      "To answer your enquiry, to prepare valuations and sales plans, to execute auctions you instruct us to conduct, and to keep the records that auctions and sworn appraisals legally require. We do not sell or rent personal information to anyone.",
    ],
  },
  {
    h: "Who we share it with",
    body: [
      "Only where an auction or appraisal requires it: for example, with buyers at an auction you instruct, with the courts when a sworn appraisal is submitted, or with service providers who help us run a sale. Wherever personal information is processed for you, it stays within the scope of the instruction you gave us.",
    ],
  },
  {
    h: "How long we keep it",
    body: [
      "For as long as the law and our professional obligations require. Auction and appraisal records are retained so that sales, proceeds and payments can be accounted for. Enquiry messages that do not lead to work are deleted once the conversation has run its course.",
    ],
  },
  {
    h: "Your rights",
    body: [
      "You may ask us what personal information we hold about you, ask us to correct it, or ask us to delete it where no legal or professional obligation requires us to keep it. Write to us at the contact details above and we will act on a reasonable request.",
    ],
  },
  {
    h: "Security",
    body: [
      "We keep personal information on systems we control, limit access to the people who need it, and use encrypted channels wherever they are available, including WhatsApp. No method of storage is perfectly secure, but we treat your information with the care the law and our profession demand.",
    ],
  },
  {
    h: "Changes to this policy",
    body: [
      "If we change this policy, we will publish the updated version on this page. The policy applies from the date it is published.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy policy">
        Plain language, because the policy behind it is simple: we collect what
        you send us, we use it to do the work you instruct, and we do not sell
        it.
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
