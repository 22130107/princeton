"use client";

import { useEffect, useState } from "react";

export function useNaturalAspect(src: string | undefined, fallback: number) {
  const [state, setState] = useState<{ aspect: number; loaded: boolean }>({
    aspect: fallback,
    loaded: false,
  });

  useEffect(() => {
    if (!src) return;
    let alive = true;
    setState({ aspect: fallback, loaded: false });
    const image = new window.Image();
    image.onload = () => {
      if (alive && image.naturalWidth > 0 && image.naturalHeight > 0) {
        setState({ aspect: image.naturalWidth / image.naturalHeight, loaded: true });
      } else if (alive) {
        setState({ aspect: fallback, loaded: true });
      }
    };
    image.onerror = () => {
      if (alive) setState({ aspect: fallback, loaded: true });
    };
    image.src = src;
    return () => {
      alive = false;
    };
  }, [src, fallback]);

  return state;
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
  const { aspect: naturalAspect, loaded } = useNaturalAspect(src, frameAspect);

  if (!loaded) {
    return (
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 size-full object-cover"
        style={{ objectPosition: position }}
      />
    );
  }

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
