import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Inter variable, self-hosted. The closest world-class match to
 * Target's "Helvetica for Target": one file carries every weight the
 * site uses (400 body, 500/600 emphasis, 700 headings, 800 display).
 */
const body = localFont({
  variable: "--font-body-loaded",
  src: [{ path: "../fonts/inter-var-latin.woff2", weight: "100 900", style: "normal" }],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Fix Eagle Investments Auctioneers | Auctions, Valuation and Private Sales in Namibia",
    template: "%s | Fix Eagle Investments Auctioneers",
  },
  description: site.description,
  applicationName: site.tradingName,
  authors: [{ name: site.principal.name }],
  keywords: [
    "auctioneers Namibia",
    "asset valuation Windhoek",
    "sworn appraiser Namibia",
    "live auction",
    "private sales",
    "scrap dealer Namibia",
    "Fix Eagle Investments",
  ],
  openGraph: {
    type: "website",
    siteName: site.tradingName,
    locale: "en_NA",
    url: site.url,
    title: "Fix Eagle Investments Auctioneers",
    description: site.description,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Fix Eagle Investments Auctioneers, Windhoek, Namibia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fix Eagle Investments Auctioneers",
    description: site.description,
    images: ["/images/og-default.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#26231E" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={body.variable}
    >
      <body className="antialiased bg-paper text-ink">
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
