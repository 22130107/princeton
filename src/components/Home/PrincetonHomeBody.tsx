"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Brain,
  Building2,
  GraduationCap,
  Heart,
  MapPin,
  School,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import EnrollmentLeadForm from "@/components/Shared/EnrollmentLeadForm";
import { CoverImage } from "@/components/Shared/CoverImage";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import { classPrograms } from "@/data/classPrograms";
import { campuses, campusMapLink, campusMapUrl } from "@/lib/campuses";
import heroImage from "@/assets/7152d23b5ad0228ac40827979cdce9d4dfc3a8fb.png";
import aboutImage from "@/assets/eca0f00994a6add059898b0052a18055c5e2de11.jpg";
import pathImageOne from "@/assets/1785508529300_2464196110406402971_2464196110406402971_25128eb7cb84732ea220149bbf388309.jpg";
import pathImageTwo from "@/assets/1785508275307_2464196110406402971_2464196110406402971_908152b1927fedcdd7fc0a83d44529f3.jpg";
import pathImageThree from "@/assets/d7d7345887319e335a13681880e24de534f764ac.png";
import pathImageFour from "@/assets/eca0f00994a6add059898b0052a18055c5e2de11.jpg";
import logoImage from "@/assets/logo.png";

type ClassProgramItem = {
  slug: string;
  name: string;
  age?: string;
  label?: string;
  excerpt?: string;
  imageUrl?: string;
  imageAlt?: string;
  coverPosition?: string;
  coverZoom?: number;
  color?: string;
};

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
  ctaLabel: string;
  ctaHref: string;
};

type PrincetonWayItem = {
  slug?: string;
  title: string;
  titleEn?: string;
  imageUrl: string;
  imageAlt?: string;
  coverPosition: string;
  coverZoom: number;
};

type Testimonial = {
  id?: number;
  parentName: string;
  parentNameEn?: string;
  studentName?: string;
  avatarUrl?: string;
  avatarAlt?: string;
  quote: string;
  quoteEn?: string;
};

const shell = "mx-auto w-full max-w-[1480px] px-5 sm:px-8 lg:px-12 2xl:px-16";
const HERO_BANNER_FRAME_ASPECT = 2035 / 773;
const HERO_MOBILE_BANNER_FRAME_ASPECT = 390 / 260;
const WAY_CARD_FRAME_ASPECT = 326 / 290;
const PROGRAM_CARD_IMAGE_ASPECT = 326 / 185;

const copy = {
  vi: {
    heroSmall: "Nuôi dưỡng",
    heroStrong: "trí tò mò",
    heroText:
      "Khơi mở tiềm năng và nuôi dưỡng những công dân toàn cầu hạnh phúc, tự tin và có trách nhiệm.",
    visit: "Đăng ký tham quan",
    aboutTitle: "Về chúng tôi",
    aboutText:
      "Princeton Academy là hệ thống trường mầm non quốc tế tại Việt Nam, mang đến môi trường học tập an toàn, hạnh phúc và truyền cảm hứng để trẻ phát triển toàn diện về trí tuệ, thể chất, cảm xúc và kỹ năng xã hội.",
    whyTitle: "Tại sao chọn Princeton Academy?",
    wayTitle: "Con đường Princeton",
    programTitle: "Chương trình học",
    testimonialTitle: "Phụ huynh nói gì về nhà trường?",
    campusTitle: "Hệ thống cơ sở Princeton",
    formTitle: "Đăng ký tham quan trường",
    detail: "Xem chi tiết",
    map: "Xem bản đồ",
    parent: "Phụ huynh",
  },
  en: {
    heroSmall: "Nurturing",
    heroStrong: "curious minds",
    heroText:
      "Unlocking potential and nurturing happy, confident and responsible global citizens.",
    visit: "Book a visit",
    aboutTitle: "About us",
    aboutText:
      "Princeton Academy is an international preschool system in Vietnam, creating a safe, happy and inspiring environment where children grow in thinking, physical wellbeing, emotion and social skills.",
    whyTitle: "Why choose Princeton Academy?",
    wayTitle: "The Princeton way",
    programTitle: "Academic programs",
    testimonialTitle: "What parents say about Princeton",
    campusTitle: "Princeton campus system",
    formTitle: "Book a school visit",
    detail: "View details",
    map: "View map",
    parent: "Parent",
  },
};

