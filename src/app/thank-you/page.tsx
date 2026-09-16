import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank you",
  description:
    "Your enquiry to Fix Eagle Investments Auctioneers has been prepared.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <>
      <PageHero title="Thank you.">
        Your message has been prepared in WhatsApp. Press send there and we
        will pick it up. If WhatsApp did not open, use the details below.
      </PageHero>
      <section className="shell pb-32">
        <div className="flex flex-wrap items-center gap-7">
          <a href={site.whatsapp} className="btn-outline">
            Open WhatsApp
          </a>
          <a href={`tel:${site.phoneHref}`} className="link-type text-[0.95rem]">
            {site.phoneDisplay}
          </a>
        </div>
        <p className="mt-10 text-soft">
          While you wait, read{" "}
          <Link href="/process" className="link-type">
            how an auction runs
          </Link>
          .
        </p>
      </section>
    </>
  );
}
