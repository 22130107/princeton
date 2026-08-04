"use client";

import { useId } from "react";

export function CoverImage({
  src,
  alt,
  zoom = 1,
  position = "50% 50%",
  frameAspect,
  mobileSrc,
  mobileZoom,
  mobilePosition,
  priority,
}: {
  src: string;
  alt: string;
  zoom?: number;
  position?: string;
  frameAspect?: number;
  mobileSrc?: string;
  mobileZoom?: number;
  mobilePosition?: string;
  priority?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const loading = priority ? undefined : "lazy";

  if (mobileSrc) {
    const mZoom = mobileZoom ?? zoom;
    const mPos = mobilePosition ?? position;
    const mObjectFit = mZoom >= 1 ? "cover" : "contain";
    const objectFit = zoom >= 1 ? "cover" : "contain";
    
    return (
      <span className="absolute inset-0 block overflow-hidden" role="img" aria-label={alt}>
        <style>{`
          .cover-img-${id} {
            object-fit: ${mObjectFit};
            object-position: ${mPos};
            transform: scale(${mZoom});
            transform-origin: ${mPos};
          }
          @media (min-width: 768px) {
            .cover-img-${id} {
              object-fit: ${objectFit};
              object-position: ${position};
              transform: scale(${zoom});
              transform-origin: ${position};
            }
          }
        `}</style>
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
          <img
            src={src}
            alt={alt}
            loading={loading}
            className={`absolute inset-0 size-full select-none pointer-events-none cover-img-${id}`}
          />
        </picture>
      </span>
    );
  }

  const objectFit = zoom >= 1 ? "cover" : "contain";

  return (
    <span className="absolute inset-0 block overflow-hidden" role="img" aria-label={alt}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className="absolute inset-0 size-full select-none pointer-events-none"
        style={{
          objectFit,
          objectPosition: position,
          transform: `scale(${zoom})`,
          transformOrigin: position,
        }}
      />
    </span>
  );
}
