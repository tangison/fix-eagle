"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export type CarouselItem = {
  entity: string;
  line: string;
  photo: string;
  alt: string;
  period?: string;
  href?: string;
};

/**
 * Photo card carousel: embla track, circular prev and next arrows in the
 * Collins register, gold active dot pagination. Cards link to the case
 * study register by default.
 */
export function PhotoCarousel({ items }: { items: readonly CarouselItem[] }) {
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
    // Canonical embla + React pattern: the API only exists after mount,
    // so sync state from it here and on every select / reInit.
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
      {/* Controls above the track: dots left, arrows right, so the
          carousel is discoverable before the first swipe. */}
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
            aria-label="Previous case studies"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ArrowLeft className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            className="carousel-arrow"
            disabled={nextDisabled}
            aria-label="Next case studies"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ArrowRight className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-track -mx-[var(--gutter)] px-[var(--gutter)]">
          {items.map((item) => (
            <div className="carousel-slide" key={item.entity}>
              <Link
                href={item.href ?? "/case-studies"}
                className="case-card group block"
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.photo}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 72rem) 33vw, (min-width: 48rem) 50vw, 100vw"
                    className="object-cover transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block p-5">
                  {item.period ? (
                    <span className="caption tnum">{item.period}</span>
                  ) : null}
                  <span className="case-entity mt-1 block">{item.entity}</span>
                  <span className="case-line line-clamp-2 block">
                    {item.line}
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
