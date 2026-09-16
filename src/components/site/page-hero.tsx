import type { ReactNode } from "react";

/**
 * Inner-page header band. Generous top padding clears the fixed header,
 * title set in the display face, one-line description underneath.
 */
export function PageHero({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="shell pb-10 pt-32 md:pb-14 md:pt-44">
      <h1 className="max-w-[18ch] text-[clamp(2.4rem,5.5vw,4.2rem)] font-medium">
        {title}
      </h1>
      {children ? (
        <div className="measure mt-6 text-[1.05rem] text-muted">{children}</div>
      ) : null}
    </header>
  );
}
