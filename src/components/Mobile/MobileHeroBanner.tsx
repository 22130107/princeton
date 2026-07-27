"use client";

import { useState, useRef } from "react";
import imgBanner1 from "../../assets/1cb1c415ea9c6af5c91a9167c054aa84c4507ec4.png";
import imgBanner2 from "../../assets/eb701c1db54fe5a3e821c062e1706ea59a24b8ab.png";
import imgBanner3 from "../../assets/f096407c0e14b5d7b3aa8cdb6a104a2e3385c103.png";

const banners = [imgBanner1, imgBanner2, imgBanner3];

export default function MobileHeroBanner() {
  const [active, setActive] = useState(0);
  const touchX = useRef(0);

  const prev = () => setActive((a) => (a > 0 ? a - 1 : banners.length - 1));
  const next = () => setActive((a) => (a < banners.length - 1 ? a + 1 : 0));

  return (
    <section className="w-full bg-[#fffefa] relative overflow-hidden">
      {/* Slider */}
      <div
        className="relative overflow-hidden w-full"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const diff = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {banners.map((img, i) => (
            <div key={i} className="shrink-0 w-full">
              <img src={img.src} alt={`Banner ${i + 1}`} className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-200 ${
                i === active ? "bg-[#b80000] w-5 h-2.5" : "bg-white/70 w-2.5 h-2.5"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
