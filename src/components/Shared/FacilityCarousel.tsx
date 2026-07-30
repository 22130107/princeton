"use client";

import type { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";

type FacilitySlide = {
  image: StaticImageData | string;
  title: string;
};

type FacilityCarouselProps = {
  slides: FacilitySlide[];
  imageContext?: string;
};

export default function FacilityCarousel({ slides, imageContext = "cơ sở vật chất" }: FacilityCarouselProps) {
  const [active, setActive] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const safeSlides = slides.length ? slides : [];
  const activeSlide = safeSlides[active];
  const activeImageSrc = activeSlide
    ? typeof activeSlide.image === "string"
      ? activeSlide.image
      : activeSlide.image.src
    : "";

  const goTo = (index: number) => {
    if (!safeSlides.length) return;
    setActive((index + safeSlides.length) % safeSlides.length);
  };

  useEffect(() => {
    if (!safeSlides.length || isLightboxOpen) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % safeSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isLightboxOpen, safeSlides.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") goTo(active - 1);
      if (event.key === "ArrowRight") goTo(active + 1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, isLightboxOpen, safeSlides.length]);

  if (!safeSlides.length) return null;

  return (
    <>
      <div className="relative overflow-hidden rounded-[28px] border-2 border-dashed border-white bg-[#fffefa] shadow-[6px_6px_0_rgba(98,0,0,0.12)]">
        <button
          type="button"
          aria-label={`Xem ảnh ${imageContext} kích thước lớn`}
          onClick={() => setIsLightboxOpen(true)}
          className="relative block h-[300px] w-full cursor-zoom-in overflow-hidden text-left md:h-[460px]"
        >
          {safeSlides.map((slide, index) => (
            <img
              key={`${slide.title}-${index}`}
              src={typeof slide.image === "string" ? slide.image : slide.image.src}
              alt={slide.title}
              className={`absolute inset-0 size-full object-cover transition-all duration-500 ease-out ${
                index === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
              }`}
            />
          ))}
        </button>

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
            {safeSlides.map((slide, index) => (
              <button
                key={`${slide.title}-${index}`}
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
          {safeSlides[active]?.title}
        </div>
      </div>

      {isLightboxOpen && activeSlide ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeSlide.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#220000]/88 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-[1180px] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImageSrc}
              alt={activeSlide.title}
              className="max-h-full max-w-full rounded-[18px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            />
            <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-[14px] font-extrabold uppercase text-[#b80000] shadow-[0_3px_0_rgba(98,0,0,0.18)]">
              {activeSlide.title}
            </div>
            <button
              type="button"
              aria-label="Đóng ảnh lớn"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white text-[#b80000] shadow-[0_3px_0_rgba(98,0,0,0.22)]"
            >
              <X size={24} strokeWidth={3} />
            </button>
            {safeSlides.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Ảnh trước"
                  onClick={() => goTo(active - 1)}
                  className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#b80000] shadow-[0_3px_0_rgba(98,0,0,0.22)]"
                >
                  <ChevronLeft size={26} strokeWidth={3} />
                </button>
                <button
                  type="button"
                  aria-label="Ảnh tiếp theo"
                  onClick={() => goTo(active + 1)}
                  className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#b80000] shadow-[0_3px_0_rgba(98,0,0,0.22)]"
                >
                  <ChevronRight size={26} strokeWidth={3} />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
