"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { whatsappLink } from "@/lib/whatsapp";

type Errors = { name?: string; contact?: string };

/**
 * Bid-interest / enquiry form. Client validation, then the route
 * handler at /api/enquiry validates again server side and logs the
 * enquiry. The response carries a WhatsApp handoff URL composed from
 * the enquiry, so the lead lands in the client's primary channel, the
 * same WhatsApp-first flow the contact page uses.
 */
export function EnquiryForm({
  defaultVehicleSlug,
  compact = false,
}: {
  defaultVehicleSlug?: string;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [vehicleSlug, setVehicleSlug] = useState(defaultVehicleSlug ?? "");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [handoff, setHandoff] = useState<string | null>(null);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) {
      next.name = "Please tell us your name so we know who we are speaking to.";
    }
    const c = contact.trim();
    if (!c) {
      next.contact =
        "Leave a phone number or an email so we can come back to you.";
    } else {
      const isPhone = /^[+\d][\d\s()-]{5,}$/.test(c);
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
      if (!isPhone && !isEmail) {
        next.contact =
          "That does not look complete. Use a phone number such as +264 81 000 0000, or an email address.";
      }
    }
    return next;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          vehicleSlug: vehicleSlug || null,
          message: message.trim() || null,
          website,
        }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as { whatsappUrl?: string };
      setHandoff(data.whatsappUrl ?? null);
      setState("done");
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      // The WhatsApp handoff still works without the API: compose locally.
      setHandoff(
        whatsappLink(
          composeMessage(name.trim(), contact.trim(), vehicleSlug, message.trim())
        )
      );
      setState("done");
    }
  }

  const vehicle = vehicles.find((v) => v.slug === vehicleSlug);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-7">
      {/* Honeypot: humans never see this field */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className={compact ? "grid gap-7" : "grid gap-7 md:grid-cols-2 md:gap-8"}>
        <div>
          <label htmlFor="ef-name" className="field-label">
            Name
          </label>
          <input
            id="ef-name"
            name="name"
            type="text"
            autoComplete="name"
            className="field-input"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "ef-name-error" : undefined}
          />
          <p id="ef-name-error" className="field-error" role={errors.name ? "alert" : undefined}>
            {errors.name ?? ""}
          </p>
        </div>
        <div>
          <label htmlFor="ef-contact" className="field-label">
            Phone or email
          </label>
          <input
            id="ef-contact"
            name="contact"
            type="text"
            autoComplete="tel"
            className="field-input"
            placeholder="+264 81 000 0000"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={errors.contact ? "ef-contact-error" : undefined}
          />
          <p
            id="ef-contact-error"
            className="field-error"
            role={errors.contact ? "alert" : undefined}
          >
            {errors.contact ?? ""}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="ef-vehicle" className="field-label">
          I am interested in
        </label>
        <select
          id="ef-vehicle"
          name="vehicle"
          className="field-input"
          value={vehicleSlug}
          onChange={(e) => setVehicleSlug(e.target.value)}
        >
          <option value="">A general enquiry or valuation</option>
          {vehicles.map((v) => (
            <option key={v.slug} value={v.slug}>
              {v.title}
              {v.status === "auction" ? " (auction)" : ""}
            </option>
          ))}
        </select>
        <p className="field-error" aria-hidden>
          &nbsp;
        </p>
      </div>

      <div>
        <label htmlFor="ef-message" className="field-label">
          Message, optional
        </label>
        <textarea
          id="ef-message"
          name="message"
          rows={compact ? 3 : 5}
          className="field-input resize-y"
          placeholder={
            vehicle
              ? `Ask us anything about the ${vehicle.title}: condition, papers, delivery`
              : "Tell us about the assets you would like to sell or bid on"
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send the enquiry"}
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </button>
        <p className="text-[0.85rem] text-soft">
          We receive it, log it, and open WhatsApp with your enquiry prefilled.
          Nothing else is stored.
        </p>
      </div>

      {state === "done" ? (
        <p className="ef-done" role="status">
          Thank you, {name.split(" ")[0]}. Your enquiry is noted.
          {handoff ? (
            <>
              {" "}
              WhatsApp did not open?{" "}
              <a href={handoff} target="_blank" rel="noopener noreferrer" className="link-type">
                Tap here to send it
              </a>
              .
            </>
          ) : null}
        </p>
      ) : null}
    </form>
  );
}

function composeMessage(
  name: string,
  contact: string,
  vehicleSlug: string,
  message: string
): string {
  const lines = [
    "Hello Fix Eagle, I sent an enquiry from your website.",
    `Name: ${name}`,
    `Contact: ${contact}`,
  ];
  if (vehicleSlug) lines.push(`Interested in: /vehicles/${vehicleSlug}`);
  if (message) lines.push(`Message: ${message}`);
  return lines.join("\n");
}
