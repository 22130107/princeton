"use client";

import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type MomentSlide = {
  image: string;
  title: string;
};

type MomentGalleryGridProps = {
  slides: MomentSlide[];
  imageContext: string;
  isEn?: boolean;
};

export default function MomentGalleryGrid({
  slides,
  imageContext,
  isEn = false,
}: MomentGalleryGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const visibleSlides = useMemo(
    () => (isExpanded ? slides : slides.slice(0, 4)),
    [isExpanded, slides],
  );
  const activeSlide = activeIndex === null ? null : slides[activeIndex];

  const goTo = (index: number) => {
    if (!slides.length) return;
    setActiveIndex((index + slides.length) % slides.length);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") goTo(activeIndex - 1);
      if (event.key === "ArrowRight") goTo(activeIndex + 1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, slides.length]);

  if (!slides.length) return null;

  return (
    <>
      <div className="mt-12 grid gap-1 md:grid-cols-2">
        {visibleSlides.map((slide, index) => (
          <button
            key={`${slide.title}-${index}`}
            type="button"
            aria-label={`${isEn ? "View original image" : "Xem ảnh gốc"} ${slide.title}`}
            onClick={() => setActiveIndex(index)}
            className="about-luxury-rise group relative aspect-[1.52/1] overflow-hidden bg-[#e2dbd9] text-left outline-none ring-offset-4 ring-offset-[#F7F4F2] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#991B1B]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.035]"
            />
            <span className="absolute inset-0 bg-[#2b120e]/0 transition-colors duration-500 group-hover:bg-[#2b120e]/16" />
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-[#991B1B] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-white opacity-0 shadow-[0_12px_28px_rgba(43,18,14,0.18)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              {isEn ? "View" : "Xem ảnh"}
            </span>
          </button>
        ))}
      </div>

      {slides.length > 4 ? (
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="inline-flex items-center bg-[#991B1B] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.04em] text-white shadow-[0_16px_34px_rgba(153,27,27,0.18)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-[#7f1515] active:scale-[0.98]"
          >
            {isExpanded ? (isEn ? "Show less" : "Thu gọn") : (isEn ? "View more" : "Xem thêm")}
          </button>
        </div>
      ) : null}

      {activeSlide ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${isEn ? "Original image" : "Ảnh gốc"} ${imageContext}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1f0e0b]/92 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative flex h-full max-h-[92vh] w-full max-w-[1180px] items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="max-h-full max-w-full object-contain shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
            />
            <div className="absolute left-4 top-4 max-w-[calc(100%-136px)] bg-white/10 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#F4D06F] shadow-[0_18px_44px_rgba(0,0,0,0.24)] backdrop-blur-sm">
              {activeSlide.title}
            </div>
            <a
              href={activeSlide.image}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-[#F4D06F] px-4 py-3 text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#3f1f1b] no-underline shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
            >
              <ExternalLink size={16} strokeWidth={2.2} />
              {isEn ? "Original" : "Ảnh gốc"}
            </a>
            <button
              type="button"
              aria-label={isEn ? "Close" : "Đóng"}
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 flex size-11 items-center justify-center border border-white/15 bg-white/10 text-white shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
            >
              <X size={22} strokeWidth={2.25} />
            </button>
            {slides.length > 1 ? (
              <>
                <button
                  type="button"
                  aria-label={isEn ? "Previous image" : "Ảnh trước"}
                  onClick={() => goTo((activeIndex ?? 0) - 1)}
                  className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/10 text-white shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
                >
                  <ChevronLeft size={24} strokeWidth={2.25} />
                </button>
                <button
                  type="button"
                  aria-label={isEn ? "Next image" : "Ảnh tiếp theo"}
                  onClick={() => goTo((activeIndex ?? 0) + 1)}
                  className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-white/10 text-white shadow-[0_18px_44px_rgba(0,0,0,0.24)]"
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
