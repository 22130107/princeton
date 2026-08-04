"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

interface Slide {
  image: string;
  title: string | null;
}

export default function FacilityImageCarousel({ slides, isEn }: { slides: Slide[]; isEn: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    if (isFullscreen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isFullscreen]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  function assetSrc(image: string) {
    return image;
  }

  return (
    <>
      <figure className="relative order-2 lg:order-1 group">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-1 translate-y-1 bg-[#991B1B]/10"
        />
        <div className="relative border-2 border-[#991B1B] bg-white">
          <div className="relative aspect-[1/1.12] overflow-hidden cursor-pointer" onClick={() => setIsFullscreen(true)}>
            <img
              key={currentSlide.image}
              src={assetSrc(currentSlide.image)}
              alt={currentSlide.title || "Facility"}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105 animate-in fade-in duration-500"
            />
            
            {/* View Fullscreen Hint */}
            <div className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white opacity-0 backdrop-blur transition-opacity duration-300 md:group-hover:opacity-100">
              <Maximize2 className="size-5" />
            </div>

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
          <div className="absolute bottom-12 left-[-18px] z-[2] w-[72%] md:bottom-16 md:left-[-24px] md:w-[68%] pointer-events-none">
            <span
              aria-hidden
              className="absolute left-0 top-[-14px] h-[14px] w-[16px] bg-[#F4D06F] md:w-[22px]"
              style={{
                clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
              }}
            />
            <figcaption
              className="relative border-t-2 border-[#991B1B] bg-[#F4D06F] py-5 pl-10 pr-6 md:pl-12 pointer-events-auto"
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

      {/* Lightbox Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Header Actions */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-end p-4 md:p-6">
            <button
              onClick={() => setIsFullscreen(false)}
              className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 hover:scale-110 active:scale-95"
              aria-label="Close fullscreen"
            >
              <X className="size-6" />
            </button>
          </div>
          
          {/* Main Image */}
          <div 
            className="relative flex h-full max-h-[85vh] w-full max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={`fs-${currentSlide.image}`}
              src={assetSrc(currentSlide.image)}
              alt={currentSlide.title || "Facility Fullscreen"}
              className="h-full w-full object-contain animate-in zoom-in-95 duration-300"
            />
          </div>

          {/* Title */}
          {currentSlide.title && (
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="mx-auto max-w-2xl px-6 py-2 text-[15px] font-medium text-white/90">
                {currentSlide.title}
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          {slides.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-4 top-1/2 flex size-12 md:size-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/25 hover:scale-110 active:scale-95 md:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-8 md:size-10" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-4 top-1/2 flex size-12 md:size-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/25 hover:scale-110 active:scale-95 md:right-8"
                aria-label="Next image"
              >
                <ChevronRight className="size-8 md:size-10" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