const fallbackPrograms: ClassProgramItem[] = [];

const whyItems = [
  {
    icon: Brain,
    viTitle: "Phát triển tư duy",
    viText: "Chương trình quốc tế giúp trẻ khám phá, đặt câu hỏi và phát triển tư duy phản biện.",
    enTitle: "Thinking growth",
    enText: "International learning experiences help children explore, question and build early critical thinking.",
  },
  {
    icon: Heart,
    viTitle: "Yêu thương và tôn trọng",
    viText: "Môi trường học tập nuôi dưỡng tình yêu thương, sự tôn trọng và lòng nhân ái.",
    enTitle: "Love and respect",
    enText: "A nurturing environment where children feel loved, respected and emotionally secure.",
  },
  {
    icon: ShieldCheck,
    viTitle: "An toàn tuyệt đối",
    viText: "Không gian học tập an toàn, tiêu chuẩn quốc tế, luôn đặt sức khỏe của trẻ lên hàng đầu.",
    enTitle: "Absolute safety",
    enText: "Safe, age-appropriate learning spaces with children's wellbeing placed first.",
  },
  {
    icon: Sparkles,
    viTitle: "Phát triển toàn diện",
    viText: "Cân bằng giữa trí tuệ, thể chất, cảm xúc, kỹ năng xã hội và thẩm mỹ.",
    enTitle: "Whole-child growth",
    enText: "Balanced growth across mind, body, emotion, social skills and creativity.",
  },
  {
    icon: School,
    viTitle: "Đội ngũ tận tâm",
    viText: "Giáo viên giàu kinh nghiệm, tận tâm và không ngừng đồng hành cùng trẻ.",
    enTitle: "Dedicated teachers",
    enText: "Experienced educators guide children with care, attention and daily encouragement.",
  },
  {
    icon: UsersRound,
    viTitle: "Kết nối gia đình",
    viText: "Đồng hành cùng phụ huynh trong hành trình nuôi dưỡng những công dân hạnh phúc.",
    enTitle: "Family connection",
    enText: "Close partnership with parents through every milestone of a child's growth.",
  },
];

const fallbackWayItems: PrincetonWayItem[] = [];
const fallbackTestimonials: Testimonial[] = [];

function useHomepageData() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [wayItems, setWayItems] = useState<PrincetonWayItem[]>(fallbackWayItems);
  const [programs, setPrograms] = useState<ClassProgramItem[]>(fallbackPrograms);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    let alive = true;

    fetch("/api/hero-slides")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.slides)) return;
        const nextSlides = data.slides
          .filter((slide: HeroSlide) => slide.desktopImageUrl || slide.mobileImageUrl)
          .map((slide: HeroSlide) => ({
            ...slide,
            desktopObjectPosition: slide.desktopObjectPosition || "50% 50%",
            desktopZoom: Number(slide.desktopZoom) || 1,
            mobileObjectPosition: slide.mobileObjectPosition || "50% 50%",
            mobileZoom: Number(slide.mobileZoom) || 1,
          }));
        setHeroSlides(nextSlides);
      })
      .catch(() => undefined);

    fetch("/api/teaching-methods")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.methods)) return;
        const nextItems = data.methods
          .slice(0, 4)
          .map((item: any) => ({
            slug: item.slug,
            title: item.title,
            titleEn: item.titleEn,
            imageUrl: item.imageUrl,
            imageAlt: item.imageAlt || item.title,
            coverPosition: item.coverPosition || "50% 50%",
            coverZoom: Number(item.coverZoom) || 1,
          }))
          .filter((item: PrincetonWayItem) => item.title && item.imageUrl);
        if (nextItems.length) setWayItems(nextItems);
      })
      .catch(() => undefined);

    fetch("/api/class-programs")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.programs)) return;
        const nextPrograms = data.programs
          .slice(0, 4)
          .map((item: any, index: number) => ({
            slug: item.slug,
            name: item.name,
            age: item.age,
            label: item.label,
            excerpt: item.excerpt,
            imageUrl: item.imageUrl || fallbackPrograms[index]?.imageUrl,
            imageAlt: item.imageAlt || item.name,
            coverPosition: item.coverPosition || "50% 50%",
            coverZoom: Number(item.coverZoom) || 1,
            color: item.color || fallbackPrograms[index]?.color,
          }))
          .filter((item: ClassProgramItem) => item.slug && item.name);
        if (nextPrograms.length) setPrograms(nextPrograms);
      })
      .catch(() => undefined);

    fetch("/api/testimonials")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.testimonials)) return;
        const nextTestimonials = data.testimonials
          .filter((item: Testimonial) => item.parentName && (item.quote || item.quoteEn));
        if (nextTestimonials.length) setTestimonials(nextTestimonials);
      })
      .catch(() => undefined);

    return () => {
      alive = false;
    };
  }, []);

  return { heroSlides, wayItems, programs, testimonials };
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mx-auto mb-9 text-center">
      <h2 className="text-balance text-[30px] font-extrabold uppercase leading-tight text-[#991B1B] md:text-[36px]">
        {title}
      </h2>
      <span className="mx-auto mt-3 block h-[3px] w-12 rounded-full bg-[#d8b15f]" />
    </div>
  );
}

