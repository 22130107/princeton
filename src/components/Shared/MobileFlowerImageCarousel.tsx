"use client";

import svgPaths from "@/components/Home/svg-g45k1n1pz5";
import imgFlowerMask from "@/assets/92e5ee994003ec00eae4b6020ca15de704cd6220.png";
import type { FlowerCarouselImage } from "@/components/Shared/FlowerImageCarousel";

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

function MobileFlowerCard({ image }: { image: FlowerCarouselImage }) {
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

export function MobileFlowerImageCarousel({ images }: { images: FlowerCarouselImage[] }) {
  const baseImages = images.length
    ? Array.from({ length: Math.ceil(Math.max(5, images.length) / images.length) }, () => images)
        .flat()
        .slice(0, Math.max(5, images.length))
    : [];
  const repeated = [...baseImages, ...baseImages, ...baseImages];

  return (
    <div className="relative h-[256px] overflow-hidden">
      <style>{`
        @keyframes mobile-flower-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-1380px); }
        }
      `}</style>
      {repeated.length ? (
        <div
          className="absolute left-[-118px] top-2 flex gap-10"
          style={{
            animation: "mobile-flower-slide 30s linear infinite",
            willChange: "transform",
          }}
        >
          {repeated.map((image, index) => (
            <MobileFlowerCard key={`${image.id}-${index}`} image={image} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
