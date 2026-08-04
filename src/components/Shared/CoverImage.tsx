"use client";

import { useEffect, useRef, useState } from "react";

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
  const boxRef = useRef<HTMLSpanElement>(null);
  const [boxAspect, setBoxAspect] = useState<number>(frameAspect);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth;
      const height = el.clientHeight;
      if (width > 0 && height > 0) {
        setBoxAspect(width / height);
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

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

  const scaleToFrame =
    zoom >= 1
      ? Math.max(1, frameAspect / naturalAspect)
      : Math.min(1, frameAspect / naturalAspect);
  const scaleFrameToBox = Math.max(1, boxAspect / frameAspect);

  return (
    <span
      ref={boxRef}
      className="absolute inset-0 block overflow-hidden"
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `url("${src}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${zoom * scaleToFrame * scaleFrameToBox * (naturalAspect / boxAspect) * 100}% ${zoom * scaleToFrame * scaleFrameToBox * 100}%`,
        backgroundPosition: position,
      }}
    />
  );
}
