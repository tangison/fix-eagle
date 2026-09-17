import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer hair-t mt-auto bg-paper text-ink">
      <div className="shell py-20 md:py-24">
        <p className="foot-statement">{site.closingLine}</p>
        <p className="measure mt-6 text-soft">
          We add value to our clients, through dedicated service delivery.
        </p>

        <div className="hair-t mt-14 grid gap-10 pt-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${site.tradingName}, home`}
          >
            <Image
              src="/images/logo-full-sm.png"
              alt=""
              width={31}
              height={34}
              className="h-[2.1rem] w-auto"
            />
            <span className="flex flex-col leading-none">
              <span className="text-[0.95rem] font-bold tracking-[0.015em]">
                FIX EAGLE
              </span>
              <span className="label-caps mt-[3px] text-[0.5rem] tracking-[0.3em] text-soft">
                Auctioneers
              </span>
            </span>
          </Link>

          <nav aria-label="Footer" className="md:justify-self-center">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { href: "/services", label: "Services" },
                { href: "/process", label: "Process" },
                { href: "/case-studies", label: "Case studies" },
                { href: "/about", label: "About" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="label-caps hover:text-accent-deep">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic text-[0.92rem] leading-relaxed text-soft md:text-right">
            <a href={`mailto:${site.email}`} className="link-type">
              {site.email}
            </a>
            <br />
            <a href={`tel:${site.phoneHref}`} className="link-type">
              {site.phoneDisplay}
            </a>
            <br />
            {site.address}
          </address>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-rule-2 pt-6 text-[0.8rem] text-soft md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-accent-deep">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent-deep">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-accent-deep">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/brand" className="hover:text-accent-deep">
                Brand
              </Link>
            </li>
          </ul>
          <p>
            Made by{" "}
            <a
              href="https://studio.tangison.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-type"
            >
              Tangison Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
