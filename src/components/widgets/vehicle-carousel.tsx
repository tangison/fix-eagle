"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { VehicleCard } from "@/components/widgets/vehicle-card";
import type { Vehicle } from "@/data/vehicles";

/**
 * Latest stock carousel: the PhotoCarousel register applied to vehicle
 * cards. Embla track, circular arrows, gold active dots.
 */
export function VehicleCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Canonical embla + React pattern: the API only exists after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="tablist" aria-label="Carousel position">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              className="carousel-dot"
              data-active={i === selected}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="carousel-arrow"
            disabled={prevDisabled}
            aria-label="Previous vehicles"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ArrowLeft className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            className="carousel-arrow"
            disabled={nextDisabled}
            aria-label="Next vehicles"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ArrowRight className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-track -mx-[var(--gutter)] px-[var(--gutter)]">
          {vehicles.map((v) => (
            <div className="carousel-slide" key={v.slug}>
              <VehicleCard vehicle={v} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
