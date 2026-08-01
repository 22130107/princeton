"use client";

import { useEffect, useState } from "react";

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
  zoom,
  position,
  frameAspect,
}: {
  src: string;
  alt: string;
  zoom: number;
  position: string;
  frameAspect: number;
}) {
  const naturalAspect = useNaturalAspect(src, frameAspect);
  const ratioW = zoom >= 1 ? Math.max(1, naturalAspect / frameAspect) : Math.min(1, naturalAspect / frameAspect);
  const ratioH = zoom >= 1 ? Math.max(1, frameAspect / naturalAspect) : Math.min(1, frameAspect / naturalAspect);

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
