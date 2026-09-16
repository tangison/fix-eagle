import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Fix Eagle Investments Auctioneers in Prosperita, Windhoek: WhatsApp, phone and email. Request a sworn appraisal or book an auction.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Fix Eagle Investments Auctioneers",
    description: "WhatsApp first, or write. Prosperita, Windhoek, Namibia.",
    url: "/contact",
    images: [{ url: "/images/og-inner.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Put assets on the block">
        Tell us what you have and where it is. We will come back with a
        valuation approach and a sales plan.
      </PageHero>

      <section className="shell pb-28" aria-label="Enquiry">
        <div className="grid gap-16 md:grid-cols-[1.5fr_1fr] md:gap-20">
          <ContactForm />

          <aside className="space-y-10 md:pt-2" aria-label="Direct contact">
            <div>
              <h2 className="label-caps text-soft">Direct</h2>
              <ul className="mt-4 space-y-4 text-[0.98rem]">
                <li className="flex items-start gap-3">
                  <Phone
                    className="mt-1 h-4 w-4 flex-none text-accent-deep"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <a href={`tel:${site.phoneHref}`} className="link-type">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    className="mt-1 h-4 w-4 flex-none text-accent-deep"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <a
                    href={`mailto:${site.email}`}
                    className="link-type break-all"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin
                    className="mt-1 h-4 w-4 flex-none text-accent-deep"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="text-soft">{site.address}</span>
                </li>
              </ul>
              <p className="mt-4">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-type text-[0.9rem]"
                >
                  Open in Google Maps
                </a>
              </p>
            </div>

            <div className="hair-t pt-8">
              <h2 className="label-caps text-soft">Coverage</h2>
              <p className="measure mt-4 text-[0.95rem] text-soft">
                All fourteen regions of Namibia, and auctions executed anywhere
                in Africa or the world. Outside Windhoek, we train and
                remunerate local casuals as part of the auction team.
              </p>
            </div>

            <div className="hair-t pt-8">
              <h2 className="label-caps text-soft">Buying at auction</h2>
              <p className="measure mt-4 text-[0.95rem] text-soft">
                Upcoming auctions are announced through our marketing channels.
                Message us on WhatsApp to be notified of the next sale in your
                region.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
