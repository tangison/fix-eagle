"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Vehicle image gallery: one main frame with thumbnail rail when there
 * is more than one photo. Reserved aspect ratio, so there is never a
 * layout shift while the images stream in.
 */
export function VehicleGallery({
  images,
  title,
  badge,
}: {
  images: string[];
  title: string;
  badge?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const many = images.length > 1;

  return (
    <div className="vehicle-gallery">
      <div className="gallery-main">
        {badge ? <div className="absolute left-4 top-4 z-10">{badge}</div> : null}
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${title}, photo ${index + 1} of ${images.length}, at the Fix Eagle yard in Windhoek`}
          fill
          priority
          quality={82}
          sizes="(min-width: 72rem) 60vw, 100vw"
          className="object-cover"
        />
        {many ? (
          <>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-prev"
              aria-label="Previous photo"
              onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-next"
              aria-label="Next photo"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </>
        ) : null}
      </div>
      {many ? (
        <div className="gallery-thumbs" role="tablist" aria-label="Photo selector">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Photo ${i + 1}`}
              className="gallery-thumb"
              data-active={i === index}
              onClick={() => setIndex(i)}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
