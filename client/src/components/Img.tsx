import { images, type ImageName } from "@/data/images";

type Format = "avif" | "webp";

export function imageSrc(name: ImageName, maxWidth = 1080, format: Format = "webp") {
  const { widths } = images[name];
  const width = [...widths].reverse().find((w) => w <= maxWidth) ?? widths[0];
  return `/images/${name}-${width}.${format}`;
}

export function imageSrcSet(name: ImageName, format: Format = "webp") {
  return images[name].widths.map((w) => `/images/${name}-${w}.${format} ${w}w`).join(", ");
}

type ImgProps = {
  name: ImageName;
  alt: string;
  /** Rendered width hint so the browser downloads the smallest adequate file. */
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Load immediately without raising fetch priority (e.g. images inside horizontally scrolling rows). */
  eager?: boolean;
  /** CSS object-position focal point for cropped (object-fit: cover) images, e.g. "50% 10%". */
  focus?: string;
};

/**
 * Responsive photo: AVIF with WebP fallback, and an inlined blurred preview painted as the
 * background so something appears instantly while the real file streams in.
 */
export function Img({ name, alt, sizes = "100vw", className, priority = false, eager = false, focus }: ImgProps) {
  const { w, h, blur } = images[name];
  return (
    <picture>
      <source type="image/avif" srcSet={imageSrcSet(name, "avif")} sizes={sizes} />
      <img
        src={imageSrc(name)}
        srcSet={imageSrcSet(name)}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        className={className}
        loading={priority || eager ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
        style={{
          backgroundImage: `url(${blur})`,
          backgroundSize: "cover",
          backgroundPosition: focus ?? "center",
          objectPosition: focus,
        }}
      />
    </picture>
  );
}
