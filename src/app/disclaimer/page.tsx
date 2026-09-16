import type { Metadata } from "next";
import { BrownPage } from "@/components/site/brown-page";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Valuation and appraisal disclaimer for Fix Eagle Investments Auctioneers, including the professional-opinion basis of sworn appraisals.",
  alternates: { canonical: "/disclaimer" },
};

const sections = [
  {
    h: "Valuations are opinions",
    body: [
      "A valuation or appraisal issued by Fix Eagle is a professional opinion, formed at a stated date, on the information available at that time. It is not a statement of fact, a guarantee of a sale price, or a warranty of an asset's condition, provenance or fitness for any purpose.",
      "Markets for moveable assets move with demand, condition and circumstance. The price an asset fetches at a later auction or private sale may differ from any figure in a valuation, and no liability is accepted for such differences.",
    ],
  },
  {
    h: "Sworn appraisals",
    body: [
      "Where we act as sworn appraisers, our confirmatory affidavits and statements are prepared for the proceedings and purposes for which they are commissioned. They express our independent professional opinion and are not altered to suit any party's position.",
    ],
  },
  {
    h: "Website content",
    body: [
      "This website describes our services, history and trade references in summary form. It is not a contract, a quotation, or an invitation to rely on any particular figure. Written terms are issued for each instruction after the assets have been assessed.",
    ],
  },
  {
    h: "Third parties",
    body: [
      "Trade referees are named with their consent for reference purposes. Links or references to other parties do not make us responsible for their conduct or their content.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <BrownPage>
      <>
        <PageHero title="Disclaimer">
          What a valuation is, and what it is not. Stated plainly, because our
          opinions carry weight in court and in contract.
        </PageHero>
        <section className="shell pb-28">
          {sections.map((section) => (
            <div key={section.h} className="hair-t grid gap-4 py-10 md:grid-cols-[14rem_1fr] md:gap-14">
              <h2 className="text-[1.35rem] font-semibold">{section.h}</h2>
              <div className="measure space-y-4 text-soft">
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
          <div className="hair-t pt-6 text-[0.85rem] text-soft">
            Questions about any of this? Write to{" "}
            <a href={`mailto:${site.email}`} className="link-type">
              {site.email}
            </a>
            .
          </div>
        </section>
      </>
    </BrownPage>
  );
}
