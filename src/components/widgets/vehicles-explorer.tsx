"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { VehicleCard } from "@/components/widgets/vehicle-card";
import {
  vehicleMakes,
  type Vehicle,
  type VehicleStatus,
} from "@/data/vehicles";

const STATUS_OPTIONS: { value: VehicleStatus | "all"; label: string }[] = [
  { value: "all", label: "All listings" },
  { value: "available", label: "Available" },
  { value: "auction", label: "Auction" },
  { value: "wanted", label: "Wanted, we buy" },
  { value: "sold", label: "Sold" },
];

const PRICE_OPTIONS = [
  { value: "all", label: "Any price" },
  { value: "under-50", label: "Under N$50 000" },
  { value: "50-100", label: "N$50 000 to N$100 000" },
  { value: "100-200", label: "N$100 000 to N$200 000" },
  { value: "200-plus", label: "N$200 000 and up" },
  { value: "pending", label: "Price on enquiry" },
] as const;

type SortKey = "newest" | "price-asc" | "price-desc" | "mileage-asc" | "make";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest listings first" },
  { value: "price-asc", label: "Price, lowest first" },
  { value: "price-desc", label: "Price, highest first" },
  { value: "mileage-asc", label: "Mileage, lowest first" },
  { value: "make", label: "Make, A to Z" },
];

function inPriceRange(v: Vehicle, range: string): boolean {
  if (range === "all") return true;
  if (range === "pending") return v.price === null;
  if (v.price === null) return false;
  switch (range) {
    case "under-50":
      return v.price < 50_000;
    case "50-100":
      return v.price >= 50_000 && v.price < 100_000;
    case "100-200":
      return v.price >= 100_000 && v.price < 200_000;
    case "200-plus":
      return v.price >= 200_000;
    default:
      return true;
  }
}

/**
 * Stock explorer: search, make and status and price filters, and sort,
 * all client side over the full register. The grid renders VehicleCards;
 * the controls use the site's field register.
 */
export function VehiclesExplorer({ vehicles }: { vehicles: Vehicle[] }) {
  const [query, setQuery] = useState("");
  const [make, setMake] = useState("all");
  const [status, setStatus] = useState<VehicleStatus | "all">("all");
  const [price, setPrice] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = vehicles.filter((v) => {
      if (make !== "all" && v.make !== make) return false;
      if (status !== "all" && v.status !== status) return false;
      if (!inPriceRange(v, price)) return false;
      if (q) {
        const hay = `${v.title} ${v.make} ${v.model} ${v.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sort) {
      case "newest":
        // The register is stored newest post first.
        break;
      case "price-asc":
        sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
        break;
      case "mileage-asc":
        sorted.sort((a, b) => (a.mileage ?? Infinity) - (b.mileage ?? Infinity));
        break;
      case "make":
        sorted.sort((a, b) => a.make.localeCompare(b.make));
        break;
    }
    return sorted;
  }, [vehicles, query, make, status, price, sort]);

  return (
    <div>
      {/* Control bar */}
      <div className="explorer-controls">
        <div className="explorer-search">
          <label htmlFor="vx-search" className="field-label">
            Search
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-soft"
              strokeWidth={1.75}
              aria-hidden
            />
            <input
              id="vx-search"
              type="search"
              className="field-input field-input-search"
              placeholder="Koleos, Amarok, bakkie…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="vx-make" className="field-label">
            Make
          </label>
          <select
            id="vx-make"
            className="field-input"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          >
            <option value="all">All makes</option>
            {vehicleMakes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="vx-status" className="field-label">
            Status
          </label>
          <select
            id="vx-status"
            className="field-input"
            value={status}
            onChange={(e) => setStatus(e.target.value as VehicleStatus | "all")}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="vx-price" className="field-label">
            Price
          </label>
          <select
            id="vx-price"
            className="field-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            {PRICE_OPTIONS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="vx-sort" className="field-label">
            Sort
          </label>
          <select
            id="vx-sort"
            className="field-input"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="caption mt-4 tnum" role="status">
        {filtered.length} {filtered.length === 1 ? "listing" : "listings"}
        {filtered.length !== vehicles.length ? ` of ${vehicles.length}` : ""}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <li key={v.slug}>
              <VehicleCard vehicle={v} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="explorer-empty mt-8">
          <p className="text-[1.1rem] font-semibold">Nothing matches that yet.</p>
          <p className="mt-2 text-soft">
            Stock moves every week. Clear a filter, or tell us what you are
            hunting for on WhatsApp and we will call you when it lands.
          </p>
        </div>
      )}
    </div>
  );
}
