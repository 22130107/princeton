"use client";

import { useState, useEffect, useRef } from "react";
import { CoverImage } from "@/components/Shared/CoverImage";
import svgPaths from "../svg-g45k1n1pz5";
import imgBanner1Vi2Png1 from "../../../assets/1cb1c415ea9c6af5c91a9167c054aa84c4507ec4.png";
import imgBannerUuDaiViPng from "../../../assets/d082e0a60a126345af429a7e01c4ba8161c21e0e.png";
import imgBanner2Vi1Png from "../../../assets/f096407c0e14b5d7b3aa8cdb6a104a2e3385c103.png";
import imgBannerUuDaiViPng1 from "../../../assets/eb701c1db54fe5a3e821c062e1706ea59a24b8ab.png";
import imgBanner1Vi2Png from "../../../assets/1cf6be04c36a268cff08562f0a3e6d0e3c0c5e8c.png";

type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  desktopImageUrl: string;
  desktopImageAlt: string;
  desktopObjectPosition: string;
  desktopZoom: number;
  mobileImageUrl: string;
  mobileImageAlt: string;
  mobileObjectPosition: string;
  mobileZoom: number;
  ctaHref: string;
};

const BANNER_FRAME_ASPECT = 1014 / 546;
const BANNER_MOBILE_FRAME_ASPECT = 4096 / 2731;

function Banner1Vi2Png() {
  return (
    <div className="absolute h-[546.002px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[1125.217px_804.346px] top-0 w-[1013.999px]" style={{ maskImage: `url("${imgBanner1Vi2Png.src}")` }} data-name="banner1-vi-2.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[123.81%] left-0 max-w-none top-[-11.9%] w-full" src={imgBanner1Vi2Png1.src} />
      </div>
    </div>
  );
}

function ImgMaskGroup() {
  return (
    <div className="flex h-[804.345px] items-center justify-center max-w-[1014.0001831054688px] relative shrink-0 w-[1125.217px]">
      <div className="-rotate-16 flex-none">
        <div className="h-[546px] relative w-[1014px]" data-name="Img:mask-group">
          <Banner1Vi2Png />
        </div>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-23.61px] pt-[7.324px] right-0 top-0" data-name="Container">
      <ImgMaskGroup />
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[0_-1514px_80px_2028px]" data-name="Group - 3 / 3">
      <Container23 />
    </div>
  );
}

function BannerUuDaiViPng() {
  return (
    <div className="absolute h-[546px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[1014px_546px] top-0 w-[1014px]" style={{ maskImage: `url("${imgBannerUuDaiViPng.src}")` }} data-name="banner_uu_dai_vi.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[123.81%] left-0 max-w-none top-[-11.9%] w-full" src={imgBannerUuDaiViPng1.src} />
      </div>
    </div>
  );
}

function ImgMaskGroup1() {
  return (
    <div className="h-[546px] max-w-[1014px] relative shrink-0 w-[1014px]" data-name="Img:mask-group">
      <BannerUuDaiViPng />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <ImgMaskGroup1 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_-2528px_0_3042px] items-start max-w-[1014px] pb-[80px]" data-name="Group - 1 / 3">
      <Container24 />
    </div>
  );
}

function Banner2Vi1Png() {
  return (
    <div className="absolute h-[546.002px] left-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[1125.217px_804.346px] top-0 w-[1013.999px]" style={{ maskImage: `url("${imgBanner1Vi2Png.src}")` }} data-name="banner2-vi-1.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[123.81%] left-0 max-w-none top-[-11.9%] w-full" src={imgBanner2Vi1Png.src} />
      </div>
    </div>
  );
}

function ImgMaskGroup2() {
  return (
    <div className="flex h-[804.345px] items-center justify-center max-w-[1014.0001831054688px] relative shrink-0 w-[1125.217px]">
      <div className="flex-none rotate-16">
        <div className="h-[546px] relative w-[1014px]" data-name="Img:mask-group">
          <Banner2Vi1Png />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-87.61px] pt-[7.33px] right-0 top-0" data-name="Container">
      <ImgMaskGroup2 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[0_-3542px_80px_4056px]" data-name="Group - 2 / 3">
      <Container25 />
    </div>
  );
}

