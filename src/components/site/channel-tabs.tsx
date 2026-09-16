"use client";

import Image from "next/image";
import * as TabsPrimitive from "@radix-ui/react-tabs";

type Channel = {
  name: string;
  body: string;
  photo: string;
  alt: string;
  caption: string;
};

/**
 * Sale channel tabs, Target register: underline triggers with a gold
 * active bar, each panel pairing a photograph with a short body.
 */
export function ChannelTabs({ channels }: { channels: readonly Channel[] }) {
  return (
    <TabsPrimitive.Root defaultValue={channels[0].name}>
      <TabsPrimitive.List
        className="tab-list"
        aria-label="Ways to sell"
      >
        {channels.map((channel) => (
          <TabsPrimitive.Trigger
            key={channel.name}
            value={channel.name}
            className="tab-trigger"
          >
            {channel.name}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {channels.map((channel) => (
        <TabsPrimitive.Content
          key={channel.name}
          value={channel.name}
          className="tab-panel pt-10 md:pt-14"
        >
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--r-card)]">
              <Image
                src={channel.photo}
                alt={channel.alt}
                fill
                sizes="(min-width: 48rem) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-[clamp(1.5rem,2.6vw,2.1rem)]">
                {channel.name}
              </h3>
              <p className="measure mt-5 text-[1.02rem] leading-relaxed text-soft">
                {channel.body}
              </p>
              <p className="caption mt-4">{channel.caption}</p>
            </div>
          </div>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
