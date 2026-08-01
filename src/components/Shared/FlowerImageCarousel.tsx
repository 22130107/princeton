"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import svgPaths from "@/components/Home/svg-g45k1n1pz5";
import imgFlowerMask from "@/assets/92e5ee994003ec00eae4b6020ca15de704cd6220.png";
import imgBackground3 from "@/assets/bcdc4bfb11a672185bf5895542f616cb4b9244ae.png";

export type FlowerCarouselImage = {
  id: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
};

function FlowerStroke() {
  return (
    <svg
      className="absolute inset-0 size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 328 328"
      aria-hidden
    >
      <path
        d={svgPaths.p1e6bf430}
        fill="#FFFEFA"
        stroke="#B80000"
        strokeDasharray="4 8"
        strokeWidth="2"
      />
    </svg>
  );
}

function FlowerCard({ image }: { image: FlowerCarouselImage }) {
  return (
    <div className="content-stretch flex flex-col items-start pr-[40px] relative shrink-0" data-name="Margin">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Container">
        <div
          className="-translate-x-1/2 absolute aspect-[324/324] bg-white bottom-0 left-1/2"
          style={{
            maskImage: `url("${imgBackground3.src}")`,
            WebkitMaskImage: `url("${imgBackground3.src}")`,
            maskSize: "324px 324px",
            WebkitMaskSize: "324px 324px",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
        <div className="-translate-x-1/2 absolute aspect-[328/328] bottom-[-3.25%] content-stretch flex flex-col items-center justify-center left-1/2 overflow-clip top-[-3.25%]" data-name="Image">
          <FlowerStroke />
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
          <div className="max-w-[308px] relative shrink-0 size-[308px]" data-name="Img:mask-group">
            <div
              className="absolute left-0 size-[308px] top-0"
              style={{
                maskImage: `url("${imgFlowerMask.src}")`,
                WebkitMaskImage: `url("${imgFlowerMask.src}")`,
                maskSize: "308px 308px",
                WebkitMaskSize: "308px 308px",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
              data-name={image.title || "flower-image"}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  alt={image.imageAlt || image.title}
                  className="absolute inset-0 size-full scale-[1.3] object-cover"
                  src={image.imageUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlowerImageCarousel({ images }: { images: FlowerCarouselImage[] }) {
  const divRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const totalX = useRef(-400);
  const dragStartX = useRef(0);
  const dragBaseX = useRef(-400);
  const ITEM_WIDTH = 348;

  const baseImages = useMemo(() => {
    if (!images.length) return [];
    const minimumItems = Math.max(5, images.length);
    return Array.from({ length: Math.ceil(minimumItems / images.length) }, () => images)
      .flat()
      .slice(0, minimumItems);
  }, [images]);
  const repeatedImages = useMemo(() => [...baseImages, ...baseImages, ...baseImages, ...baseImages], [baseImages]);
  const setWidth = ITEM_WIDTH * Math.max(baseImages.length, 1);

  useEffect(() => {
    if (!repeatedImages.length) return;

    let lastTime = performance.now();
    const SPEED = 40;
    let rafId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (divRef.current) observer.observe(divRef.current);

    function tick(time: number) {
      if (isVisible) {
        const dt = (time - lastTime) / 1000;
        lastTime = time;
        if (!isDragging.current) {
          totalX.current -= SPEED * dt;
          if (totalX.current < -(setWidth * 3)) {
            totalX.current += setWidth * 3;
          }
        }
        if (divRef.current) {
          divRef.current.style.transform = `translate3d(${totalX.current}px, 0, 0)`;
        }
      } else {
        lastTime = time;
      }
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [repeatedImages.length, setWidth]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    dragBaseX.current = totalX.current;
    dragStartX.current = e.clientX;
    if (divRef.current) {
      divRef.current.style.cursor = "grabbing";
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    totalX.current = dragBaseX.current + (e.clientX - dragStartX.current);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      if (divRef.current) {
        divRef.current.style.cursor = "grab";
      }
    }
  }, []);

  return (
    <div className="relative h-[332px] overflow-hidden w-full">
      <div
        ref={divRef}
        className="absolute flex left-0 top-[12px] cursor-grab select-none"
        data-name="Container"
        style={{ transform: "translate3d(-400px, 0, 0)", willChange: "transform" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {repeatedImages.map((image, index) => (
          <FlowerCard key={`${image.id}-${index}`} image={image} />
        ))}
      </div>
    </div>
  );
}