function Container22({ activeSlide }: { activeSlide: number }) {
  const len = 3;
  const imgs = [<BannerUuDaiViPng />, <Banner1Vi2Png />, <Banner2Vi1Png />];
  return (
    <div className="absolute inset-[0_2785px_0_-2785px]" data-name="Container">
      <div className="absolute inset-[0_-1514px_80px_2028px]" data-name="Group - 3 / 3">
        <div className="absolute content-stretch flex flex-col items-start left-[-23.61px] pt-[7.324px] right-0 top-0" data-name="Container">
          <div className="flex h-[804.345px] items-center justify-center max-w-[1014px] relative shrink-0 w-[1125.217px]">
            <div className="-rotate-16 flex-none">
              <div className="h-[546px] relative w-[1014px]" data-name="Img:mask-group">
                {imgs[(activeSlide + len - 1) % len]}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col inset-[0_-2528px_0_3042px] items-start max-w-[1014px] pb-[80px]" data-name="Group - 1 / 3">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
          <div className="h-[546px] max-w-[1014px] relative shrink-0 w-[1014px]" data-name="Img:mask-group">
            {imgs[activeSlide]}
          </div>
        </div>
      </div>
      <div className="absolute inset-[0_-3542px_80px_4056px]" data-name="Group - 2 / 3">
        <div className="absolute content-stretch flex flex-col items-start left-[-87.61px] pt-[7.33px] right-0 top-0" data-name="Container">
          <div className="flex h-[804.345px] items-center justify-center max-w-[1014px] relative shrink-0 w-[1125.217px]">
            <div className="flex-none rotate-16">
              <div className="h-[546px] relative w-[1014px]" data-name="Img:mask-group">
                {imgs[(activeSlide + 1) % len]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="h-[28px] relative shrink-0 w-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 16 28" width="16">
        <g clipPath="url(#clip0_1_1043)" id="SVG">
          <path d={svgPaths.p1744c600} id="Vector" stroke="var(--stroke-0, #B80000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1043">
            <rect fill="white" height="28" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Border() {
  return (
    <div className="w-full h-full content-stretch flex items-center justify-center px-[1.6px] py-[26px] relative rounded-[40px] shrink-0" data-name="Border">
      <div aria-hidden className="absolute border border-[rgba(183,0,0,0.6)] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <Svg />
    </div>
  );
}

function ButtonPreviousSlide({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="bg-white flex items-center justify-center p-[4px] relative rounded-full shrink-0 size-[88px] hover:scale-110 hover:shadow-lg transition-transform duration-200 cursor-pointer" data-name="Button - Previous slide">
      <Border />
    </button>
  );
}

function Svg1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[16px]" data-name="SVG">
      <svg className="absolute block inset-0 size-full" fill="none" height="28" preserveAspectRatio="none" viewBox="0 0 16 28" width="16">
        <g clipPath="url(#clip0_1_1043)" id="SVG">
          <path d={svgPaths.p1744c600} id="Vector" stroke="var(--stroke-0, #B80000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
        <defs>
          <clipPath id="clip0_1_1043">
            <rect fill="white" height="28" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Border1() {
  return (
    <div className="w-full h-full content-stretch flex items-center justify-center px-[1.6px] py-[26px] relative rounded-[40px] shrink-0" data-name="Border">
      <div aria-hidden className="absolute border border-[rgba(183,0,0,0.6)] border-solid inset-0 pointer-events-none rounded-[40px]" />
      <Svg1 />
    </div>
  );
}

function ButtonNextSlide({ onClick }: { onClick?: () => void }) {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="flex-none rotate-180">
        <button onClick={onClick} className="bg-white flex items-center justify-center p-[4px] relative rounded-full size-[88px] hover:scale-110 hover:shadow-lg transition-transform duration-200 cursor-pointer" data-name="Button - Next slide">
          <Border1 />
        </button>
      </div>
    </div>
  );
}

function Container27({ onPrev, onNext }: { onPrev?: () => void; onNext?: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <ButtonPreviousSlide onClick={onPrev} />
      <ButtonNextSlide onClick={onNext} />
    </div>
  );
}

function Container26({ onPrev, onNext }: { onPrev?: () => void; onNext?: () => void }) {
  return (
    <div className="absolute content-stretch flex flex-col inset-[40.42%_16.82%_42.97%_16.82%] items-start max-w-[1014px]" data-name="Container">
      <Container27 onPrev={onPrev} onNext={onNext} />
    </div>
  );
}

function Container28({ activeSlide, onDotClick }: { activeSlide: number; onDotClick?: (index: number) => void }) {
  return (
    <div className="absolute bottom-[72px] content-stretch flex gap-[8px] items-start left-0 pb-[8px] pt-[4px] px-[728px] right-0" data-name="Container">
      {[0, 1, 2].map(i => (
        <button key={i} onClick={() => onDotClick?.(i)} className={`relative rounded-[6px] shrink-0 size-[12px] transition-colors duration-200 cursor-pointer ${i === activeSlide ? 'bg-[#b80000]' : 'bg-white'}`} data-name={`Button - Go to slide ${i + 1}`}>
          <div aria-hidden className="absolute border border-[rgba(183,0,0,0.6)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </button>
      ))}
    </div>
  );
}

function Container21() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    }, 3000);

    return () => window.clearInterval(timer);
  }, [totalSlides]);

  return (
    <div className="h-[626px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Container22 activeSlide={activeSlide} />
      <Container26
        onPrev={() => setActiveSlide(prev => (prev > 0 ? prev - 1 : totalSlides - 1))}
        onNext={() => setActiveSlide(prev => (prev < totalSlides - 1 ? prev + 1 : 0))}
      />
      <Container28 activeSlide={activeSlide} onDotClick={setActiveSlide} />
    </div>
  );
}

