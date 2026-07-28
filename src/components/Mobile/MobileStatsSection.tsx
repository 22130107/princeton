"use client";

import { useEffect, useState } from "react";
import svgPaths from "../Home/svg-g45k1n1pz5";
import imgFlowerMask from "../../assets/92e5ee994003ec00eae4b6020ca15de704cd6220.png";

type FacilityImage = {
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

function FacilityFlower({ image }: { image: FacilityImage }) {
  return (
    <div className="relative h-[236px] w-[236px] shrink-0">
      <FlowerStroke />
      <div
        className="absolute left-[10px] top-[10px] h-[216px] w-[216px] overflow-hidden bg-white"
        style={{
          maskImage: `url("${imgFlowerMask.src}")`,
          WebkitMaskImage: `url("${imgFlowerMask.src}")`,
          maskSize: "216px 216px",
          WebkitMaskSize: "216px 216px",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <img
          src={image.imageUrl}
          alt={image.imageAlt || image.title}
          className="h-full w-full scale-[1.35] object-cover"
        />
      </div>
    </div>
  );
}

export default function MobileStatsSection() {
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

  const baseImages = images.length
    ? Array.from({ length: Math.ceil(Math.max(5, images.length) / images.length) }, () => images)
        .flat()
        .slice(0, Math.max(5, images.length))
    : [];
  const repeated = [...baseImages, ...baseImages, ...baseImages];

  return (
    <section className="relative overflow-hidden bg-[#fffefa] py-10">
      <style>{`
        @keyframes mobile-facility-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-1380px); }
        }
      `}</style>

      <div className="absolute left-1/2 top-1/2 h-[300px] w-[1380px] -translate-x-1/2 -translate-y-1/2 opacity-90">
        <svg className="size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2267.16 492" aria-hidden>
          <g opacity="0.5">
            <path d={svgPaths.p3daf1800} fill="#FFE4E4" />
            <path d={svgPaths.p1a050d80} fill="#FFE4E4" />
            <path d={svgPaths.p1197a0f2} fill="#FFE4E4" />
            <path d={svgPaths.p36504f0} fill="#FFE4E4" />
            <path d={svgPaths.p10e89c00} fill="#FFE4E4" />
            <path d={svgPaths.p15e100} fill="#FFE4E4" />
            <path d={svgPaths.p127e7080} fill="#FFE4E4" />
            <path d={svgPaths.p31827600} fill="#FFE4E4" />
            <path d={svgPaths.p3adb3780} fill="#FFE4E4" />
            <path d={svgPaths.p230e2a80} fill="#FFE4E4" />
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

      <div className="relative h-[256px] overflow-hidden">
        {repeated.length ? (
          <div
            className="absolute left-[-118px] top-2 flex gap-10"
            style={{
              animation: "mobile-facility-slide 30s linear infinite",
              willChange: "transform",
            }}
          >
            {repeated.map((image, index) => (
              <FacilityFlower key={`${image.id}-${index}`} image={image} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
