"use client";

import { useMemo, useState } from "react";
import { sectorOf, sectors } from "@/lib/site";
import type { Reference } from "@/lib/site";

/**
 * The trade reference register with a sector filter dropdown. The
 * register itself stays the auction catalogue table; the filter is a
 * styled native select, reliable on every device.
 */
export function ReferenceTable({ references }: { references: readonly Reference[] }) {
  const [sector, setSector] = useState<string>("All sectors");

  const filtered = useMemo(
    () =>
      sector === "All sectors"
        ? references
        : references.filter((r) => sectorOf[r.entity] === sector),
    [references, sector]
  );

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-[clamp(1.85rem,3.4vw,2.9rem)]">Trade references</h2>
        <div className="w-full max-w-[16.5rem]">
          <label
            htmlFor="sector-filter"
            className="field-label"
          >
            Filter by sector
          </label>
          <select
            id="sector-filter"
            className="field-input"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="caption tnum mt-4" aria-live="polite">
        {filtered.length} of {references.length} references shown
      </p>

      {/* Desktop: the auction register. Mobile: stacked entries. */}
      <div className="mt-8">
        <table className="ref-table tnum hidden md:table">
          <thead>
            <tr>
              <th scope="col">Entity</th>
              <th scope="col">Scope</th>
              <th scope="col">Period</th>
              <th scope="col">Performance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((ref) => (
              <tr key={ref.entity}>
                <td>
                  {ref.entity}
                  {ref.referee ? (
                    <span className="caption mt-1 block">{ref.referee}</span>
                  ) : null}
                </td>
                <td>{ref.scope}</td>
                <td>{ref.period}</td>
                <td>{ref.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <dl className="md:hidden">
          {filtered.map((ref) => (
            <div key={ref.entity} className="hair-b py-7">
              <dt className="text-[1.25rem] font-semibold tracking-[-0.01em] text-ink-2">
                {ref.entity}
              </dt>
              <dd className="mt-3 space-y-2 text-[0.92rem] text-soft">
                <p>{ref.scope}</p>
                <p className="tnum">{ref.period}</p>
                <p>{ref.performance}</p>
                {ref.referee ? <p className="caption">{ref.referee}</p> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
