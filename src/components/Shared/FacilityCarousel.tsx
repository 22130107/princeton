"use client";

import type { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/Shared/LanguageProvider";

type FacilitySlide = {
  image: StaticImageData | string;
  title: string;
};

type FacilityCarouselProps = {
  slides: FacilitySlide[];
  imageContext?: string;
};

export default function FacilityCarousel({ slides, imageContext }: FacilityCarouselProps) {
  const { t } = useLanguage();
  const effectiveContext = imageContext ?? t("facility.context");
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
      <div className="relative overflow-hidden rounded-[24px] bg-[#fffefa] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
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
              className={`absolute inset-0 size-full object-cover transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
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
            className="flex size-11 items-center justify-center rounded-full border border-white/45 bg-[#2b120e]/[0.72] text-white shadow-[0_12px_28px_rgba(43,18,14,0.18)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-[#991B1B]"
          >
            <ChevronLeft size={22} strokeWidth={2.25} />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-white/45 bg-[#2b120e]/[0.72] px-3 py-2 shadow-[0_12px_28px_rgba(43,18,14,0.18)]">
            {safeSlides.map((slide, index) => (
              <button
                key={`${slide.title}-${index}`}
                type="button"
                aria-label={`Xem ${slide.title}`}
                onClick={() => goTo(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  index === active ? "w-8 bg-[#f1d49b]" : "w-2.5 bg-white/[0.54]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Ảnh tiếp theo"
            onClick={() => goTo(active + 1)}
            className="flex size-11 items-center justify-center rounded-full border border-white/45 bg-[#2b120e]/[0.72] text-white shadow-[0_12px_28px_rgba(43,18,14,0.18)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-[#991B1B]"
          >
            <ChevronRight size={22} strokeWidth={2.25} />
          </button>
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-white/45 bg-[#2b120e]/[0.72] px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#f1d49b] shadow-[0_12px_28px_rgba(43,18,14,0.18)]">
          {safeSlides[active]?.title}
        </div>
      </div>

      {isLightboxOpen && activeSlide ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeSlide.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1f0e0b]/90 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-[1180px] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeImageSrc}
              alt={activeSlide.title}
              className="max-h-full max-w-full rounded-[24px] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
            />
            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#f1d49b] shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
              {activeSlide.title}
            </div>
            <button
              type="button"
              aria-label="Đóng ảnh lớn"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
            >
              <X size={22} strokeWidth={2.25} />
            </button>
            {safeSlides.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Ảnh trước"
                  onClick={() => goTo(active - 1)}
                  className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
                >
                  <ChevronLeft size={24} strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  aria-label="Ảnh tiếp theo"
                  onClick={() => goTo(active + 1)}
                  className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
                >
                  <ChevronRight size={24} strokeWidth={2.25} />
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
