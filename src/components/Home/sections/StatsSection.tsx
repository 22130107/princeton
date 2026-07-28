"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import svgPaths from "../svg-g45k1n1pz5";
import imgFlowerMask from "../../../assets/92e5ee994003ec00eae4b6020ca15de704cd6220.png";
import imgBackground3 from "../../../assets/bcdc4bfb11a672185bf5895542f616cb4b9244ae.png";

type FacilityImage = {
  id: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
};

function FacilityBgSvg() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[492px] left-1/2 overflow-hidden top-1/2 w-[2267.161px]" data-name="facility-bg.svg">
      <div className="animate-slide-wass will-change-transform size-full">
        <svg className="absolute block inset-0 size-full" fill="none" height="492" preserveAspectRatio="none" viewBox="0 0 2267.16 492" width="2267.16">
          <g clipPath="url(#clip0_1_967)" id="facility-bg.svg">
            <g id="Group" opacity="0.5">
              <path d={svgPaths.p3daf1800} fill="var(--fill-0, #FFE4E4)" id="Vector" />
              <path d={svgPaths.p1a050d80} fill="var(--fill-0, #FFE4E4)" id="Vector_2" />
              <path d={svgPaths.p1197a0f2} fill="var(--fill-0, #FFE4E4)" id="Vector_3" />
              <path d={svgPaths.p36504f0} fill="var(--fill-0, #FFE4E4)" id="Vector_4" />
              <path d={svgPaths.p10e89c00} fill="var(--fill-0, #FFE4E4)" id="Vector_5" />
              <path d={svgPaths.p15e100} fill="var(--fill-0, #FFE4E4)" id="Vector_6" />
              <path d={svgPaths.p127e7080} fill="var(--fill-0, #FFE4E4)" id="Vector_7" />
              <path d={svgPaths.p31827600} fill="var(--fill-0, #FFE4E4)" id="Vector_8" />
              <path d={svgPaths.p3adb3780} fill="var(--fill-0, #FFE4E4)" id="Vector_9" />
              <path d={svgPaths.p230e2a80} fill="var(--fill-0, #FFE4E4)" id="Vector_10" />
            </g>
            <path d={svgPaths.p34fde100} fill="var(--fill-0, #F2A8B5)" id="Vector_11" />
            <path d={svgPaths.p1d878b80} fill="var(--fill-0, #F2A8B5)" id="Vector_12" />
            <path d={svgPaths.p2a338440} fill="var(--fill-0, #F2A8B5)" id="Vector_13" />
            <path d={svgPaths.p2dd7a880} fill="var(--fill-0, #F7D774)" id="Vector_14" />
            <path d={svgPaths.pbd96c00} fill="var(--fill-0, #F7D774)" id="Vector_15" />
            <path d={svgPaths.p8510800} fill="var(--fill-0, #F7D774)" id="Vector_16" />
            <path d={svgPaths.pb2fc400} fill="var(--fill-0, #F7D774)" id="Vector_17" />
            <path d={svgPaths.p1b551a80} fill="var(--fill-0, #ADA8F2)" id="Vector_18" />
            <path d={svgPaths.p1874f780} fill="var(--fill-0, #ADA8F2)" id="Vector_19" />
            <path d={svgPaths.p1fffd480} fill="var(--fill-0, #ADA8F2)" id="Vector_20" />
            <path d={svgPaths.p17edc100} fill="var(--fill-0, #F7D774)" id="Vector_21" />
            <path d={svgPaths.p32a3b800} fill="var(--fill-0, #F7D774)" id="Vector_22" />
            <path d={svgPaths.p56d900} fill="var(--fill-0, #F7D774)" id="Vector_23" />
            <path d={svgPaths.pc66c080} fill="var(--fill-0, #F7D774)" id="Vector_24" />
            <path d={svgPaths.p3d711380} fill="var(--fill-0, #F7D774)" id="Vector_25" />
            <path d={svgPaths.p2d416600} fill="var(--fill-0, #F7D774)" id="Vector_26" />
            <path d={svgPaths.p2825be00} fill="var(--fill-0, #30A79D)" id="Vector_27" />
            <path d={svgPaths.p30a818f0} fill="var(--fill-0, #30A79D)" id="Vector_28" />
            <path d={svgPaths.p30ee7f00} fill="var(--fill-0, #30A79D)" id="Vector_29" />
            <path d={svgPaths.p1f28a000} fill="var(--fill-0, #F7D774)" id="Vector_30" />
            <path d={svgPaths.pe360600} fill="var(--fill-0, #F7D774)" id="Vector_31" />
            <path d={svgPaths.p18916800} fill="var(--fill-0, #F7D774)" id="Vector_32" />
            <path d={svgPaths.p35a44800} fill="var(--fill-0, #FF8800)" id="Vector_33" />
          </g>
          <defs>
            <clipPath id="clip0_1_967">
              <rect fill="white" height="492" width="2267.16" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[-2.6%] left-1/2 top-[-2.6%] w-[324px]" data-name="Mask Group">
      <div
        className="-translate-x-1/2 absolute aspect-[324/324] bg-white bottom-0 left-1/2 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[324px_324px] top-0"
        style={{ maskImage: `url("${imgBackground3.src}")` }}
        data-name="Background"
      />
    </div>
  );
}

function FacilityStrokeSvg() {
  return (
    <div className="relative shrink-0 size-[328px]" data-name="facility-stroke.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="328" preserveAspectRatio="none" viewBox="0 0 328 328" width="328">
        <g clipPath="url(#clip0_1_1008)" id="facility-stroke.svg">
          <path d={svgPaths.p1e6bf430} fill="var(--fill-0, #FFFEFA)" id="Vector" stroke="var(--stroke-0, #B80000)" strokeDasharray="4 8" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_1008">
            <rect fill="white" height="328" width="328" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FacilityImageCard({ image }: { image: FacilityImage }) {
  return (
    <div className="content-stretch flex flex-col items-start pr-[40px] relative shrink-0" data-name="Margin">
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Container">
        <MaskGroup />
        <div className="-translate-x-1/2 absolute aspect-[328/328] bottom-[-3.25%] content-stretch flex flex-col items-center justify-center left-1/2 overflow-clip top-[-3.25%]" data-name="Image">
          <FacilityStrokeSvg />
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
          <div className="max-w-[308px] relative shrink-0 size-[308px]" data-name="Img:mask-group">
            <div
              className="absolute left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[308px_308px] size-[308px] top-0"
              style={{ maskImage: `url("${imgFlowerMask.src}")` }}
              data-name={image.title || "facility-image"}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt={image.imageAlt || image.title} className="absolute h-full left-[-25.02%] max-w-none top-0 w-[150.04%]" src={image.imageUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container146({ images }: { images: FacilityImage[] }) {
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
        <FacilityImageCard key={`${image.id}-${index}`} image={image} />
      ))}
    </div>
  );
}

function Container145({ images }: { images: FacilityImage[] }) {
  return (
    <div className="h-[332px] overflow-clip relative shrink-0 w-[1528px]" data-name="Container">
      <Container146 images={images} />
    </div>
  );
}

export default function StatsSection() {
  const [images, setImages] = useState<FacilityImage[]>([]);

  useEffect(() => {
    let alive = true;

    fetch("/api/facility-images")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.images)) return;
        setImages(data.images.filter((image: FacilityImage) => image.imageUrl));
      })
      .catch(() => {
        if (alive) setImages([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip py-[80px] right-0 top-[7910.35px]" data-name="Section">
      <FacilityBgSvg />
      <Container145 images={images} />
    </div>
  );
}
