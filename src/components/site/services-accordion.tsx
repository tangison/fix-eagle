"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { site } from "@/lib/site";

type ServiceItem = {
  id: string;
  name: string;
  summary: string;
  detail: string;
};

/**
 * Services accordion: number and name on the trigger row, the summary
 * and detail inside. Keeps the page scannable instead of text-heavy.
 */
export function ServicesAccordion({
  items,
}: {
  items: readonly ServiceItem[];
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className="w-full"
    >
      {items.map((service, i) => (
        <AccordionPrimitive.Item
          key={service.id}
          value={service.id}
          id={service.id}
          className="faq-item scroll-mt-28"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="faq-trigger">
              <span className="flex items-baseline gap-5">
                <span className="label-caps tnum text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-left text-[clamp(1.25rem,2.4vw,1.7rem)] font-semibold leading-snug tracking-[-0.01em] text-inherit">
                  {service.name}
                </span>
              </span>
              <span className="faq-sign" aria-hidden>
                +
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="faq-content">
            <div className="pb-8 pl-0 md:pl-[4.1rem]">
              <p className="measure text-[1.02rem] leading-relaxed">
                {service.summary}
              </p>
              <p className="measure mt-4 text-soft">{service.detail}</p>
              <p className="mt-5">
                <a
                  href={site.whatsapp}
                  className="link-type text-[0.92rem]"
                >
                  Discuss this service
                </a>
              </p>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
