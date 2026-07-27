"use client";

import type { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type FacilitySlide = {
  image: StaticImageData;
  title: string;
};

type FacilityCarouselProps = {
  slides: FacilitySlide[];
};

export default function FacilityCarousel({ slides }: FacilityCarouselProps) {
  const [active, setActive] = useState(0);

  const goTo = (index: number) => {
    setActive((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative overflow-hidden rounded-[28px] border-2 border-dashed border-white bg-[#fffefa] shadow-[6px_6px_0_rgba(98,0,0,0.12)]">
      <div className="relative h-[300px] md:h-[460px]">
        {slides.map((slide, index) => (
          <img
            key={slide.title}
            src={slide.image.src}
            alt={slide.title}
            className={`absolute inset-0 size-full object-cover transition-all duration-500 ease-out ${
              index === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
        <button
          type="button"
          aria-label="Ảnh trước"
          onClick={() => goTo(active - 1)}
          className="flex size-11 items-center justify-center rounded-full bg-white text-[#b80000] shadow-[0_3px_0_rgba(98,0,0,0.22)]"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>

        <div className="flex items-center gap-2 rounded-full bg-white/92 px-3 py-2 shadow-[0_3px_0_rgba(98,0,0,0.12)]">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Xem ${slide.title}`}
              onClick={() => goTo(index)}
              className={`size-3 rounded-full transition-all ${
                index === active ? "w-8 bg-[#b80000]" : "bg-[#ffc107]"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Ảnh tiếp theo"
          onClick={() => goTo(active + 1)}
          className="flex size-11 items-center justify-center rounded-full bg-white text-[#b80000] shadow-[0_3px_0_rgba(98,0,0,0.22)]"
        >
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>

      <div className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-2 text-[14px] font-extrabold uppercase text-[#b80000] shadow-[0_3px_0_rgba(98,0,0,0.12)]">
        {slides[active]?.title}
      </div>
    </div>
  );
}
