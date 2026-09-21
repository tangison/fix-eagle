"use client";

import { useEffect, useState } from "react";

type Parts = { d: number; h: number; m: number; s: number };

function diffParts(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Auction countdown. Hydration-safe: the server and the first client
 * render show placeholders, the real clock starts after mount, and the
 * interval is cleared on unmount. Falls back to nothing when no date
 * is set yet.
 */
export function AuctionCountdown({
  date,
  label = "Auction closes in",
}: {
  date: string | null | undefined;
  label?: string;
}) {
  const [parts, setParts] = useState<Parts | null>(null);
  const [target, setTarget] = useState<number | null>(null);

  useEffect(() => {
    if (!date) return;
    const t = new Date(date).getTime();
    if (Number.isNaN(t)) return;
    setTarget(t);
    setParts(diffParts(t));
    const id = setInterval(() => setParts(diffParts(t)), 1000);
    return () => clearInterval(id);
  }, [date]);

  if (!date || target === null) {
    return (
      <p className="countdown-pending caption">
        Auction date to be confirmed. Register your interest and we will send
        the date as soon as it is set.
      </p>
    );
  }

  const closed = Date.now() >= target;

  return (
    <div className="countdown" role="timer" aria-live="off" aria-atomic="true">
      {closed ? (
        <p className="countdown-closed label-caps">This auction has closed</p>
      ) : (
        <>
          <p className="label-caps countdown-label">{label}</p>
          <dl className="countdown-grid tnum">
            {(
              [
                ["Days", parts?.d],
                ["Hours", parts?.h],
                ["Min", parts?.m],
                ["Sec", parts?.s],
              ] as const
            ).map(([name, value]) => (
              <div key={name} className="countdown-cell">
                <dd>{value === undefined ? "--" : pad(value)}</dd>
                <dt>{name}</dt>
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}
