"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Facebook, Link2, Share2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/widgets/whatsapp-icon";
import { site } from "@/lib/site";

/**
 * Share controls for a vehicle page: native share where the browser
 * offers it, WhatsApp, Facebook, and copy link with a confirmed state.
 * Capability detection is hydration-safe via useSyncExternalStore: the
 * server snapshot is always false, the client resolves after hydration.
 */
const noopSubscribe = () => () => {};
const getCanShare = () =>
  typeof navigator !== "undefined" && "share" in navigator;
const getCanShareServer = () => false;

export function ShareButtons({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);
  const canShare = useSyncExternalStore(
    noopSubscribe,
    getCanShare,
    getCanShareServer
  );

  // Canonical share URL: the production domain, so shares are correct
  // no matter which host the visitor is on. No window access at render.
  const url = `${site.url}${path}`;
  const text = `${title}, listed at Fix Eagle Auctioneers`;

  async function nativeShare() {
    try {
      await navigator.share({ title, text, url });
    } catch {
      /* user cancelled; nothing to do */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable; fall silent */
    }
  }

  const wa = `https://wa.me/?text=${encodeURIComponent(`${text}: ${url}`)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="share-row">
      <span className="label-caps text-soft">Share</span>
      <ul className="flex flex-wrap items-center gap-2.5">
        {canShare ? (
          <li>
            <button type="button" className="share-btn" onClick={nativeShare} aria-label="Share this page">
              <Share2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              Share
            </button>
          </li>
        ) : null}
        <li>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
            aria-label="Share on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
        </li>
        <li>
          <a
            href={fb}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Facebook
          </a>
        </li>
        <li>
          <button
            type="button"
            className="share-btn"
            onClick={copyLink}
            aria-label="Copy the link to this page"
          >
            {copied ? (
              <Check className="h-4 w-4 text-accent-deep" strokeWidth={2} aria-hidden />
            ) : (
              <Link2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            )}
            {copied ? "Copied" : "Copy link"}
          </button>
        </li>
      </ul>
    </div>
  );
}
