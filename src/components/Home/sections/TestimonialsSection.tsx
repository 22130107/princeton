"use client";

import { useMemo, useState, useEffect } from "react";
import imgImage4 from "../../../assets/8be1034309901c74e010831c2ccb706a7d4de7c5.png";
import imgTestimonialQuotePng from "../../../assets/cfeb6f6734141cc70383b6a1b5c4247fa8b7ad92.png";
import imgImage3 from "../../../assets/ca5376ce92d1f2dc22b4ce037286566eecbabbfd.png";
import imgLogo from "../../../assets/logo.png";
import { useLanguage } from "@/components/Shared/LanguageProvider";

type Testimonial = {
  id: number;
  parentName: string;
  parentNameEn: string;
  studentName: string;
  avatarUrl: string;
  avatarAlt: string;
  quote: string;
  quoteEn: string;
  reactionImageUrl: string;
  reactionImageAlt: string;
};

function Heading() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Heading 2">
      <div className="absolute bottom-[-18px] left-[-148.01px] size-[90px] animate-bounce-up-down will-change-transform" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgImage3.src} />
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[60px] text-center whitespace-nowrap">
        <p className="leading-[60px]">{t("home.testimonials.title")}</p>
      </div>
      <div className="absolute bottom-0 h-[84px] right-[-139.99px] w-[80px] animate-bounce-up-down will-change-transform [animation-delay:1s]" data-name="Image">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[95.24%] left-0 max-w-none top-0 w-full" src={imgImage4.src} />
        </div>
      </div>
    </div>
  );
}

