import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/widgets/status-badge";
import { formatPrice, type Vehicle } from "@/data/vehicles";

/** One-line summary: year, mileage, the honest unknowns folded away. */
function metaLine(v: Vehicle): string {
  const parts: string[] = [];
  if (v.year !== null) parts.push(String(v.year));
  if (v.mileage !== null) parts.push(`${v.mileage.toLocaleString("en-NA")} km`);
  if (v.fuelType) parts.push(v.fuelType);
  return parts.join(" · ");
}

/**
 * Stock card, the case-card register. Server component; the whole card
 * is one link, badge and price ride on top of the photo.
 */
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const v = vehicle;
  return (
    <Link href={`/vehicles/${v.slug}`} className="vehicle-card group">
      <span className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={v.images[0]}
          alt={`${v.title} at the Fix Eagle yard, ${v.location}`}
          fill
          sizes="(min-width: 72rem) 33vw, (min-width: 48rem) 50vw, 100vw"
          className="object-cover transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 z-10">
          <StatusBadge status={v.status} />
        </span>
      </span>
      <span className="block p-5">
        <span className="caption tnum block">{metaLine(v) || "Specification pending"}</span>
        <span className="vehicle-title mt-1 block">{v.title}</span>
        <span className="vehicle-price mt-2 flex items-baseline justify-between gap-3">
          <span>
            {v.price !== null
              ? formatPrice(v.price)
              : v.priceNote
                ? "Price on enquiry"
                : "Price on enquiry"}
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-accent-deep transition-transform duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
            aria-hidden
          />
        </span>
      </span>
    </Link>
  );
}
