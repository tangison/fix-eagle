"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/widgets/whatsapp-icon";
import { whatsappDisplay, whatsappLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";

/**
 * Floating WhatsApp chat widget. Renders nothing on the server (no
 * hydration mismatch), fades in after mount, and opens a small panel
 * with a prefilled general enquiry. The number comes from the
 * NEXT_PUBLIC_WHATSAPP_NUMBER environment variable.
 */
export function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer, true);
    };
  }, [open]);

  if (!mounted) return null;

  const generalMessage = site.whatsappText;

  return (
    <div
      ref={wrapRef}
      className={`float-wa ${open ? "is-open" : ""}`}
      style={{ "--i": 0 } as React.CSSProperties}
    >
      {open ? (
        <div className="float-wa-panel" role="dialog" aria-label="Chat on WhatsApp">
          <div className="float-wa-head">
            <p className="label-caps">WhatsApp</p>
            <p className="float-wa-title">Chat with Fix Eagle</p>
            <p className="caption tnum">{whatsappDisplay()}</p>
          </div>
          <div className="float-wa-body">
            <p className="float-wa-copy">
              Tell us what you want to sell, or ask about a vehicle. We reply
              during yard hours.
            </p>
            <a
              href={whatsappLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn on-dark float-wa-cta"
              onClick={() => setOpen(false)}
            >
              Start a general enquiry
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="float-wa-alt"
              onClick={() => setOpen(false)}
            >
              Or open a blank chat
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="float-wa-btn"
        aria-expanded={open}
        aria-controls="float-wa-panel"
        aria-label={open ? "Close WhatsApp chat panel" : "Open WhatsApp chat panel"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2} aria-hidden />
        ) : (
          <WhatsAppIcon className="float-wa-glyph" />
        )}
        <span className="float-wa-label">WhatsApp</span>
      </button>
    </div>
  );
}
