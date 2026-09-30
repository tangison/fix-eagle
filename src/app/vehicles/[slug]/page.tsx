import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { VehicleGallery } from "@/components/widgets/vehicle-gallery";
import { StatusBadge } from "@/components/widgets/status-badge";
import { AuctionCountdown } from "@/components/widgets/auction-countdown";
import { FacebookEmbed } from "@/components/widgets/facebook-embed";
import { EnquiryForm } from "@/components/widgets/enquiry-form";
import { ShareButtons } from "@/components/widgets/share-buttons";
import { WhatsAppIcon } from "@/components/widgets/whatsapp-icon";
import { VehicleCard } from "@/components/widgets/vehicle-card";
import { vehicleBySlug, vehicles, relatedVehicles } from "@/data/vehicles";
import { site } from "@/lib/site";
import { vehicleEnquiryLink, whatsappLink } from "@/lib/whatsapp";

/** Prerender every vehicle page at build time. */
export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

/** Real pixel sizes of each listing's primary photo (all 4:3). */
const ogSizes: Record<string, { width: number; height: number }> = {
  "bmw-x3-2012": { width: 2048, height: 1536 },
  "ford-ranger-2001-double-cab": { width: 1920, height: 1440 },
  "renault-koleos-2013-4wd": { width: 2048, height: 1536 },
  "volkswagen-amarok-tdi-2014": { width: 2048, height: 1536 },
  "wanted-used-vehicles": { width: 2048, height: 1536 },
  "nissan-note": { width: 1536, height: 1152 },
  "jeep-patriot-urgent-sale": { width: 2048, height: 1536 },
  "toyota-ipsum-2006": { width: 2048, height: 1536 },
  "volkswagen-golf-fsi-2006": { width: 1600, height: 1200 },
  "ford-ranger-king-cab": { width: 2048, height: 1536 },
  "mercedes-b-class": { width: 1536, height: 1152 },
  "chevrolet-aveo-ls-2015": { width: 2048, height: 1536 },
};
const ogDefault = { width: 2048, height: 1536 };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = vehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle not found" };

  const title = `${vehicle.title} | Vehicles in stock`;
  const description =
    vehicle.description.length > 155
      ? `${vehicle.description.slice(0, 152)}…`
      : vehicle.description;
  const size = ogSizes[vehicle.slug] ?? ogDefault;

  return {
    title,
    description,
    alternates: { canonical: `/vehicles/${vehicle.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${site.url}/vehicles/${vehicle.slug}`,
      images: [
        {
          url: vehicle.images[0],
          width: size.width,
          height: size.height,
          alt: `${vehicle.title} at the Fix Eagle yard in Windhoek`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [vehicle.images[0]],
    },
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = vehicleBySlug(slug);
  if (!vehicle) notFound();

  const related = relatedVehicles(vehicle, 3);
  const priceLine =
    vehicle.price !== null
      ? `N$${vehicle.price.toLocaleString("en-NA")}`
      : "Price on enquiry";

  /** Vehicle structured data. Offers only when a price is confirmed. */
  const vehicleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: vehicle.title,
    ...(vehicle.make ? { brand: { "@type": "Brand", name: vehicle.make } } : {}),
    ...(vehicle.model ? { model: vehicle.model } : {}),
    ...(vehicle.year !== null ? { vehicleModelDate: String(vehicle.year) } : {}),
    ...(vehicle.mileage !== null
      ? { mileage: `${vehicle.mileage} km` }
      : {}),
    ...(vehicle.fuelType ? { fuelType: vehicle.fuelType } : {}),
    image: `${site.url}${vehicle.images[0]}`,
    description: vehicle.description,
    itemCondition: "https://schema.org/UsedCondition",
    ...(vehicle.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: vehicle.price,
            priceCurrency: "NAD",
            availability:
              vehicle.status === "available"
                ? "https://schema.org/InStock"
                : "https://schema.org/SoldOut",
            url: `${site.url}/vehicles/${vehicle.slug}`,
            seller: {
              "@type": "AuctionHouse",
              name: site.legalName,
            },
          },
        }
      : {}),
  };

  const specRows: { term: string; value: string | null; pending: boolean }[] = [
    { term: "Make", value: vehicle.make, pending: false },
    { term: "Model", value: vehicle.model, pending: false },
    { term: "Year", value: vehicle.year !== null ? String(vehicle.year) : null, pending: vehicle.year === null },
    { term: "Mileage", value: vehicle.mileage !== null ? `${vehicle.mileage.toLocaleString("en-NA")} km` : null, pending: vehicle.mileage === null },
    { term: "Transmission", value: vehicle.transmission, pending: vehicle.transmission === null },
    { term: "Fuel", value: vehicle.fuelType, pending: vehicle.fuelType === null },
    { term: "Condition", value: vehicle.condition, pending: vehicle.condition === null },
    { term: "Location", value: vehicle.location, pending: false },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleJsonLd) }}
      />

      <PageHero title={vehicle.title}>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <StatusBadge status={vehicle.status} />
          <span className="tnum">{priceLine}</span>
          {vehicle.year !== null ? <span className="tnum">{vehicle.year}</span> : null}
          {vehicle.mileage !== null ? (
            <span className="tnum">{vehicle.mileage.toLocaleString("en-NA")} km</span>
          ) : null}
        </p>
      </PageHero>

      <section className="shell pb-16 md:pb-24" aria-label="Vehicle details">
        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          {/* Photo gallery */}
          <VehicleGallery
            images={vehicle.images}
            title={vehicle.title}
          />

          {/* Spec sheet, description and actions */}
          <div>
            <table className="spec-table">
              <caption className="sr-only">
                Specification of the {vehicle.title}
              </caption>
              <tbody>
                {specRows.map((row) => (
                  <tr key={row.term}>
                    <th scope="row">{row.term}</th>
                    <td>
                      {row.value ?? (
                        <span className="todo-note">To be confirmed, ask us</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Price</th>
                  <td>
                    <span className="font-semibold">{priceLine}</span>
                    {vehicle.priceNote ? (
                      <>
                        {" "}
                        <span className="todo-note block text-[0.82rem]">
                          {vehicle.priceNote}
                        </span>
                      </>
                    ) : null}
                  </td>
                </tr>
              </tbody>
            </table>

            {vehicle.status === "auction" ? (
              <div className="mt-8">
                <AuctionCountdown date={vehicle.auctionDate} />
              </div>
            ) : null}

            <div className="mt-8 prose-doc">
              <h2 className="text-[1.35rem]">About this vehicle</h2>
              <p className="mt-4 leading-relaxed">{vehicle.description}</p>
              {vehicle.dataConfidence !== "confirmed" ? (
                <p className="caption mt-4">
                  Specification details marked to be confirmed are being
                  checked against the papers. Ask us for anything the table
                  does not state yet.
                </p>
              ) : null}
            </div>

            {/* Actions */}
            <div className="mt-9 grid gap-4">
              <a
                href={vehicleEnquiryLink(vehicle.title, vehicle.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" aria-hidden />
                Enquire on WhatsApp
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </a>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={`tel:${site.phoneHref}`} className="link-type tnum text-[0.95rem]">
                  Or call {site.phoneDisplay}
                </a>
                <Link href="/contact" className="link-type text-[0.95rem]">
                  Book a viewing
                </Link>
              </div>
            </div>

            <div className="mt-8 hair-t pt-6">
              <ShareButtons
                path={`/vehicles/${vehicle.slug}`}
                title={vehicle.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Source post: only when the listing carries a Facebook post. */}
      {vehicle.facebookUrl ? (
        <section className="shell pb-16 md:pb-20" aria-label="Source post">
          <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)]">As advertised</h2>
          <p className="measure mt-3 text-soft">
            Every listing starts as a post on Facebook, where Namibia buys and
            sells. The original is right here.
          </p>
          <div className="mt-8 max-w-[42rem]">
            <FacebookEmbed
              url={vehicle.facebookUrl}
              kind={vehicle.isVideoPost ? "video" : "post"}
              title={vehicle.title}
            />
          </div>
        </section>
      ) : null}

      {/* Bid interest form */}
      <section className="hair-t section" aria-label="Enquire or register bid interest">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">
              Enquire or register your interest
            </h2>
            <p className="measure mt-5 text-soft">
              Leave your details and we will come back to you on the number
              you give. Interested in bidding when this runs on the auction
              clock? Say so in the message and we will send the yard number
              and the conditions of sale.
            </p>
            <p className="mt-6">
              <Link href="/vehicles" className="link-type text-[0.95rem]">
                Back to all vehicles
                <ArrowRight className="ml-1 inline h-4 w-4" strokeWidth={1.75} aria-hidden />
              </Link>
            </p>
          </div>
          <div>
            <EnquiryForm defaultVehicleSlug={vehicle.slug} compact />
          </div>
        </div>
      </section>

      {/* Related stock */}
      {related.length > 0 ? (
        <section className="hair-t section" aria-label="More vehicles">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">
                More on the yard
              </h2>
              <Link href="/vehicles" className="link-type text-[0.95rem]">
                All vehicles
                <ArrowUpRight className="ml-1 inline h-4 w-4" strokeWidth={1.75} aria-hidden />
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) => (
                <li key={v.slug}>
                  <VehicleCard vehicle={v} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

    </>
  );
}
