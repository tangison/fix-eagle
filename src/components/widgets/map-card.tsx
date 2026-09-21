import { MapPin } from "lucide-react";
import { site } from "@/lib/site";
import { whatsappDisplay, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/widgets/whatsapp-icon";

/**
 * Google Maps location card and contact details. The map uses the
 * keyless embed (query + output=embed), lazy loaded so it never costs
 * the initial payload. No API key, no third-party script.
 */
export function MapCard() {
  const q = encodeURIComponent(site.address);
  const embedSrc = `https://www.google.com/maps?q=${q}&z=14&output=embed`;

  return (
    <div className="map-card grid items-stretch gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="map-frame">
        <iframe
          src={embedSrc}
          title={`Map to ${site.legalName}, ${site.address}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <address className="map-details flex flex-col justify-center gap-6 not-italic">
        <div>
          <p className="label-caps text-accent-deep">The yard</p>
          <p className="mt-2 text-[1.05rem] leading-relaxed">{site.address}</p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-type mt-2 inline-flex items-center gap-1.5 text-[0.92rem]"
          >
            <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Open in Google Maps
          </a>
        </div>
        <div className="hair-t pt-6">
          <p className="label-caps text-accent-deep">Talk to us</p>
          <ul className="mt-2 grid gap-1.5 text-[1.02rem]">
            <li>
              <a href={`tel:${site.phoneHref}`} className="link-type tnum">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(site.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="link-type inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden />
                <span className="tnum">{whatsappDisplay()}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="link-type break-all">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </address>
    </div>
  );
}