function VisitButton({ children }: { children: string }) {
  return (
    <Link
      href="/lien-he"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#b80000] px-6 text-[15px] font-extrabold text-white no-underline shadow-[0_12px_24px_rgba(153,27,27,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#991b1b] focus:outline-none focus:ring-4 focus:ring-[#ffc300]/35 active:translate-y-0"
    >
      {children}
      <ArrowRight aria-hidden className="size-4" strokeWidth={2.4} />
    </Link>
  );
}

function hasCustomHeroTitle(title: string | undefined) {
  const normalized = title?.trim().toLowerCase();
  return Boolean(normalized && normalized !== "banner princeton academy");
}

function Hero({ slides }: { slides: HeroSlide[] }) {
  const { lang } = useLanguage();
  const c = copy[lang];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!slides.length) {
      setActiveSlide(0);
      return;
    }
    setActiveSlide((current) => Math.min(current, slides.length - 1));
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[activeSlide];
  const slideTitle = hasCustomHeroTitle(slide?.title) ? slide?.title?.trim() : "";
  const titleLines = slideTitle
    ? slideTitle.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
    : [c.heroSmall, c.heroStrong];
  const subtitle = slide?.subtitle?.trim() || c.heroText;
  const ctaLabel = slide?.ctaLabel?.trim() || c.visit;
  const ctaHref = slide?.ctaHref?.trim() || "/lien-he";
  const desktopImageSrc = slide?.desktopImageUrl || slide?.mobileImageUrl || "";
  const mobileImageSrc = slide?.mobileImageUrl || slide?.desktopImageUrl || "";
  const imageAlt = slide?.desktopImageAlt || slide?.mobileImageAlt || "Cô giáo Princeton hướng dẫn bé vẽ tranh";
  
  const desktopPosition = slide?.desktopObjectPosition || "50% 50%";
  const mobilePosition = slide?.mobileObjectPosition || "50% 50%";
  
  const desktopZoom = Math.min(3, Math.max(0.5, Number(slide?.desktopZoom) || 1));
  const mobileZoom = Math.min(3, Math.max(0.5, Number(slide?.mobileZoom) || 1));

  if (slide && desktopImageSrc) {
    return (
      <section className="relative overflow-hidden bg-[#f7f4f2]">
      <div className="relative w-full overflow-hidden bg-[#f7f4f2] aspect-[390/260] md:aspect-[2035/773]">
        <CoverImage
          src={desktopImageSrc}
          alt={imageAlt}
          position={desktopPosition}
          zoom={desktopZoom}
          mobileSrc={mobileImageSrc}
          mobilePosition={mobilePosition}
          mobileZoom={mobileZoom}
          priority={true}
        />
        <div className="absolute inset-y-0 left-0 z-[2] flex w-[72%] min-w-0 items-center bg-gradient-to-r from-[#f7f4f2] via-[#f7f4f2]/92 to-[#f7f4f2]/0 pl-5 pr-3 sm:w-[46%] sm:min-w-[360px] sm:pl-[clamp(38px,9.5vw,150px)] sm:pr-10">
          <div className="max-w-[290px] sm:max-w-[420px]">
            <h1 className="text-balance text-[clamp(22px,6.5vw,38px)] font-extrabold leading-[1.02] text-[#991B1B] sm:text-[clamp(38px,4.1vw,64px)]">
              <span className="block whitespace-nowrap">{titleLines[0]}</span>
              {titleLines.slice(1).map((line) => (
                <span key={line} className="block whitespace-nowrap text-[clamp(30px,8.5vw,52px)] uppercase leading-[0.95] text-[#b80000] sm:text-[clamp(50px,5.2vw,84px)]">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-2 max-w-[27ch] text-[clamp(12px,3.5vw,15px)] font-semibold leading-[1.35] text-[#59342f] sm:mt-[clamp(14px,1.8vw,26px)] sm:max-w-[31ch] sm:text-[clamp(15px,1.35vw,22px)] sm:leading-[1.55]">
              {subtitle}
            </p>
            <Link
              href={ctaHref}
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-3 rounded-none bg-[#b80000] px-6 py-3 text-[13px] font-extrabold uppercase text-white no-underline transition duration-200 hover:bg-[#991b1b] focus:outline-none focus:ring-4 focus:ring-[#ffc300]/35 active:translate-y-0 sm:mt-[clamp(18px,2.2vw,34px)] sm:min-h-12 sm:px-8 sm:text-[16px]"
            >
              {ctaLabel}
              <ArrowRight aria-hidden className="size-4" strokeWidth={2.4} />
            </Link>
          </div>
        </div>
        {slides.length > 1 ? (
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2" aria-label="Chọn banner">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full border border-white/80 shadow-[0_1px_4px_rgba(75,20,20,0.18)] transition-all duration-200 ${
                  index === activeSlide ? "w-8 bg-[#b80000]" : "w-2.5 bg-white/90"
                }`}
                aria-label={`Chuyển đến banner ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f4f2] min-h-[560px] animate-pulse" />
  );
}

function About() {
  const { lang } = useLanguage();
  const c = copy[lang];
  const stats = [
    { icon: School, value: "10+", label: lang === "en" ? "years" : "năm" },
    { icon: UsersRound, value: "30+", label: lang === "en" ? "teachers" : "giáo viên" },
    { icon: GraduationCap, value: "1000+", label: lang === "en" ? "students" : "học sinh" },
    { icon: Building2, value: "05", label: lang === "en" ? "campuses" : "cơ sở" },
  ];

  return (
    <section className="bg-[#f7f4f2] py-16 md:py-24 relative">
      <div className="absolute right-[24px] top-6 md:top-10 z-10 size-[80px] sm:size-[100px] md:size-[118px]">
        <img
          src={logoImage.src}
          alt="Princeton Academy"
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>
      <div className={`${shell} grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16`}>
        <div className="relative mx-auto flex w-full max-w-[760px] items-center justify-center gap-5 md:gap-8 lg:justify-start">
          <div className="mt-12 w-[49%] min-w-[160px] overflow-hidden border-2 border-[#991B1B] shadow-[0_18px_44px_rgba(82,40,23,0.10)]">
            <img
              src={aboutImage.src}
              alt="Cô giáo đồng hành cùng bé trong hoạt động sáng tạo"
              loading="lazy"
              className="aspect-[0.72/1] w-full object-cover"
            />
          </div>
          <div className="mb-12 w-[49%] min-w-[160px] overflow-hidden border-2 border-[#991B1B] shadow-[0_18px_44px_rgba(82,40,23,0.10)]">
            <img
              src={pathImageTwo.src}
              alt="Không gian học tập Princeton Academy"
              loading="lazy"
              className="aspect-[0.72/1] w-full object-cover"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[640px] lg:mx-0">
          <h2 className="text-[34px] font-extrabold leading-tight text-[#991B1B] md:text-[44px]">
            {c.aboutTitle}
          </h2>
          <span className="mt-4 block h-px w-24 bg-[#D4AF37]" />
          <p className="mt-7 max-w-[58ch] text-[15px] font-medium leading-7 text-[#4b3531] md:text-[16px] md:leading-8">
            {c.aboutText}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-y-7 md:grid-cols-4 md:gap-y-0">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="px-3 text-left md:border-l md:border-[#ead9c9] md:first:border-l-0">
                  <Icon aria-hidden className="mb-3 size-5 text-[#9b6f2f]" strokeWidth={1.75} />
                  <p className="text-[25px] font-extrabold leading-none text-[#2b120e]">{stat.value}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.08em] leading-4 text-[#5d332b]">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  const { lang } = useLanguage();

  return (
    <section className="bg-[#f7f4f2] py-16 md:py-20">
      <div className={shell}>
        <SectionTitle title={copy[lang].whyTitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.viTitle}
                className="group relative min-h-[220px] overflow-hidden rounded-none border-2 border-[#ead9c9] bg-gradient-to-b from-white to-[#fdfcfb] px-8 py-9 text-center shadow-[0_8px_24px_rgba(100,50,30,0.06)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#d6b58d] hover:shadow-[0_20px_40px_rgba(153,27,27,0.12)]"
              >
                {/* Premium bottom accent line on hover */}
                <span className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#d8a928]/0 via-[#d8a928] to-[#d8a928]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#fdf2f2] text-[#b80000] transition-all duration-500 ease-out group-hover:scale-110 group-hover:bg-[#991b1b] group-hover:text-[#ffc300] group-hover:shadow-[0_0_20px_rgba(153,27,27,0.2)]">
                  <Icon aria-hidden className="size-8" strokeWidth={1.8} />
                </div>
                <h3 className="mt-6 text-[19px] font-extrabold leading-tight text-[#991B1B] transition-colors group-hover:text-[#b80000]">
                  {lang === "en" ? item.enTitle : item.viTitle}
                </h3>
                <p className="mx-auto mt-3 max-w-[28ch] text-[15px] font-medium leading-relaxed text-[#5f4540]">
                  {lang === "en" ? item.enText : item.viText}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PrincetonWay({ items }: { items: PrincetonWayItem[] }) {
  const { lang } = useLanguage();
  const visibleItems = items.length ? items.slice(0, 4) : fallbackWayItems;

  return (
    <section className="bg-[#f7f4f2] py-14 md:py-16">
      <div className={shell}>
        <SectionTitle title={copy[lang].wayTitle} />
        <div className="grid gap-5 md:grid-cols-4">
          {visibleItems.map((item, index) => {
            const title = lang === "en" && item.titleEn ? item.titleEn : item.title;

            return (
              <Link
                href={item.slug ? `/phuong-phap-giang-day/${item.slug}` : "/con-duong-princeton"}
                key={`${item.slug ?? item.title}-${index}`}
                className="group relative aspect-[326/320] overflow-hidden rounded-none border-2 border-transparent bg-[#2f1515] text-white no-underline shadow-[0_12px_32px_rgba(76,35,25,0.15)] transition-all duration-300 hover:border-[#991b1b] hover:shadow-[0_20px_40px_rgba(153,27,27,0.2)]"
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                  <CoverImage
                    src={item.imageUrl}
                    alt={item.imageAlt || title}
                    position={item.coverPosition}
                    zoom={item.coverZoom}
                    frameAspect={326 / 320}
                  />
                </div>
                
                {/* Cinematic Bordeaux Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2b0808]/95 via-[#7a1212]/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Subtle Warm Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ffc300]/20 to-transparent opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />

                {/* Watermark Index */}
                <span className="pointer-events-none absolute -bottom-5 right-1 select-none text-[120px] font-black leading-none text-white/10 transition-all duration-500 ease-out group-hover:-translate-y-3 group-hover:text-[#ffc300]/15">
                  0{index + 1}
                </span>

                <div className="absolute inset-x-6 bottom-7 transition-transform duration-300 ease-out group-hover:-translate-y-2">
                  <h3 className="text-[22px] font-extrabold uppercase leading-[1.15] md:text-[24px]">
                    {title}
                  </h3>
                  <span className="mt-3 block h-[3px] w-0 rounded-full bg-[#ffc300] transition-all duration-500 ease-out group-hover:w-10" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Programs({ programs }: { programs: ClassProgramItem[] }) {
  const { lang } = useLanguage();

  return (
    <section className="bg-[#f7f4f2] py-16">
      <div className={shell}>
        <SectionTitle title={copy[lang].programTitle} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <Link
              href={`/chuong-trinh-hoc/${program.slug}`}
              key={program.slug}
              className="group flex flex-col overflow-hidden rounded-none border-2 border-[#ead9c9] bg-white text-[#2f1515] no-underline shadow-[0_8px_24px_rgba(100,50,30,0.06)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#d6b58d] hover:shadow-[0_20px_40px_rgba(153,27,27,0.12)]"
            >
              <div className="relative aspect-[326/185] overflow-hidden" style={{ backgroundColor: program.color || "#fff1cf" }}>
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  {program.imageUrl ? (
                    <CoverImage
                      src={program.imageUrl}
                      alt={program.imageAlt || program.name}
                      position={program.coverPosition || "50% 50%"}
                      zoom={program.coverZoom || 1}
                      frameAspect={PROGRAM_CARD_IMAGE_ASPECT}
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex min-h-[140px] flex-1 flex-col p-6 transition-colors duration-300 group-hover:bg-[#fffefa]">
                <h3 className="text-[20px] font-extrabold leading-tight text-[#991B1B]">{program.name}</h3>
                <p className="mt-1.5 text-[14px] font-bold text-[#5f4540]">{program.age || program.label}</p>
                
                {/* Premium expanding CTA button */}
                <div className="mt-auto flex items-center justify-end pt-5">
                  <div className="relative flex h-10 w-10 items-center overflow-hidden rounded-full bg-[#fdf2f2] text-[#b80000] transition-all duration-400 ease-out group-hover:w-[145px] group-hover:bg-[#b80000] group-hover:text-white group-hover:shadow-[0_8px_16px_rgba(184,0,0,0.25)]">
                    <span className="pl-5 text-[13px] font-extrabold uppercase tracking-wide whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-100">
                      {copy[lang].detail}
                    </span>
                    <div className="absolute right-[10px] grid size-5 place-items-center rounded-full transition-transform duration-300 ease-out group-hover:-rotate-45">
                      <ArrowRight aria-hidden className="size-4" strokeWidth={2.4} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const { lang } = useLanguage();
  const pageSize = 3;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const canRotate = testimonials.length > pageSize;
  const visibleTestimonials = useMemo(
    () =>
      canRotate
        ? Array.from({ length: pageSize }, (_, offset) => testimonials[(activeIndex + offset) % testimonials.length])
        : testimonials.slice(0, pageSize),
    [activeIndex, canRotate, testimonials],
  );

  useEffect(() => {
    setActiveIndex((index) => (testimonials.length ? Math.min(index, testimonials.length - 1) : 0));
  }, [testimonials.length]);

  const handleMobileScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.clientWidth;
    const gap = 20; // gap-5 = 20px
    const index = Math.round(scrollLeft / (width + gap));
    setActiveMobileIndex(index);
  };

  const scrollToMobileIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.clientWidth;
    const gap = 20;
    scrollContainerRef.current.scrollTo({ left: index * (width + gap), behavior: "smooth" });
    setActiveMobileIndex(index);
  };

  const renderCard = (testimonial: Testimonial, index: number, isMobileCard: boolean) => {
    const parentName =
      lang === "en" && testimonial.parentNameEn
        ? testimonial.parentNameEn
        : testimonial.parentName;
    const quoteText =
      lang === "en" && testimonial.quoteEn ? testimonial.quoteEn : testimonial.quote;
    
    return (
      <article
        key={`${parentName}-${index}`}
        className={`flex min-h-[252px] flex-col border-2 border-[#991B1B] bg-[#fffefa] p-7 shadow-[4px_4px_0_rgba(153,27,27,0.2)] ${
          isMobileCard ? "w-full shrink-0 snap-center" : ""
        }`}
      >
        <div className="flex items-center justify-between text-[#d8a928]">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <Star key={starIndex} aria-hidden className="size-4 fill-current" />
            ))}
          </div>
          <img
            src={logoImage.src}
            alt="Princeton Academy"
            loading="lazy"
            className="size-16 object-contain"
          />
        </div>
        <p className="mt-5 flex-1 text-[15px] font-medium leading-7 text-[#4b3531]">
          {quoteText}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-[#b80000] text-white">
            {testimonial.avatarUrl ? (
              <img
                src={testimonial.avatarUrl}
                alt={testimonial.avatarAlt || parentName}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <Baby aria-hidden className="size-5" />
            )}
          </div>
          <div>
            <p className="text-[15px] font-extrabold leading-5 text-[#2f1515]">{parentName}</p>
            <p className="text-[13px] font-semibold text-[#7b5a54]">
              {testimonial.studentName || copy[lang].parent}
            </p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section className="bg-[#f7f4f2] py-16 md:py-20">
      <div className={shell}>
        <SectionTitle title={copy[lang].testimonialTitle} />
        
        {/* Mobile View: Horizontal Scroll */}
        <div className="md:hidden">
          <div 
            ref={scrollContainerRef}
            onScroll={handleMobileScroll}
            className="flex items-stretch snap-x snap-mandatory gap-5 overflow-x-auto pb-4" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, i) => renderCard(t, i, true))}
          </div>
          {testimonials.length > 1 && (
            <div className="mt-5 flex justify-center gap-2" aria-label="Chọn nhóm chia sẻ phụ huynh">
              {testimonials.map((testimonial, index) => (
                <button
                  key={`mobile-dot-${testimonial.id ?? index}`}
                  type="button"
                  onClick={() => scrollToMobileIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    index === activeMobileIndex ? "w-8 bg-[#b80000]" : "w-2.5 bg-[#d8b15f]"
                  }`}
                  aria-label={`Xem chia sẻ nhận xét ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop View: Grid with Pagination */}
        <div className="hidden md:block">
          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {visibleTestimonials.map((t, i) => renderCard(t, i, false))}
          </div>
          {canRotate ? (
            <div className="mt-7 flex justify-center gap-2" aria-label="Chọn nhóm chia sẻ phụ huynh">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id ?? `${testimonial.parentName}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    index === activeIndex ? "w-8 bg-[#b80000]" : "w-2.5 bg-[#d8b15f]"
                  }`}
                  aria-label={`Xem chia sẻ bắt đầu từ nhận xét ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}


function CampusAndForm() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState(0);
  const [audience, setAudience] = useState<"parent" | "partner">("parent");
  const campus = campuses[selected] ?? campuses[0];
  const isEn = lang === "en";
  const campusName = isEn ? campus.nameEn || campus.name : campus.name;
  const campusAddress = isEn ? campus.addressEn || campus.address : campus.address;

  const tabs = [
    { key: "parent", labelVi: "Phụ huynh", labelEn: "Parents" },
    { key: "partner", labelVi: "Đối tác", labelEn: "Partners" },
  ] as const;

  const descVi =
    audience === "parent"
      ? "Quý phụ huynh vui lòng điền thông tin vào phiếu dưới đây. Bộ phận tuyển sinh sẽ liên hệ hỗ trợ trong thời gian sớm nhất."
      : "Quý đối tác vui lòng điền thông tin để chúng tôi liên hệ tư vấn về các cơ hội hợp tác cùng Princeton Academy.";
  const descEn =
    audience === "parent"
      ? "Please complete the details below. Our admissions representatives will contact you shortly."
      : "Please fill in your details and our partnership team will get in touch with you soon.";

  return (
    <section className="border-t border-[#ead9c9] bg-[#f7f4f2] py-16 md:py-20">
      <div className={`${shell} grid items-stretch gap-10 lg:grid-cols-[1fr_1fr]`}>
        <div className="flex h-full flex-col">
          <h2 className="text-[26px] font-extrabold uppercase leading-tight text-[#991B1B] md:text-[30px]">
            {copy[lang].campusTitle}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-[0.9fr_1.1fr] flex-grow">
            <div className="campus-scroll max-h-[610px] md:max-h-none md:h-full overflow-y-auto pl-2">
              <div className="space-y-3">
                {campuses.map((item, index) => {
                  const active = index === selected;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => setSelected(index)}
                      className={[
                        "flex w-full items-start gap-3 rounded-[8px] border p-3 text-left transition duration-200 focus:outline-none focus:ring-4 focus:ring-[#ffc300]/35",
                        active
                          ? "border-[#b80000] bg-white shadow-[0_8px_20px_rgba(68,31,19,0.08)]"
                          : "border-transparent bg-transparent hover:bg-white",
                      ].join(" ")}
                    >
                      <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-[#b80000]" />
                      <span>
                        <span className="block text-[14px] font-extrabold leading-5 text-[#2f1515]">
                          {isEn ? item.nameEn || item.name : item.name}
                        </span>
                        <span className="mt-1 block text-[12px] font-medium leading-5 text-[#5f4540]">
                          {isEn ? item.addressEn || item.address : item.address}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex min-h-[500px] md:min-h-0 md:h-full flex-col overflow-hidden rounded-[8px] border border-[#ead9c9] bg-white shadow-[0_10px_28px_rgba(68,31,19,0.06)]">
              <iframe
                title={campusName}
                src={campusMapUrl(campusAddress)}
                className="min-h-[320px] flex-1 border-0"
                loading="lazy"
              />
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <p className="min-w-0 truncate text-[13px] font-bold text-[#59342f]">{campusName}</p>
                <a
                  href={campusMapLink(campusAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[13px] font-extrabold text-[#b80000] no-underline hover:text-[#8f0000]"
                >
                  {copy[lang].map}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col">
          <div className="lg:mt-[56px] flex-grow bg-white border-2 border-[#800000] shadow-[6px_6px_0_#ead6bf] flex flex-col rounded-none overflow-hidden">
            {/* Audience Tabs */}
            <div className="grid grid-cols-2 border-b-2 border-[#800000]">
              {tabs.map((tab) => {
                const isActive = audience === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setAudience(tab.key)}
                    className={[
                      "py-4 text-[15px] font-extrabold uppercase tracking-wide transition-colors duration-200",
                      isActive
                        ? "bg-[#b80000] text-white"
                        : "bg-white text-[#b80000] hover:bg-[#fff1f1]",
                    ].join(" ")}
                  >
                    {isEn ? tab.labelEn : tab.labelVi}
                  </button>
                );
              })}
            </div>

            {/* Form Content */}
            <div className="p-6 flex-grow flex flex-col justify-center">
              <div className="mb-6 flex justify-center">
                <img
                  src={logoImage.src}
                  alt="Princeton Academy Logo"
                  loading="lazy"
                  className="h-28 md:h-32 object-contain"
                />
              </div>
              <h2 className="text-[22px] font-extrabold uppercase text-[#991B1B] mb-2 tracking-wide">
                {isEn ? "Online Registration" : "Thông Tin Đăng Ký"}
              </h2>
              <p className="text-[14px] font-semibold text-[#6f3129] mb-8 leading-relaxed">
                {isEn ? descEn : descVi}
              </p>
              <EnrollmentLeadForm variant="mobile" audience={audience} submitLabel={copy[lang].visit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PrincetonHomeBody() {
  const { heroSlides, wayItems, programs, testimonials } = useHomepageData();

  return (
    <main className="overflow-x-hidden bg-[#f7f4f2] text-[#2f1515]">
      <Hero slides={heroSlides} />
      <About />
      <WhyChoose />
      <PrincetonWay items={wayItems} />
      <Programs programs={programs} />
      <Testimonials testimonials={testimonials} />
      <CampusAndForm />
    </main>
  );
}
