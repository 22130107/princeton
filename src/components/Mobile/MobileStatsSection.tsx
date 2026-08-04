"use client";

import { useEffect, useState } from "react";
import svgPaths from "../Home/svg-g45k1n1pz5";
import { MobileFlowerImageCarousel } from "@/components/Shared/MobileFlowerImageCarousel";
import type { FlowerCarouselImage } from "@/components/Shared/FlowerImageCarousel";

export default function MobileStatsSection() {
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
    <section className="relative overflow-hidden bg-[#fffefa] py-10">
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[1380px] -translate-x-1/2 -translate-y-1/2 opacity-90">
        <svg className="size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2267.16 492" aria-hidden>
          <g>
            <path d={svgPaths.p3daf1800} fill="#F4D06F" />
            <path d={svgPaths.p1a050d80} fill="#F4D06F" />
            <path d={svgPaths.p1197a0f2} fill="#F4D06F" />
            <path d={svgPaths.p36504f0} fill="#F4D06F" />
            <path d={svgPaths.p10e89c00} fill="#F4D06F" />
            <path d={svgPaths.p15e100} fill="#F4D06F" />
            <path d={svgPaths.p127e7080} fill="#F4D06F" />
            <path d={svgPaths.p31827600} fill="#F4D06F" />
            <path d={svgPaths.p3adb3780} fill="#F4D06F" />
            <path d={svgPaths.p230e2a80} fill="#F4D06F" />
          </g>
          <path d={svgPaths.p34fde100} fill="#F2A8B5" />
          <path d={svgPaths.p1d878b80} fill="#F2A8B5" />
          <path d={svgPaths.p2a338440} fill="#F2A8B5" />
          <path d={svgPaths.p2dd7a880} fill="#F7D774" />
          <path d={svgPaths.pbd96c00} fill="#F7D774" />
          <path d={svgPaths.p8510800} fill="#F7D774" />
          <path d={svgPaths.pb2fc400} fill="#F7D774" />
          <path d={svgPaths.p1b551a80} fill="#ADA8F2" />
          <path d={svgPaths.p1874f780} fill="#ADA8F2" />
          <path d={svgPaths.p1fffd480} fill="#ADA8F2" />
          <path d={svgPaths.p17edc100} fill="#F7D774" />
          <path d={svgPaths.p32a3b800} fill="#F7D774" />
          <path d={svgPaths.p56d900} fill="#F7D774" />
          <path d={svgPaths.pc66c080} fill="#F7D774" />
          <path d={svgPaths.p3d711380} fill="#F7D774" />
          <path d={svgPaths.p2d416600} fill="#F7D774" />
          <path d={svgPaths.p2825be00} fill="#30A79D" />
          <path d={svgPaths.p30a818f0} fill="#30A79D" />
          <path d={svgPaths.p30ee7f00} fill="#30A79D" />
          <path d={svgPaths.p1f28a000} fill="#F7D774" />
          <path d={svgPaths.pe360600} fill="#F7D774" />
          <path d={svgPaths.p18916800} fill="#F7D774" />
          <path d={svgPaths.p35a44800} fill="#FF8800" />
        </svg>
      </div>

      <MobileFlowerImageCarousel images={images} />
    </section>
  );
}
