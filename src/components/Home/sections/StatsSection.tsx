"use client";

import { useEffect, useState } from "react";
import svgPaths from "../svg-g45k1n1pz5";
import { FlowerImageCarousel, type FlowerCarouselImage } from "@/components/Shared/FlowerImageCarousel";

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

export default function StatsSection() {
  const [images, setImages] = useState<FlowerCarouselImage[]>([]);

  useEffect(() => {
    let alive = true;

    fetch("/api/facility-images")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.images)) return;
        const nextImages = data.images
          .map((item: any) => ({
            id: item.id,
            title: item.title || item.imageAlt || "Cơ sở vật chất",
            imageUrl: item.imageUrl,
            imageAlt: item.imageAlt || item.title || "Cơ sở vật chất Princeton",
          }))
          .filter((image: FlowerCarouselImage) => image.imageUrl);
        if (nextImages.length) setImages(nextImages);
      })
      .catch(() => {
        if (alive) setImages([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip py-[80px] right-0 top-[7450.35px]" data-name="Section">
      <FacilityBgSvg />
      <FlowerImageCarousel images={images} />
    </div>
  );
}
