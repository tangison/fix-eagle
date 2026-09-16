"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { assetTypes, regions, site } from "@/lib/site";

type Errors = { name?: string; phone?: string };

/**
 * WhatsApp-first enquiry composer. The form builds a prefilled WhatsApp
 * message and hands off to the client's primary channel. No data is stored
 * on this site.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [assetType, setAssetType] = useState<string>(assetTypes[0]);
  const [region, setRegion] = useState<string>(regions[5]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) {
      next.name = "Please tell us your name so we know who we are speaking to.";
    }
    if (phone.trim() && !/^[+\d][\d\s()-]{5,}$/.test(phone.trim())) {
      next.phone =
        "That phone number does not look complete. Include the country code, for example +264 81 000 0000.";
    }
    return next;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const lines = [
      `Name: ${name.trim()}`,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      `Asset type: ${assetType}`,
      `Region: ${region}`,
      message.trim() ? `Message: ${message.trim()}` : null,
    ].filter(Boolean) as string[];

    const url = `${site.whatsapp}?text=${encodeURIComponent(
      `Hello Fix Eagle, I would like to enquire about your services.\n\n${lines.join("\n")}`
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-7">
      <div className="grid gap-7 md:grid-cols-2 md:gap-8">
        <div>
          <label htmlFor="cf-name" className="field-label">
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            className="field-input"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
          />
          <p
            id="cf-name-error"
            className="field-error"
            role={errors.name ? "alert" : undefined}
          >
            {errors.name ?? ""}
          </p>
        </div>
        <div>
          <label htmlFor="cf-phone" className="field-label">
            Phone, optional
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field-input"
            placeholder="+264 81 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "cf-phone-error" : undefined}
          />
          <p
            id="cf-phone-error"
            className="field-error"
            role={errors.phone ? "alert" : undefined}
          >
            {errors.phone ?? ""}
          </p>
        </div>
        <div>
          <label htmlFor="cf-asset" className="field-label">
            Asset type
          </label>
          <select
            id="cf-asset"
            name="assetType"
            className="field-input"
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            {assetTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <p className="field-error" aria-hidden>
            &nbsp;
          </p>
        </div>
        <div>
          <label htmlFor="cf-region" className="field-label">
            Region
          </label>
          <select
            id="cf-region"
            name="region"
            className="field-input"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <p className="field-error" aria-hidden>
            &nbsp;
          </p>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="field-label">
          Message, optional
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          className="field-input resize-y"
          placeholder="Tell us about the assets you would like valued or sold"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="btn">
          Send on WhatsApp
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </button>
        <p className="text-[0.85rem] text-soft">
          Opens WhatsApp with your message prefilled. Nothing is stored on this
          site.
        </p>
      </div>
    </form>
  );
}
