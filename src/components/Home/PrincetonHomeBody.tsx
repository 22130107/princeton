"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Brain,
  Building2,
  GraduationCap,
  Heart,
  MapPin,
  Quote,
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
const WAY_CARD_FRAME_ASPECT = 326 / 220;
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

const fallbackPrograms: ClassProgramItem[] = classPrograms.slice(0, 4).map((program) => ({
  slug: program.slug,
  name: program.name,
  age: program.age,
  excerpt: program.excerpt,
  imageUrl: program.image.src,
  imageAlt: program.name,
  coverPosition: "50% 50%",
  coverZoom: 1,
  color: program.color,
}));

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

const pathCards = [
  { image: pathImageOne, viTitle: "Nuôi dưỡng trí tò mò", enTitle: "Curious minds" },
  { image: pathImageTwo, viTitle: "Tự lập", enTitle: "Independence" },
  { image: pathImageThree, viTitle: "Bản lĩnh", enTitle: "Confidence" },
  { image: pathImageFour, viTitle: "Yêu thương", enTitle: "Kindness" },
];

const fallbackWayItems: PrincetonWayItem[] = pathCards.map((card) => ({
  title: card.viTitle,
  titleEn: card.enTitle,
  imageUrl: card.image.src,
  imageAlt: card.viTitle,
  coverPosition: "50% 50%",
  coverZoom: 1,
}));