function MobileContainer() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  const touchX = useRef(0);

  const prev = () => setActiveSlide(prev => (prev > 0 ? prev - 1 : totalSlides - 1));
  const next = () => setActiveSlide(prev => (prev < totalSlides - 1 ? prev + 1 : 0));

  useEffect(() => {
    const timer = window.setInterval(next, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const rawImgs = [imgBannerUuDaiViPng1, imgBanner1Vi2Png1, imgBanner2Vi1Png];

  return (
    <div>
      <div
        className="relative w-full overflow-hidden rounded-[24px]"
        onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          const diff = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        }}
      >
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {rawImgs.map((img, i) => (
            <div key={i} className="shrink-0 w-full flex items-center justify-center">
              <img src={img.src} alt="" className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {rawImgs.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Chuyển đến banner ${i + 1}`}
            className={`size-[12px] rounded-full border border-[#b80000] transition-colors duration-200 ${
              i === activeSlide ? "bg-[#b80000]" : "bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function getDesktopSlideSrc(slide: HeroSlide) {
  return slide.desktopImageUrl || slide.mobileImageUrl;
}

function getMobileSlideSrc(slide: HeroSlide) {
  return slide.mobileImageUrl || slide.desktopImageUrl;
}

function DynamicSlideImage({
  slide,
  mask = "center",
  dataName = "banner_uu_dai_vi.png",
}: {
  slide: HeroSlide;
  mask?: "center" | "angled";
  dataName?: string;
}) {
  const src = getDesktopSlideSrc(slide);
  const zoom = Math.min(3, Math.max(0.5, Number(slide.desktopZoom) || 1));
  const position = slide.desktopObjectPosition || "50% 50%";
  const image = (
    <CoverImage
      src={src}
      alt={slide.desktopImageAlt || slide.title}
      zoom={zoom}
      position={position}
      frameAspect={BANNER_FRAME_ASPECT}
    />
  );

  return (
    <div
      className="absolute h-[546px] left-0 top-0 w-[1014px] overflow-hidden mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[1014px_546px]"
      style={{
        maskImage: `url("${mask === "angled" ? imgBanner1Vi2Png.src : imgBannerUuDaiViPng.src}")`,
        WebkitMaskImage: `url("${mask === "angled" ? imgBanner1Vi2Png.src : imgBannerUuDaiViPng.src}")`,
        maskSize: "1014px 546px",
        WebkitMaskSize: "1014px 546px",
        maskPosition: "0 0",
        WebkitMaskPosition: "0 0",
      }}
      data-name={dataName}
    >
      {slide.ctaHref ? (
        <a className="relative block h-full w-full" href={slide.ctaHref} aria-label={slide.title || "Banner Princeton Academy"}>
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
}

function DynamicDots({
  activeSlide,
  totalSlides,
  onDotClick,
}: {
  activeSlide: number;
  totalSlides: number;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-[72px] left-0 right-0 flex justify-center gap-2 pb-2 pt-1">
      {Array.from({ length: totalSlides }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`relative size-[12px] shrink-0 cursor-pointer rounded-[6px] transition-colors duration-200 ${
            i === activeSlide ? "bg-[#b80000]" : "bg-white"
          }`}
          aria-label={`Chuyển đến banner ${i + 1}`}
        >
          <span aria-hidden className="absolute inset-0 rounded-[6px] border border-[rgba(183,0,0,0.6)]" />
        </button>
      ))}
    </div>
  );
}

function DynamicDesktopContainer({ slides }: { slides: HeroSlide[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    }, 3000);

    return () => window.clearInterval(timer);
  }, [totalSlides]);

  const previous = slides[(activeSlide + totalSlides - 1) % totalSlides] ?? slides[0];
  const active = slides[activeSlide] ?? slides[0];
  const next = slides[(activeSlide + 1) % totalSlides] ?? slides[0];

  return (
    <div className="h-[626px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="absolute inset-[0_2785px_0_-2785px]" data-name="Container">
        <div className="absolute inset-[0_-1514px_80px_2028px]" data-name="Group - 3 / 3">
          <div className="absolute content-stretch flex flex-col items-start left-[-23.61px] pt-[7.324px] right-0 top-0" data-name="Container">
            <div className="flex h-[804.345px] items-center justify-center max-w-[1014px] relative shrink-0 w-[1125.217px]">
              <div className="-rotate-16 flex-none">
                <div className="h-[546px] relative w-[1014px]" data-name="Img:mask-group">
                  <DynamicSlideImage slide={previous} mask="angled" dataName="banner1-vi-2.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute content-stretch flex flex-col inset-[0_-2528px_0_3042px] items-start max-w-[1014px] pb-[80px]" data-name="Group - 1 / 3">
          <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
            <div className="h-[546px] max-w-[1014px] relative shrink-0 w-[1014px]" data-name="Img:mask-group">
              <DynamicSlideImage slide={active} />
            </div>
          </div>
        </div>
        <div className="absolute inset-[0_-3542px_80px_4056px]" data-name="Group - 2 / 3">
          <div className="absolute content-stretch flex flex-col items-start left-[-87.61px] pt-[7.33px] right-0 top-0" data-name="Container">
            <div className="flex h-[804.345px] items-center justify-center max-w-[1014px] relative shrink-0 w-[1125.217px]">
              <div className="flex-none rotate-16">
                <div className="h-[546px] relative w-[1014px]" data-name="Img:mask-group">
                  <DynamicSlideImage slide={next} mask="angled" dataName="banner2-vi-1.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {totalSlides > 1 ? (
        <>
          <Container26
            onPrev={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))}
            onNext={() => setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))}
          />
          <DynamicDots activeSlide={activeSlide} totalSlides={totalSlides} onDotClick={setActiveSlide} />
        </>
      ) : null}
    </div>
  );
}

