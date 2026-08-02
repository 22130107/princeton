"use client";

import { useEffect, useRef, useState } from "react";
import imgQuote from "../../assets/cfeb6f6734141cc70383b6a1b5c4247fa8b7ad92.png";
import imgLogo from "../../assets/logo.png";
import { useLanguage } from "@/components/Shared/LanguageProvider";

type Testimonial = {
  id: number;
  parentName: string;
  studentName: string;
  avatarUrl: string;
  avatarAlt: string;
  quote: string;
};

export default function MobileTestimonialsSection() {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);
  const touchX = useRef(0);

  useEffect(() => {
    let alive = true;

    fetch("/api/testimonials")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.testimonials)) return;
        setTestimonials(data.testimonials.filter((item: Testimonial) => item.parentName && item.quote));
      })
      .catch(() => {
        if (alive) setTestimonials([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  const total = testimonials.length;
  const prev = () => setActive((current) => (current > 0 ? current - 1 : total - 1));
  const next = () => setActive((current) => (current < total - 1 ? current + 1 : 0));

  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="bg-[#fffbf3] px-4 py-10">
      <h2 className="text-[#620000] font-bold text-[22px] uppercase text-center mb-2">
        {t("home.testimonials.title")}
      </h2>
      <p className="text-[#620000] font-medium text-[13px] text-center leading-relaxed mb-7">
        {t("mobile.testimonials.text")}
      </p>

      <div
        className="relative"
        onTouchStart={(event) => {
          touchX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const diff = touchX.current - event.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        }}
      >
        <div className="overflow-hidden pb-1 pr-1">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out will-change-transform"
            style={{ transform: `translateX(calc(-${active * 100}% - ${active}rem))` }}
          >
            {testimonials.map((item) => (
              <article
                key={item.id}
                className="relative h-[390px] w-full shrink-0 overflow-hidden rounded-2xl border border-black bg-[#fffefa] shadow-[4px_4px_0px_black]"
              >
                <div className="flex h-[76px] items-center gap-3 border-b border-black bg-[#b80000] px-5 py-3">
                  <div className="size-12 shrink-0 overflow-hidden rounded-full border-2 border-white bg-white">
                    {item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.avatarAlt || item.parentName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img src={imgLogo.src} alt="" className="h-full w-full object-contain p-1.5" />
                    )}
                  </div>
                  <span className="min-w-0 text-[15px] font-bold leading-snug text-white">
                    {item.parentName}
                  </span>
                </div>

                <div className="relative flex h-[314px] flex-col p-5">
                  <img src={imgQuote.src} alt="" className="mb-3 h-5 w-6 opacity-60" />
                  <img src={imgLogo.src} alt="" className="mx-auto mb-4 h-[70px] w-[70px] object-contain" />
                  <p className="overflow-hidden text-[14px] font-medium leading-relaxed text-[#620000]">
                    {item.quote}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-5">
          <button
            onClick={prev}
            className="size-10 rounded-full bg-white border border-[#b80000] flex items-center justify-center shadow-sm"
            aria-label={t("home.testimonials.prev")}
          >
            <svg width="14" height="14" viewBox="0 0 16 28" fill="none">
              <path d="M14 2L2 14L14 26" stroke="#b80000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                className={`rounded-full transition-all duration-200 ${
                  index === active ? "bg-[#b80000] w-5 h-2.5" : "bg-[#b80000]/30 w-2.5 h-2.5"
                }`}
                aria-label={t("home.testimonials.shareLabel").replace("{n}", String(index + 1))}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="size-10 rounded-full bg-white border border-[#b80000] flex items-center justify-center shadow-sm"
            aria-label={t("home.testimonials.next")}
          >
            <svg width="14" height="14" viewBox="0 0 16 28" fill="none">
              <path d="M2 2L14 14L2 26" stroke="#b80000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
