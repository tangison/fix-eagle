"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { navLinks, site } from "@/lib/site";

function Wordmark({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="flex items-center gap-3"
      aria-label={`${site.tradingName}, home`}
    >
      <Image
        src="/images/logo-full.png"
        alt=""
        width={37}
        height={40}
        priority
        className="h-10 w-auto"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.18rem] font-semibold tracking-[0.02em]">
          FIX EAGLE
        </span>
        <span className="label-caps mt-[3px] text-[0.53rem] tracking-[0.24em] opacity-70">
          Investments Auctioneers
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [overHero, setOverHero] = useState(isHome);
  const [open, setOpen] = useState(false);

  // Route changes reset the hero state during render, not in an effect.
  const [prevHome, setPrevHome] = useState(isHome);
  if (prevHome !== isHome) {
    setPrevHome(isHome);
    setOverHero(isHome);
  }

  useEffect(() => {
    if (!isHome) return;
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const solid = !overHero;

  return (
    <header
      className={`site-header ${solid ? "is-solid" : ""} ${
        overHero ? "on-photo" : ""
      }`}
    >
      <div className="shell-wide flex h-[4.5rem] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`label-caps transition-colors duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent-deep ${
                    pathname === link.href ? "text-accent-deep" : ""
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="link-type hidden text-[0.86rem] font-medium lg:inline-flex lg:items-center lg:gap-1"
          >
            WhatsApp
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </a>
          <ThemeToggle />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex cursor-pointer p-1 lg:hidden"
              >
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </DialogTrigger>
            <DialogContent
              className="fixed inset-0 top-auto flex h-dvh max-h-dvh w-screen max-w-none translate-y-0 flex-col overflow-y-auto rounded-none border-0 bg-paper p-0 text-ink sm:rounded-none sm:translate-y-0"
              aria-describedby={undefined}
            >
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <div className="shell flex items-center justify-between py-5">
                <Wordmark onNavigate={() => setOpen(false)} />
              </div>
              <nav aria-label="Mobile" className="shell flex-1">
                <ul className="flex flex-col">
                  {navLinks.map((link) => (
                    <li key={link.href} className="hair-b">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block py-5 font-serif text-3xl font-medium"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="shell space-y-3 py-8">
                <a href={site.whatsapp} className="btn-outline">
                  WhatsApp {site.phoneDisplay}
                </a>
                <p className="caption">{site.address}</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-type text-[0.9rem]"
                >
                  {site.email}
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
