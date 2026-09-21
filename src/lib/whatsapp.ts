/**
 * WhatsApp helpers. The business number lives in the environment
 * (NEXT_PUBLIC_WHATSAPP_NUMBER, international format, digits only) so it
 * can be rotated without touching the code. The fallback matches the
 * number published across the site and company profile (+264 81 864 6808).
 */
export const WHATSAPP_FALLBACK = "264818646808";

export function whatsappNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? WHATSAPP_FALLBACK;
  return raw.replace(/\D/g, "");
}

/** wa.me deep link with an optional prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${whatsappNumber()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Prefilled enquiry for a specific vehicle. */
export function vehicleEnquiryLink(vehicleTitle: string, slug: string): string {
  return whatsappLink(
    `Hello Fix Eagle, I would like to enquire about the ${vehicleTitle} listed on your website: /vehicles/${slug}`
  );
}

/** Human display form, e.g. +264 81 864 6808. */
export function whatsappDisplay(): string {
  const n = whatsappNumber();
  if (n.length < 9) return `+${n}`;
  // Namibian numbers: 264 + 9 digits, conventionally +264 81 864 6808.
  if (n.startsWith("264") && n.length === 12) {
    const rest = n.slice(3);
    return `+264 ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5)}`;
  }
  // Generic international fallback: +CC then groups.
  const cc = n.slice(0, 2);
  const rest = n.slice(2);
  const groups = rest.match(/.{1,3}/g) ?? [rest];
  return `+${cc} ${groups.join(" ")}`;
}
