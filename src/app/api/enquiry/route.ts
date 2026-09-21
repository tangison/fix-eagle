import { NextResponse } from "next/server";
import { z } from "zod";
import { vehicleBySlug } from "@/data/vehicles";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Enquiry / bid-interest intake. Validates server side, logs the
 * enquiry (no email infrastructure is configured on this deployment,
 * so the log is the record), and returns a WhatsApp handoff URL with
 * the full enquiry prefilled so the lead lands in the client's
 * primary channel immediately. Nothing is persisted on the site.
 */

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  contact: z
    .string()
    .trim()
    .min(5)
    .max(160)
    .refine(
      (value) =>
        /^[+\d][\d\s()-]{5,}$/.test(value) ||
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value),
      { message: "Contact must be a phone number or an email address" }
    ),
  vehicleSlug: z.string().trim().max(120).nullable().optional(),
  message: z.string().trim().max(4000).nullable().optional(),
  /** Honeypot: real users never fill this. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 }
    );
  }

  const { name, contact, vehicleSlug, message } = parsed.data;
  const vehicle = vehicleSlug ? vehicleBySlug(vehicleSlug) : undefined;

  const record = {
    receivedAt: new Date().toISOString(),
    name,
    contact,
    vehicle: vehicle ? { slug: vehicle.slug, title: vehicle.title } : null,
    message: message ?? null,
    source: vehicle ? `website /vehicles/${vehicle.slug}` : "website general",
  };

  // The record: structured log until an email or CRM endpoint is wired in.
  console.log("[enquiry]", JSON.stringify(record));

  const lines = [
    "Hello Fix Eagle, enquiry from the website:",
    `Name: ${name}`,
    `Contact: ${contact}`,
    vehicle ? `Interested in: ${vehicle.title} (https://fixeagleinvestments.com/vehicles/${vehicle.slug})` : "Interested in: a general enquiry or valuation",
    message ? `Message: ${message}` : null,
  ].filter(Boolean);

  return NextResponse.json({
    ok: true,
    receivedAt: record.receivedAt,
    whatsappUrl: whatsappLink(lines.join("\n")),
  });
}
