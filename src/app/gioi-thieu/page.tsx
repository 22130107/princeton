import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Building2, GraduationCap, School, UsersRound } from "lucide-react";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import MomentGalleryGrid from "@/components/Shared/MomentGalleryGrid";
import SiteFooter from "@/components/Shared/SiteFooter";
import TeacherShowcase from "@/components/Shared/TeacherShowcase";
import { getAboutContent } from "@/lib/content";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import imgHero from "@/assets/1785508275307_2464196110406402971_2464196110406402971_908152b1927fedcdd7fc0a83d44529f3.jpg";
import FacilityImageCarousel from "@/components/Shared/FacilityImageCarousel";

export const metadata: Metadata = {
  title: "Kết nối gia đình | Trường Mầm non Princeton",
  description:
    "Princeton Academy mang đến môi trường mầm non hiện đại, yêu thương và giàu trải nghiệm cho trẻ.",
  openGraph: {
    title: "Kết nối gia đình | Trường Mầm non Princeton",
    description:
      "Khám phá môi trường học tập, chương trình giáo dục và hành trình phát triển tại Princeton Academy.",
  },
};

export const dynamic = "force-dynamic";

function assetSrc(image: { src: string } | string) {
  return typeof image === "string" ? image : image.src;
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[780px] text-center" : "max-w-[720px]"}>
      <p className="mb-4 inline-flex rounded-full border border-[#c8a46f] bg-[#fff9ed] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b642f]">
        {eyebrow}
      </p>
      <h2 className="text-balance text-[34px] font-extrabold uppercase leading-[1.02] text-[#991B1B] md:text-[56px]">
        {title}
      </h2>
      <p className="mt-5 text-[16px] font-medium leading-7 text-[#5d332b] md:text-[20px] md:leading-8">
        {text}
      </p>
    </div>
  );
}

function PrimaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-4 rounded-full bg-[#991B1B] py-2 pl-6 pr-2 text-[14px] font-extrabold uppercase text-white no-underline shadow-[0_18px_42px_rgba(153,27,27,0.24)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-[#7f1515] hover:shadow-[0_22px_54px_rgba(153,27,27,0.32)] active:scale-[0.98]"
    >
      <span>{children}</span>
      <span className="flex size-9 items-center justify-center rounded-full bg-white/[0.14] text-[18px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5">
        &gt;
      </span>
    </Link>
  );
}

