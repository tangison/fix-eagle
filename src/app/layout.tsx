import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-loaded",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const body = localFont({
  variable: "--font-body-loaded",
  src: [
    { path: "../fonts/switzer-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/switzer-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/switzer-600.woff2", weight: "600", style: "normal" },
  ],
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
    { media: "(prefers-color-scheme: light)", color: "#CDA666" },
    { media: "(prefers-color-scheme: dark)", color: "#2b2a26" },
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
      className={`${display.variable} ${body.variable}`}
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
