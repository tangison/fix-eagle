import Image from "next/image";

/**
 * Photographic register figure: full-bleed or contained image with a
 * provenance caption (dates, places) set underneath, outside the image.
 */
export function PhotoFigure({
  src,
  alt,
  caption,
  priority = false,
  sizes = "(min-width: 90rem) 1440px, 100vw",
  ratio = "aspect-[3/2]",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden ${ratio}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="caption mt-3">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
