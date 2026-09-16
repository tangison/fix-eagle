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
              <span className="font-serif text-[1.35rem] font-medium leading-snug md:text-[1.5rem]">
                {item.q}
              </span>
              <span className="faq-sign" aria-hidden>
                +
              </span>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="faq-content">
            <p className="measure pb-7 text-muted">{item.a}</p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
