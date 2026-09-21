"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";

/**
 * Facebook page feed embed, click-to-load.
 *
 * The client's business page (facebook.com/fixeagle) is the one Facebook
 * surface that the official Page Plugin iframe renders reliably, because
 * it is a page rather than a personal profile. The resting state stays a
 * branded card: zero third-party requests until the visitor asks for the
 * feed, no layout shift, no tracking. "Load the feed" swaps in the
 * plugins/page.php iframe with the timeline tab; if Facebook refuses to
 * render it (plugin blocks, ad filters), the link card below the frame
 * still hands the visitor to the page.
 */
export function FacebookPageFeed({
  pageUrl = "https://www.facebook.com/fixeagle",
  height = 620,
}: {
  pageUrl?: string;
  height?: number;
}) {
  const [loaded, setLoaded] = useState(false);

  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    pageUrl
  )}&tabs=timeline&width=500&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  const shortUrl = pageUrl.replace(/^https?:\/\/(www\.)?/, "");

  return (
    <div className="fb-embed">
      {loaded ? (
        <div className="fb-embed-frame" style={{ height }}>
          <iframe
            src={src}
            title="Fix Eagle Investments on Facebook: latest page feed"
            loading="lazy"
            width="500"
            height={height}
            style={{ border: "none", overflow: "hidden", width: "100%", height: "100%" }}
            allow="encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            scrolling="no"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="fb-embed-card">
          <span className="fb-embed-badge" aria-hidden>
            <FacebookGlyph className="h-3.5 w-3.5" />
          </span>
          <span className="fb-embed-meta">
            <span className="fb-embed-kind">Facebook page feed</span>
            <span className="fb-embed-title">
              Fix Eagle Investments cc T/A FEI-Auctioneers
            </span>
            <span className="fb-embed-url caption tnum">
              {shortUrl} · 1.9K followers
            </span>
          </span>
          <span className="fb-embed-actions">
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline fb-embed-btn"
            >
              Open Facebook
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </a>
            <button
              type="button"
              className="fb-embed-load link-type"
              onClick={() => setLoaded(true)}
            >
              Load the feed here
            </button>
          </span>
        </div>
      )}
      <p className="caption mt-3">
        {loaded ? (
          <>
            Feed not loading?{" "}
            <a
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-type"
            >
              Open the page on Facebook
            </a>
            .
          </>
        ) : (
          "Nothing loads until you ask: no Facebook scripts, no tracking, no layout shift."
        )}
      </p>
    </div>
  );
}

/** Facebook f glyph, inline so no brand asset file is needed. */
function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