function DynamicMobileContainer({ slides }: { slides: HeroSlide[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = slides.length;
  const touchX = useRef(0);

  const prev = () => setActiveSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  const next = () => setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));

  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = window.setInterval(next, 3000);

    return () => window.clearInterval(timer);
  }, [totalSlides]);

  return (
    <div>
      <div
        className="relative w-full overflow-hidden rounded-[24px]"
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const diff = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
        }}
      >
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {slides.map((slide) => {
            const src = getMobileSlideSrc(slide);
            const zoom = Math.min(3, Math.max(0.5, Number(slide.mobileZoom) || 1));
            const position = slide.mobileObjectPosition || "50% 50%";
            const image = (
              <CoverImage
                src={src}
                alt={slide.mobileImageAlt || slide.title}
                zoom={zoom}
                position={position}
                frameAspect={BANNER_MOBILE_FRAME_ASPECT}
              />
            );

            return (
              <div
                key={slide.id}
                className="relative w-full shrink-0"
                style={{ aspectRatio: `${BANNER_MOBILE_FRAME_ASPECT}` }}
              >
                {slide.ctaHref ? (
                  <a className="absolute inset-0 block" href={slide.ctaHref} aria-label={slide.title || "Banner Princeton Academy"}>
                    {image}
                  </a>
                ) : (
                  image
                )}
              </div>
            );
          })}
        </div>
      </div>
      {totalSlides > 1 ? (
        <div className="mt-3 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(i)}
              aria-label={`Chuyển đến banner ${i + 1}`}
              className={`size-[12px] rounded-full border border-[#b80000] transition-colors duration-200 ${
                i === activeSlide ? "bg-[#b80000]" : "bg-white"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function HeroBanner() {
  const [isMobile, setIsMobile] = useState(false);
  const [dbSlides, setDbSlides] = useState<HeroSlide[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    let alive = true;

    fetch("/api/hero-slides")
      .then((response) => response.json())
      .then((data) => {
        if (!alive) return;
        if (!Array.isArray(data.slides)) {
          setDbSlides([]);
          setLoaded(true);
          return;
        }
        const slides = data.slides.filter((slide: HeroSlide) => getDesktopSlideSrc(slide));
        setDbSlides(slides);
        setLoaded(true);
      })
      .catch(() => {
        if (alive) setDbSlides([]);
        if (alive) setLoaded(true);
      });

    return () => {
      alive = false;
    };
  }, []);

  if (!loaded || !dbSlides.length) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="bg-[#fffefa] px-1 py-3" data-name="Section-HeroBanner">
        <DynamicMobileContainer slides={dbSlides} />
      </div>
    );
  }

  return (
    <div className="absolute bg-[#fffefa] content-stretch flex flex-col items-start left-0 overflow-clip pb-[40px] pt-[20px] right-0 top-0" data-name="Section-HeroBanner">
      <DynamicDesktopContainer slides={dbSlides} />
    </div>
  );
}