const fallbackTestimonials: Testimonial[] = [
  {
    parentName: "Nguyễn Minh Anh",
    parentNameEn: "Minh Anh Nguyen",
    studentName: "Bé An",
    quote:
      "Các cô giáo rất tận tâm và yêu trẻ. Bé nhà mình đi học rất vui, về nhà luôn kể những điều thú vị ở lớp.",
    quoteEn:
      "The teachers are caring and attentive. My child loves going to school and always comes home with stories from class.",
  },
  {
    parentName: "Trần Thu Hà",
    parentNameEn: "Thu Ha Tran",
    studentName: "Bé Bảo",
    quote:
      "Môi trường học tập tuyệt vời, chương trình hiện đại, giúp bé tự tin và chủ động hơn mỗi ngày.",
    quoteEn:
      "A wonderful learning environment with a modern program. My child is more confident and independent every day.",
  },
  {
    parentName: "Lê Quang Huy",
    parentNameEn: "Quang Huy Le",
    studentName: "Bé Minh",
    quote:
      "Nhà trường luôn lắng nghe và đồng hành cùng phụ huynh trên hành trình phát triển của con.",
    quoteEn:
      "The school listens and partners with parents throughout each child's development journey.",
  },
];

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
  const [useMobileImage, setUseMobileImage] = useState(false);

  useEffect(() => {
    const update = () => setUseMobileImage(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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
  const imageSrc =
    (useMobileImage ? slide?.mobileImageUrl || slide?.desktopImageUrl : slide?.desktopImageUrl || slide?.mobileImageUrl) ||
    "";
  const imageAlt =
    (useMobileImage ? slide?.mobileImageAlt || slide?.desktopImageAlt : slide?.desktopImageAlt || slide?.mobileImageAlt) ||
    "Cô giáo Princeton hướng dẫn bé vẽ tranh";
  const imagePosition = useMobileImage
    ? slide?.mobileObjectPosition || slide?.desktopObjectPosition || "50% 50%"
    : slide?.desktopObjectPosition || slide?.mobileObjectPosition || "50% 50%";
  const imageZoom = Math.min(
    3,
    Math.max(0.5, Number(useMobileImage ? slide?.mobileZoom || slide?.desktopZoom : slide?.desktopZoom || slide?.mobileZoom) || 1),
  );

  if (slide && imageSrc) {
    const bannerFrameAspect = useMobileImage ? HERO_MOBILE_BANNER_FRAME_ASPECT : HERO_BANNER_FRAME_ASPECT;

    return (
      <section className="relative overflow-hidden bg-[#f7f4f2]">
      <div className="relative w-full overflow-hidden bg-[#f7f4f2]" style={{ aspectRatio: bannerFrameAspect }}>
        <CoverImage
          src={imageSrc}
          alt={imageAlt}
          position={imagePosition}
          zoom={imageZoom}
          frameAspect={bannerFrameAspect}
        />
        <div className="absolute inset-y-0 left-0 z-[2] flex w-[64%] min-w-0 items-center bg-gradient-to-r from-[#f7f4f2] via-[#f7f4f2]/92 to-[#f7f4f2]/0 pl-5 pr-3 sm:w-[46%] sm:min-w-[360px] sm:pl-[clamp(38px,9.5vw,150px)] sm:pr-10">
          <div className="max-w-[250px] sm:max-w-[420px]">
            <h1 className="text-balance text-[clamp(24px,7vw,38px)] font-extrabold leading-[1.02] text-[#991B1B] sm:text-[clamp(38px,4.1vw,64px)]">
              <span className="block">{titleLines[0]}</span>
              {titleLines.slice(1).map((line) => (
                <span key={line} className="block text-[clamp(34px,10vw,52px)] uppercase leading-[0.95] text-[#b80000] sm:text-[clamp(50px,5.2vw,84px)]">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-2 max-w-[27ch] text-[clamp(12px,3.5vw,15px)] font-semibold leading-[1.35] text-[#59342f] sm:mt-[clamp(14px,1.8vw,26px)] sm:max-w-[31ch] sm:text-[clamp(15px,1.35vw,22px)] sm:leading-[1.55]">
              {subtitle}
            </p>
            <Link
              href={ctaHref}
              className="mt-3 inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[#b80000] px-4 text-[12px] font-extrabold text-white no-underline shadow-[0_12px_24px_rgba(153,27,27,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#991b1b] focus:outline-none focus:ring-4 focus:ring-[#ffc300]/35 active:translate-y-0 sm:mt-[clamp(18px,2.2vw,34px)] sm:min-h-11 sm:px-6 sm:text-[15px]"
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
    <section className="relative overflow-hidden bg-[#f7f4f2]">
      <div className="absolute inset-y-0 left-0 w-[58%] bg-gradient-to-r from-[#f7f4f2] via-[#f7f4f2]/95 to-[#f7f4f2]/0" />
      <div className={`${shell} relative grid min-h-[560px] items-center gap-8 py-14 lg:grid-cols-[0.82fr_1.18fr] lg:py-0`}>
        <div className="z-10 max-w-[520px]">
          <h1 className="text-balance text-[44px] font-extrabold leading-[1.04] text-[#991B1B] md:text-[58px]">
            <span className="block">{titleLines[0]}</span>
            {titleLines.slice(1).map((line) => (
              <span key={line} className="block text-[54px] uppercase leading-[0.96] text-[#b80000] md:text-[74px]">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[45ch] text-[18px] font-semibold leading-7 text-[#59342f]">
            {subtitle}
          </p>
          <div className="mt-8">
            <Link
              href={ctaHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#b80000] px-6 text-[15px] font-extrabold text-white no-underline shadow-[0_12px_24px_rgba(153,27,27,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#991b1b] focus:outline-none focus:ring-4 focus:ring-[#ffc300]/35 active:translate-y-0"
            >
              {ctaLabel}
              <ArrowRight aria-hidden className="size-4" strokeWidth={2.4} />
            </Link>
          </div>
          {slides.length > 1 ? (
            <div className="mt-6 flex gap-2" aria-label="Chọn banner">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    index === activeSlide ? "w-8 bg-[#b80000]" : "w-2.5 bg-[#d8b15f]"
                  }`}
                  aria-label={`Chuyển đến banner ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative min-h-[360px] lg:min-h-[560px]">
          {imageSrc ? (
            <CoverImage
              src={imageSrc}
              alt={imageAlt}
              position={imagePosition}
              zoom={imageZoom}
              frameAspect={HERO_BANNER_FRAME_ASPECT}
            />
          ) : (
            <img
              src={heroImage.src}
              alt="Cô giáo Princeton hướng dẫn bé vẽ tranh"
              className="absolute inset-0 h-full w-full rounded-[20px] object-cover object-center shadow-[0_18px_50px_rgba(90,24,24,0.12)] lg:rounded-none lg:shadow-none"
            />
          )}
          <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#f7f4f2]/70 via-[#f7f4f2]/12 to-transparent lg:rounded-none" />
        </div>
      </div>
    </section>
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
    <section className="bg-[#f7f4f2] py-16 md:py-24">
      <div className={`${shell} grid items-center gap-12 lg:grid-cols-[0.96fr_1.04fr] lg:gap-16`}>
        <div className="relative mx-auto flex w-full max-w-[760px] items-center justify-center gap-5 md:gap-8 lg:justify-start">
          <div className="mt-12 w-[49%] min-w-[160px] overflow-hidden border-2 border-[#991B1B] shadow-[0_18px_44px_rgba(82,40,23,0.10)]">
            <img
              src={aboutImage.src}
              alt="Cô giáo đồng hành cùng bé trong hoạt động sáng tạo"
              className="aspect-[0.72/1] w-full object-cover"
            />
          </div>
          <div className="mb-12 w-[49%] min-w-[160px] overflow-hidden border-2 border-[#991B1B] shadow-[0_18px_44px_rgba(82,40,23,0.10)]">
            <img
              src={pathImageTwo.src}
              alt="Không gian học tập Princeton Academy"
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
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.viTitle}
                className="min-h-[180px] rounded-[8px] border border-[#ead9c9] bg-white px-7 py-8 text-center shadow-[0_10px_28px_rgba(68,31,19,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d6b58d]"
              >
                <Icon aria-hidden className="mx-auto size-9 text-[#b80000]" strokeWidth={1.7} />
                <h3 className="mt-5 text-[18px] font-extrabold leading-6 text-[#991B1B]">
                  {lang === "en" ? item.enTitle : item.viTitle}
                </h3>
                <p className="mx-auto mt-3 max-w-[30ch] text-[14px] font-medium leading-6 text-[#5f4540]">
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
        <div className="grid gap-4 md:grid-cols-4">
          {visibleItems.map((item, index) => {
            const title = lang === "en" && item.titleEn ? item.titleEn : item.title;

            return (
            <Link
              href={item.slug ? `/phuong-phap-giang-day/${item.slug}` : "/con-duong-princeton"}
              key={`${item.slug ?? item.title}-${index}`}
              className="group relative aspect-[326/220] overflow-hidden rounded-[8px] bg-[#2f1515] text-white no-underline shadow-[0_12px_32px_rgba(76,35,25,0.12)]"
            >
              <CoverImage
                src={item.imageUrl}
                alt={item.imageAlt || title}
                position={item.coverPosition}
                zoom={item.coverZoom}
                frameAspect={WAY_CARD_FRAME_ASPECT}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/10 to-transparent" />
              <h3 className="absolute inset-x-4 bottom-5 text-[24px] font-extrabold uppercase leading-[1.05] md:text-[26px]">
                {title}
              </h3>
              <span className="absolute bottom-5 right-4 grid size-7 place-items-center rounded-full bg-[#ffc300] text-[#8f0000]">
                {index + 1}
              </span>
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <Link
              href={`/chuong-trinh-hoc/${program.slug}`}
              key={program.slug}
              className="group overflow-hidden rounded-[8px] border border-[#ead9c9] bg-white text-[#2f1515] no-underline shadow-[0_10px_28px_rgba(68,31,19,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-[#d6b58d]"
            >
              <div className="relative aspect-[326/185] overflow-hidden" style={{ backgroundColor: program.color || "#fff1cf" }}>
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
              <div className="flex min-h-[128px] flex-col p-5">
                <h3 className="text-[20px] font-extrabold leading-6 text-[#991B1B]">{program.name}</h3>
                <p className="mt-1 text-[14px] font-bold text-[#3b2522]">{program.age || program.label}</p>
                <span className="mt-auto inline-flex items-center justify-between pt-4 text-[14px] font-extrabold text-[#b80000]">
                  {copy[lang].detail}
                  <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-1" />
                </span>
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
  const [isMobile, setIsMobile] = useState(false);
  const pageSize = isMobile ? 1 : 3;
  const [activeIndex, setActiveIndex] = useState(0);
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

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="bg-[#f7f4f2] py-16 md:py-20">
      <div className={shell}>
        <SectionTitle title={copy[lang].testimonialTitle} />
        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => {
            const parentName =
              lang === "en" && testimonial.parentNameEn
                ? testimonial.parentNameEn
                : testimonial.parentName;
            const quoteText =
              lang === "en" && testimonial.quoteEn ? testimonial.quoteEn : testimonial.quote;
            return (
              <article
                key={`${parentName}-${index}`}
                className="flex h-full min-h-[252px] flex-col rounded-[8px] border border-[#ead9c9] bg-[#fffefa] p-7 shadow-[0_12px_32px_rgba(68,31,19,0.06)]"
              >
                <div className="flex items-center justify-between text-[#d8a928]">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} aria-hidden className="size-4 fill-current" />
                    ))}
                  </div>
                  <Quote aria-hidden className="size-7 text-[#ead9c9]" />
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
          })}
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
    </section>
  );
}

function CampusAndForm() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState(0);
  const campus = campuses[selected] ?? campuses[0];
  const isEn = lang === "en";
  const campusName = isEn ? campus.nameEn || campus.name : campus.name;
  const campusAddress = isEn ? campus.addressEn || campus.address : campus.address;

  return (
    <section className="border-t border-[#ead9c9] bg-[#f7f4f2] py-16 md:py-20">
      <div className={`${shell} grid items-stretch gap-10 lg:grid-cols-[1fr_1fr]`}>
        <div className="flex h-full flex-col">
          <h2 className="text-[26px] font-extrabold uppercase leading-tight text-[#991B1B] md:text-[30px]">
            {copy[lang].campusTitle}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
            <div className="campus-scroll max-h-[610px] overflow-y-auto pl-2">
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
            <div className="flex min-h-[610px] flex-col overflow-hidden rounded-[8px] border border-[#ead9c9] bg-white shadow-[0_10px_28px_rgba(68,31,19,0.06)] md:h-[610px]">
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
          <h2 className="text-[26px] font-extrabold uppercase leading-tight text-[#991B1B] md:text-[30px]">
            {copy[lang].formTitle}
          </h2>
          <div className="mt-6 flex-1 rounded-[8px] border border-[#ead9c9] bg-white p-5 shadow-[0_10px_28px_rgba(68,31,19,0.06)] md:p-6">
            <EnrollmentLeadForm variant="mobile" submitLabel={copy[lang].visit} />
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
