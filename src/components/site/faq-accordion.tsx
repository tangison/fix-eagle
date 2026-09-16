"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";

export function FaqAccordion({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      className="w-full"
    >
      {items.map((item, i) => (
        <AccordionPrimitive.Item
          key={i}
          value={`item-${i}`}
          className="faq-item"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="faq-trigger">
              <span className="text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] md:text-[1.4rem]">
                {item.q}
              </span>
              <span className="faq-sign" aria-hidden>
                +
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="faq-content">
            <p className="measure pb-7 text-soft">{item.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
