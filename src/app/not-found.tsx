import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80dvh] flex-col items-start justify-center py-32">
      <Image
        src="/images/logo-eagle.png"
        alt=""
        width={72}
        height={74}
        className="h-[4.5rem] w-auto"
      />
      <h1 className="mt-8 text-[clamp(2.4rem,5.5vw,4.2rem)]">
        This lot has moved.
      </h1>
      <p className="measure mt-5 text-muted">
        The page you were looking for is not on the block. Everything else is
        one click away.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-7">
        <Link href="/" className="btn-outline">
          Back to the home page
        </Link>
        <Link href="/contact" className="link-type text-[0.95rem]">
          Contact us
        </Link>
      </div>
    </section>
  );
}
