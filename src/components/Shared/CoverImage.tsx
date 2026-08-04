"use client";

import { useId, useState, useEffect } from "react";

export function useNaturalAspect(src: string | undefined, fallback: number) {
  const [aspect, setAspect] = useState(fallback);

  useEffect(() => {
    if (!src) return;
    let alive = true;
    const image = new window.Image();
    image.onload = () => {
      if (alive && image.naturalWidth > 0 && image.naturalHeight > 0) {
        setAspect(image.naturalWidth / image.naturalHeight);
      }
    };
    image.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  return aspect;
}

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
  const baseAspect = frameAspect || 1;
  const naturalAspect = useNaturalAspect(src, baseAspect);

  if (mobileSrc) {
    const mZoom = mobileZoom ?? zoom;
    const mPos = mobilePosition ?? position;
    const ratioWMobile = mZoom >= 1 ? Math.max(1, naturalAspect / baseAspect) : Math.min(1, naturalAspect / baseAspect);
    const ratioHMobile = mZoom >= 1 ? Math.max(1, baseAspect / naturalAspect) : Math.min(1, baseAspect / naturalAspect);
    
    const ratioW = zoom >= 1 ? Math.max(1, naturalAspect / baseAspect) : Math.min(1, naturalAspect / baseAspect);
    const ratioH = zoom >= 1 ? Math.max(1, baseAspect / naturalAspect) : Math.min(1, baseAspect / naturalAspect);
    
    return (
      <span className="absolute inset-0 block overflow-hidden" role="img" aria-label={alt}>
        <style>{`
          .cover-img-${id} {
            background-image: url("${mobileSrc}");
            background-position: ${mPos};
            background-size: ${mZoom * ratioWMobile * 100}% ${mZoom * ratioHMobile * 100}%;
            background-repeat: no-repeat;
          }
          @media (min-width: 768px) {
            .cover-img-${id} {
              background-image: url("${src}");
              background-position: ${position};
              background-size: ${zoom * ratioW * 100}% ${zoom * ratioH * 100}%;
            }
          }
        `}</style>
        <span className={`absolute inset-0 block h-full w-full cover-img-${id}`} />
      </span>
    );
  }

  const ratioW = zoom >= 1 ? Math.max(1, naturalAspect / baseAspect) : Math.min(1, naturalAspect / baseAspect);
  const ratioH = zoom >= 1 ? Math.max(1, baseAspect / naturalAspect) : Math.min(1, baseAspect / naturalAspect);

  return (
    <span
      className="absolute inset-0 block overflow-hidden"
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `url("${src}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${zoom * ratioW * 100}% ${zoom * ratioH * 100}%`,
        backgroundPosition: position,
      }}
    />
  );
}
