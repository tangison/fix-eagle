import type { VehicleStatus } from "@/data/vehicles";

const LABELS: Record<VehicleStatus, string> = {
  available: "Available",
  sold: "Sold",
  auction: "Auction",
  wanted: "Wanted, we buy",
};

/**
 * Stock status badge. Gold fill for stock on the floor, charcoal for
 * sold, the brand orange line for auctions, an outline for the buying
 * desk. Server component; safe inside any grid or card.
 */
export function StatusBadge({ status }: { status: VehicleStatus }) {
  return (
    <span className={`status-badge status-${status}`} data-status={status}>
      <span className="status-dot" aria-hidden />
      {LABELS[status]}
    </span>
  );
}

export function statusLabel(status: VehicleStatus): string {
  return LABELS[status];
}
