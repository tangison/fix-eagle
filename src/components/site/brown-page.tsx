import type { ReactNode } from "react";

/**
 * Brown page ground: the text-heavy pages (privacy, terms, disclaimer,
 * brand) run on deep cocoa built from the brand codes, with ivory body
 * text and gold headings. The fixed header joins the ground through a
 * body:has() rule in globals.css.
 */
export function BrownPage({ children }: { children: ReactNode }) {
  return (
    <div className="theme-brown bg-paper text-ink">
      <div className="prose-doc">{children}</div>
    </div>
  );
}
