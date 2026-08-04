"use client";

export function CoverImage({
  src,
  alt,
  zoom,
  position,
}: {
  src: string;
  alt: string;
  zoom: number;
  position: string;
  frameAspect?: number;
}) {
  return (
    <span className="absolute inset-0 block overflow-hidden" role="img" aria-label={alt}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 size-full object-cover select-none pointer-events-none"
        style={{
          objectPosition: position,
          transform: `scale(${zoom})`,
          transformOrigin: position,
        }}
      />
    </span>
  );
}
