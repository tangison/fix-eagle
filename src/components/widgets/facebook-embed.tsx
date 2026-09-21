"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

/**
 * Facebook post or video embed, click-to-load.
 *
 * Facebook blocks server-side reads and their plugin iframes refuse to
 * render personal-profile posts, so the resting state is a branded
 * fallback link card (always correct, zero third-party weight, zero
 * layout shift). "Load embed" swaps in the official plugin iframe,
 * lazy-mounted; if Facebook refuses it, the fallback link stays one
 * glance away below the frame.
 */
export function FacebookEmbed({
  url,
  kind = "post",
  title,
}: {
  url: string;
  kind?: "post" | "video";
  title: string;
}) {
  const [loaded, setLoaded] = useState(false);

  const src =
    kind === "video"
      ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=680`
      : `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=680`;

  const host = "facebook.com";
  const shortUrl = url.replace(/^https?:\/\/(www\.)?/, "").slice(0, 64);

  return (
    <figure className="fb-embed">
      {loaded ? (
        <div className="fb-embed-frame">
          <iframe
            src={src}
            title={`Facebook ${kind}: ${title}`}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : (
        <div className="fb-embed-card">
          <span className="fb-embed-badge" aria-hidden>
            {kind === "video" ? (
              <Play className="h-3.5 w-3.5" />
            ) : (
              <FacebookGlyph className="h-3.5 w-3.5" />
            )}
          </span>
          <span className="fb-embed-meta">
            <span className="fb-embed-kind">
              Facebook {kind === "video" ? "video" : "post"}
            </span>
            <span className="fb-embed-title">{title}</span>
            <span className="fb-embed-url caption tnum">
              {shortUrl}
              {url.length > 64 ? "…" : ""}
            </span>
          </span>
          <span className="fb-embed-actions">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline fb-embed-btn"
            >
              View on Facebook
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </a>
            <button
              type="button"
              className="fb-embed-load link-type"
              onClick={() => setLoaded(true)}
            >
              Load the embed here
            </button>
          </span>
        </div>
      )}
      <figcaption className="caption mt-3">
        {loaded ? (
          <>
            Embed not loading?{" "}
            <a href={url} target="_blank" rel="noopener noreferrer" className="link-type">
              Open the post on {host}
            </a>
            .
          </>
        ) : (
          "Nothing loads until you ask: no Facebook scripts, no tracking, no layout shift."
        )}
      </figcaption>
    </figure>
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