function Intro() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-center max-w-[1046px] relative shrink-0 w-[1046px]" data-name="Container">
      <Heading />
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
        <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[20px] text-center">
          <p className="leading-[28px]">
            {t("home.testimonials.text")}
          </p>
        </div>
      </div>
    </div>
  );
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[60px] top-0" data-name="Container">
      <div className="absolute bg-[#b80000] inset-[-8.33%] rounded-[35px]" data-name="Background+Border">
        <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[35px]" />
      </div>
      <div className="absolute bg-[#b80000] inset-[-10.33%_-8.33%_-6.33%_-8.33%] rounded-[35px]" data-name="Background" />
      {testimonial.avatarUrl ? (
        <div className="max-w-[60px] pointer-events-none relative rounded-[30px] shrink-0 size-[60px]" data-name="avatar">
          <div className="absolute inset-0 overflow-hidden rounded-[30px]">
            <img alt={testimonial.avatarAlt || testimonial.parentName} className="absolute left-0 max-w-none size-full top-0 object-cover" src={testimonial.avatarUrl} />
          </div>
          <div aria-hidden className="absolute border border-black border-solid inset-0 rounded-[30px]" />
        </div>
      ) : (
        <div className="relative flex size-[60px] items-center justify-center overflow-hidden rounded-[30px] bg-white">
          <img alt="" className="size-[46px] object-contain" src={imgLogo.src} />
          <div aria-hidden className="absolute border border-black border-solid inset-0 rounded-[30px]" />
        </div>
      )}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const parentName = isEn && testimonial.parentNameEn ? testimonial.parentNameEn : testimonial.parentName;

  return (
    <div className="content-stretch flex flex-col h-[390.13px] items-start justify-center pr-[14px] relative shrink-0 w-[471.88px]" data-name="Group:margin">
      <article className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-[457.88px]" data-name="Group">
        <div className="relative shrink-0 w-full" data-name="Container">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-start pb-[6px] pr-[6px] relative size-full">
              <div className="absolute bg-black inset-[5%_0_0_2%] rounded-[24px]" data-name="Background" />
              <div className="bg-[#fffefa] relative rounded-[24px] shrink-0 w-full" data-name="Background+Border">
                <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[24px]" />
                <div className="content-stretch flex flex-col items-start p-[6.8px] relative size-full">
                  <div className="bg-[#b80000] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Background+Border">
                    <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
                    <div className="flex flex-row items-center size-full">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center px-[32.8px] py-[6.8px] relative size-full">
                        <div className="h-[46px] relative shrink-0 w-[60px]" data-name="Margin">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                            <Avatar testimonial={testimonial} />
                          </div>
                        </div>
                        <div className="h-[26px] min-w-0 relative shrink-0 flex-1" data-name="Container">
                          <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-bold justify-center leading-[0] left-0 right-0 text-[22px] text-white top-[12.4px]">
                            <p className="leading-[26px] truncate">{parentName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[200px] relative shrink-0 w-full" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
                      <div className="absolute h-[24px] left-[4px] top-[12px] w-[28px]" data-name="testimonial-quote.png">
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgTestimonialQuotePng.src} />
                        </div>
                      </div>
                      <div className="absolute left-[8px] top-[30px] size-[112px]" data-name="testimonial-logo.png">
                        <img alt="" className="size-full object-contain" src={imgLogo.src} />
                      </div>
                      <div className="absolute content-stretch flex flex-col items-start left-[116px] right-[16.01px] top-[38px]" data-name="Container">
                        <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[16px]">
                          <p className="leading-[24px] line-clamp-[7]">{isEn ? testimonial.quoteEn || testimonial.quote : testimonial.quote}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative shrink-0 w-full" data-name="Container">
                    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[10px] pt-[32px] px-[10px] relative size-full">
                      {testimonial.reactionImageUrl ? (
                        <div className="h-[68.93px] max-w-[438.27px] relative shrink-0 w-[418.21px]" data-name="reactions.png">
                          <div className="absolute inset-0 pointer-events-none">
                            <img alt={testimonial.reactionImageAlt} className="absolute left-0 max-w-none size-full top-0 object-contain" src={testimonial.reactionImageUrl} />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Slider({
  testimonials,
  activeSlide,
  onNext,
  onPrev,
  onDotClick,
}: {
  testimonials: Testimonial[];
  activeSlide: number;
  onNext: () => void;
  onPrev: () => void;
  onDotClick: (index: number) => void;
}) {
  const { t } = useLanguage();
  const cards = useMemo(() => [...testimonials, ...testimonials], [testimonials]);
  const cardWidth = 471.88;

  return (
    <div className="max-w-[2052px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[50px] items-center max-w-[inherit] px-[16px] relative size-full">
        <div className="h-[393.23px] overflow-clip relative shrink-0 w-full" data-name="Container">
          <div
            className="flex items-start h-full transition-transform duration-500 ease-in-out will-change-transform"
            style={{ transform: `translateX(-${activeSlide * cardWidth}px)` }}
          >
            {cards.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-start">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => onDotClick(index)}
              className={`relative rounded-[6px] shrink-0 size-[12px] transition-colors duration-200 cursor-pointer ${index === activeSlide ? "bg-[#b80000]" : "bg-white"}`}
              data-name={`Button - Go to slide ${index + 1}`}
            >
              <div aria-hidden className="absolute border border-[rgba(183,0,0,0.6)] border-solid inset-0 pointer-events-none rounded-[6px]" />
            </button>
          ))}
        </div>
        <div className="content-stretch flex gap-[40px] h-[90px] items-start justify-center relative shrink-0 w-full" data-name="Container">
          <button onClick={onPrev} className="content-stretch flex flex-col items-start relative self-stretch shrink-0 hover:scale-110 hover:opacity-80 transition-transform duration-200 cursor-pointer" data-name="Button - Previous slide" aria-label={t("home.testimonials.prev")}>
            <span className="flex size-[90px] items-center justify-center rounded-full border border-black bg-white text-[48px] leading-none text-black shadow-[4px_4px_0_#212121]">‹</span>
          </button>
          <button onClick={onNext} className="content-stretch flex flex-col items-start relative self-stretch shrink-0 hover:scale-110 hover:opacity-80 transition-transform duration-200 cursor-pointer" data-name="Button - Next slide" aria-label={t("home.testimonials.next")}>
            <span className="flex size-[90px] items-center justify-center rounded-full border border-black bg-white text-[48px] leading-none text-black shadow-[4px_4px_0_#212121]">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let alive = true;

    fetch("/api/testimonials")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.testimonials)) return;
        setTestimonials(data.testimonials.filter((item: Testimonial) => item.parentName && (item.quote || item.quoteEn)));
      })
      .catch(() => {
        if (alive) setTestimonials([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  const totalSlides = testimonials.length;

  if (!testimonials.length) {
    return null;
  }

  return (
    <div className="absolute bg-[#fffbf3] content-stretch flex flex-col gap-[86px] items-center left-0 pb-[80px] pt-[120px] right-0 top-[5747.35px]" data-name="Section">
      <Intro />
      <Slider
        testimonials={testimonials}
        activeSlide={activeSlide}
        onNext={() => setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))}
        onPrev={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))}
        onDotClick={setActiveSlide}
      />
    </div>
  );
}
