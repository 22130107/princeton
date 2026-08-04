"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title: string | null;
}

export default function FacilityImageCarousel({ slides, isEn }: { slides: Slide[]; isEn: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  function assetSrc(image: string) {
    return image;
  }

  return (
    <figure className="relative order-2 lg:order-1 group">
      <div
        aria-hidden
        className="absolute inset-0 translate-x-1 translate-y-1 bg-[#991B1B]/10"
      />
      <div className="relative border-2 border-[#991B1B] bg-white">
        <div className="relative aspect-[1/1.12] overflow-hidden">
          <img
            key={currentSlide.image}
            src={assetSrc(currentSlide.image)}
            alt={currentSlide.title || "Facility"}
            className="h-full w-full object-cover animate-in fade-in duration-500"
          />
          {slides.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-3 md:px-4 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
              <button
                onClick={handlePrev}
                className="flex size-9 md:size-10 items-center justify-center rounded-full bg-white/90 text-[#991b1b] shadow-md backdrop-blur transition-all hover:bg-white hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5 md:size-6" />
              </button>
              <button
                onClick={handleNext}
                className="flex size-9 md:size-10 items-center justify-center rounded-full bg-white/90 text-[#991b1b] shadow-md backdrop-blur transition-all hover:bg-white hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="size-5 md:size-6" />
              </button>
            </div>
          )}
        </div>
        <div className="absolute bottom-12 left-[-18px] z-[2] w-[72%] md:bottom-16 md:left-[-24px] md:w-[68%]">
          <span
            aria-hidden
            className="absolute left-0 top-[-14px] h-[14px] w-[16px] bg-[#F4D06F] md:w-[22px]"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
            }}
          />
          <figcaption
            className="relative border-t-2 border-[#991B1B] bg-[#F4D06F] py-5 pl-10 pr-6 md:pl-12"
            style={{
              clipPath: "polygon(0 0, 100% 0, calc(100% - 38px) 100%, 0 100%)",
            }}
          >
          <span className="block max-w-[420px] text-[14px] font-medium italic leading-6 text-[#5d332b]">
            {currentSlide.title || (isEn ? "A carefully designed learning environment." : "Không gian được thiết kế tỉ mỉ, tối ưu cho việc học tập và sáng tạo.")}
          </span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