export default async function GioiThieuPage() {
  const lang = await getServerLang();
  const isEn = lang === "en";
  const t = await getServerT();
  const aboutContent = await getAboutContent();

  const stats = [
    { number: "10+", label: isEn ? "Years" : "Năm", Icon: School },
    { number: "30+", label: isEn ? "Teachers" : "Giáo viên", Icon: UsersRound },
    { number: "1000+", label: isEn ? "Students" : "Học sinh", Icon: GraduationCap },
    { number: "05", label: isEn ? "Campuses" : "Cơ sở", Icon: Building2 },
  ];

  const facilitySlides = aboutContent.facilityImages.map((item) => ({
    image: item.imageUrl,
    title: isEn && item.titleEn ? item.titleEn : item.title,
    description: item.description,
  }));

  const facilityBullets = isEn
    ? [
        "Bright classrooms shaped for focused learning and daily creativity.",
        "Purposeful learning corners for reading, science, art and discovery.",
        "Safe activity spaces planned for preschool movement and exploration.",
      ]
    : [
        "Không gian lớp học sáng thoáng, tối ưu cho việc học tập và sáng tạo.",
        "Các góc đọc sách, khoa học, nghệ thuật được bố trí theo mục tiêu học tập.",
        "Khu vận động an toàn, phù hợp với nhịp phát triển của trẻ mầm non.",
      ];
  const momentSlides = aboutContent.galleryImages.map((item, index) => ({
    image: item.url,
    title: item.title || item.alt || t("about.momentDefault").replace("{n}", `${index + 1}`),
  }));
  const teachers = aboutContent.teacherTeamItems.map((item) => ({
    id: item.id,
    icon: item.imageUrl,
    imageAlt: item.imageAlt,
    title: isEn && item.titleEn ? item.titleEn : item.title,
    text: isEn && item.descriptionEn ? item.descriptionEn : item.description,
    coverPosition: item.coverPosition,
    coverZoom: item.coverZoom,
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7F4F2] pt-[64px] text-[#3f1f1b] md:pt-[99px]">
      <style>{`
        @keyframes about-luxury-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .about-luxury-rise {
          animation: about-luxury-rise 900ms cubic-bezier(0.32, 0.72, 0, 1) both;
        }
      `}</style>

      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative bg-[#F7F4F2]">
        <div className="mx-auto grid min-h-[calc(100dvh-64px)] max-w-[1480px] items-stretch md:min-h-[calc(100dvh-99px)] lg:grid-cols-[43%_57%]">
          <div className="about-luxury-rise flex flex-col justify-center px-5 py-14 sm:px-10 md:px-14 lg:px-16">
            <p className="mb-5 inline-flex w-fit border border-[#c8a46f] bg-[#fff9ed] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b642f]">
              {t("about.badge")}
            </p>
            <h1 className="max-w-[800px] text-balance text-[46px] font-extrabold uppercase leading-[0.92] text-[#991B1B] md:text-[68px] lg:text-[76px]">
              {t("about.heroTitle")}
            </h1>
            <p className="mt-8 max-w-[510px] text-[15px] font-medium leading-7 text-[#5d332b] md:text-[17px] md:leading-8">
              {t("about.heroText")}
            </p>
            <div className="mt-9">
              <Link
                href="#about-content"
                className="inline-flex items-center bg-[#991B1B] px-7 py-4 text-[12px] font-extrabold uppercase tracking-[0.04em] text-white no-underline shadow-[0_16px_34px_rgba(153,27,27,0.18)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-[#7f1515] active:scale-[0.98]"
              >
                {isEn ? "Explore more" : "Khám phá thêm"}
              </Link>
            </div>
          </div>

          <div className="flex min-h-[360px] items-center justify-center px-5 py-8 sm:px-8 lg:min-h-[calc(100dvh-99px)] lg:px-12 lg:py-12">
            <div className="relative w-full max-w-[720px]">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-[#991B1B] bg-transparent md:translate-x-6 md:translate-y-6"
              />
              <div className="relative border-2 border-[#991B1B] bg-white">
                <img
                  src={imgHero.src}
                  alt={t("about.heroImageAlt")}
                  className="aspect-[0.92] w-full object-cover lg:max-h-[calc(100dvh-180px)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-content" className="mt-8 bg-[#E2DBD9] px-4 py-8 md:mt-12 md:px-10 md:py-10">
        <div className="mx-auto grid max-w-[1120px] grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="about-luxury-rise relative flex min-h-[96px] flex-col items-center justify-center px-5 text-center md:min-h-[106px]"
              style={{ animationDelay: `${160 + index * 70}ms` }}
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-[#e7d8c9] md:block"
                />
              ) : null}
              <stat.Icon
                aria-hidden
                className="mb-2 size-7 text-[#991B1B] md:size-8"
                strokeWidth={2.1}
              />
              <p className="text-[30px] font-extrabold leading-none text-[#991B1B] md:text-[34px]">
                {stat.number}
              </p>
              <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.06em] text-[#5d332b]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {facilitySlides.length ? (
        <section className="px-4 py-14 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <FacilityImageCarousel slides={facilitySlides} isEn={isEn} />

            <div className="order-1 lg:order-2">
              <h2 className="max-w-[560px] text-balance text-[36px] font-extrabold uppercase leading-[1.02] text-[#991B1B] md:text-[56px]">
                {t("about.facilityTitle")}
              </h2>
              <p className="mt-8 max-w-[640px] text-[16px] font-medium leading-7 text-[#5d332b] md:text-[18px] md:leading-8">
                {t("about.facilityText")}
              </p>
              <ul className="mt-9 space-y-5">
                {facilityBullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 text-[15px] font-medium leading-7 text-[#5d332b] md:text-[16px]"
                  >
                    <span className="mt-[10px] size-1.5 shrink-0 rotate-45 bg-[#D4AF37]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {momentSlides.length ? (
        <section className="bg-[#F7F4F2] px-4 py-14 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1180px]">
            <div className="mx-auto max-w-[1180px] text-center">
              <h2 className="text-[30px] font-extrabold uppercase leading-[1.08] text-[#991B1B] md:text-[38px] lg:whitespace-nowrap lg:text-[42px] xl:text-[46px]">
                {t("about.momentTitle")}
              </h2>
              <p className="mx-auto mt-5 max-w-[780px] text-[15px] font-medium leading-7 text-[#3f1f1b] md:text-[17px] md:leading-8">
                {t("about.momentText")}
              </p>
            </div>

            <MomentGalleryGrid
              slides={momentSlides}
              imageContext={t("about.momentContext")}
              isEn={isEn}
            />
          </div>
        </section>
      ) : null}

      {teachers.length ? (
        <section className="bg-[#F7F4F2] px-4 py-14 md:px-10 md:py-24">
          <TeacherShowcase
            teachers={teachers}
            title={t("about.teacherTitle")}
            text={t("about.teacherText")}
            isEn={isEn}
          />
        </section>
      ) : null}

      <section className="px-4 py-14 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <div className="about-luxury-rise relative">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 bg-[#991B1B]/10 md:translate-x-3 md:translate-y-3"
            />
            <div className="relative flex flex-col border border-[#991B1B] bg-white lg:flex-row lg:items-stretch">
              <div className="flex w-full items-center p-5 md:p-8 lg:w-[55%] lg:p-10">
                <div className="relative aspect-video w-full overflow-hidden bg-[#e2dbd9]">
                  <iframe
                    src="https://www.youtube.com/embed/T5pfrxobVtE?vq=hd720&rel=0"
                    title={t("about.videoTitle")}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="flex w-full flex-col justify-center bg-[#F7F4F2] p-5 md:p-8 lg:w-[45%] lg:p-10">
                  <h2 className="text-balance text-[32px] font-extrabold uppercase leading-[1.08] text-[#991B1B] md:text-[44px] lg:text-[48px] xl:text-[52px]">
                    {t("about.ctaTitle")}
                  </h2>
                  <p className="mt-6 max-w-[480px] text-[16px] font-medium leading-relaxed text-[#5d332b] md:text-[18px]">
                    {t("about.ctaText")}
                  </p>
                  <div className="mt-10">
                    <PrimaryCta href="/dang-ky">{t("about.ctaButton")}</PrimaryCta>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
