"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";

type Step = {
  name: string;
  body: string;
};

/**
 * Numbered process tabs, Target register: one trigger per step, the
 * active step underlined in gold, the body set large in the panel.
 */
export function ProcessTabs({ steps }: { steps: readonly Step[] }) {
  return (
    <TabsPrimitive.Root defaultValue={`step-0`}>
      <TabsPrimitive.List className="tab-list" aria-label="Process steps">
        {steps.map((step, i) => (
          <TabsPrimitive.Trigger
            key={step.name}
            value={`step-${i}`}
            className="tab-trigger"
          >
            <span className="tnum mr-2 text-[0.82em] text-accent-deep">
              {String(i + 1).padStart(2, "0")}
            </span>
            {step.name}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {steps.map((step, i) => (
        <TabsPrimitive.Content
          key={step.name}
          value={`step-${i}`}
          className="tab-panel pt-10 md:pt-14"
        >
          <p className="label-caps tnum text-accent-deep">
            Step {String(i + 1).padStart(2, "0")} of{" "}
            {String(steps.length).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)]">{step.name}</h3>
          <p className="measure mt-6 max-w-[52ch] text-[1.08rem] leading-relaxed text-soft">
            {step.body}
          </p>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
