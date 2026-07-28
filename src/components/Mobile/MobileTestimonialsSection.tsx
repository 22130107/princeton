"use client";

import { useState, useRef } from "react";
import imgQuote from "../../assets/cfeb6f6734141cc70383b6a1b5c4247fa8b7ad92.png";
import img1 from "../../assets/af1810e30a67ddab6abf8f10c81c4f0e08f00fa9.png";
import img2 from "../../assets/adf14e0ddf4967e0839219ef15e17e003edcbf6a.png";
import img3 from "../../assets/c2bb022ab8d9e25ab685c563473297cc72c94650.png";
import img4 from "../../assets/7e1eee8e4dbdb6a1d39740a5062614540f69469e.png";
import imgLogo from "../../assets/logo.png";

const testimonials = [
  {
    avatar: img1,
    name: "Phụ huynh T.H.G",
    text: "Mẹ thấy con dạn dĩ hơn rất nhiều, tiếp xúc với các bạn chủ động hơn và có sự tiến bộ. Mỗi lần được trải nghiệm trực tiếp tiết học của con thì mẹ thấy con tiến bộ hơn, mỗi khía cạnh phát triển một chút, nhưng cũng khiến mẹ yên tâm và tin tưởng Nhà trường hơn.",
  },
  {
    avatar: img2,
    name: "Phụ huynh N.T.B",
    text: "Điều làm mẹ xúc động nhất đó là con cảm thấy hạnh phúc khi trải qua từng hoạt động với trường. Con lớn lên trong vòng tay yêu thương của các thầy cô và đặc biệt là sự giao tiếp tiếng Anh của con tiến bộ hơn rất nhiều.",
  },
  {
    avatar: img3,
    name: "Phụ huynh H.Q.L",
    text: "Bé đã học 5 năm tại Trường Mầm non Princeton. Trong quá trình con học tại trường, mình thấy con phát triển rất tốt. Con tự tin hơn, mạnh dạn hơn và mình cảm thấy rất vui khi con được phát triển trong môi trường tốt.",
  },
  {
    avatar: img4,
    name: "Phụ huynh Thanh Ngọc",
    text: "Mẹ thấy con dạn dĩ hơn rất nhiều, tiếp xúc với các bạn chủ động hơn và có sự tiến bộ. Mỗi lần được trải nghiệm trực tiếp tiết học của con thì mẹ thấy con tiến bộ hơn.",
  },
];

export default function MobileTestimonialsSection() {
  const [active, setActive] = useState(0);
  const touchX = useRef(0);
  const total = testimonials.length;

  const prev = () => setActive((a) => (a > 0 ? a - 1 : total - 1));
  const next = () => setActive((a) => (a < total - 1 ? a + 1 : 0));

  return (
    <section className="bg-[#fffbf3] px-4 py-10">
      <h2 className="text-[#620000] font-bold text-[22px] uppercase text-center mb-2">
        PHỤ HUYNH NÓI GÌ VỀ NHÀ TRƯỜNG?
      </h2>
      <p className="text-[#620000] font-medium text-[13px] text-center leading-relaxed mb-7">
        Mỗi lời chia sẻ của ba mẹ là niềm tự hào và nguồn động lực để Nhà trường tiếp tục đồng hành cùng những bạn nhỏ.
      </p>

      {/* Slider */}
      <div
        className="relative"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const diff = touchX.current - e.changedTouches[0].clientX;
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
                key={item.name}
                className="relative h-[390px] w-full shrink-0 overflow-hidden rounded-2xl border border-black bg-[#fffefa] shadow-[4px_4px_0px_black]"
              >
                <div className="flex h-[76px] items-center gap-3 border-b border-black bg-[#b80000] px-5 py-3">
                  <div className="size-12 shrink-0 overflow-hidden rounded-full border-2 border-white">
                    <img
                      src={item.avatar.src}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="min-w-0 text-[15px] font-bold leading-snug text-white">
                    {item.name}
                  </span>
                </div>

                <div className="relative flex h-[314px] flex-col p-5">
                  <img src={imgQuote.src} alt="quote" className="mb-3 h-5 w-6 opacity-60" />
                  <img src={imgLogo.src} alt="" className="mx-auto mb-4 h-[70px] w-[70px] object-contain" />
                  <p className="overflow-hidden text-[14px] font-medium leading-relaxed text-[#620000]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={prev}
            className="size-10 rounded-full bg-white border border-[#b80000] flex items-center justify-center shadow-sm"
            aria-label="Trước"
          >
            <svg width="14" height="14" viewBox="0 0 16 28" fill="none">
              <path d="M14 2L2 14L14 26" stroke="#b80000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === active ? "bg-[#b80000] w-5 h-2.5" : "bg-[#b80000]/30 w-2.5 h-2.5"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="size-10 rounded-full bg-white border border-[#b80000] flex items-center justify-center shadow-sm"
            aria-label="Tiếp"
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
