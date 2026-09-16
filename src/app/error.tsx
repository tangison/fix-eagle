"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="shell flex min-h-[80dvh] flex-col items-start justify-center py-32">
      <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)]">
        The gavel came down wrong.
      </h1>
      <p className="measure mt-5 text-muted">
        Something on our side failed to load. Try again, and if it keeps
        failing, tell us on WhatsApp.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-7">
        <button type="button" onClick={reset} className="btn-outline">
          Try again
        </button>
        <Link href="/" className="link-type text-[0.95rem]">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
