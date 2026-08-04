import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import FacilityCarousel from "@/components/Shared/FacilityCarousel";
import SiteFooter from "@/components/Shared/SiteFooter";
import { CoverImage } from "@/components/Shared/CoverImage";
import { getAboutContent } from "@/lib/content";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import imgHero from "@/assets/1785508275307_2464196110406402971_2464196110406402971_908152b1927fedcdd7fc0a83d44529f3.jpg";

export const metadata: Metadata = {
  title: "Ket noi gia dinh | Truong Mam non Princeton",
  description:
    "Princeton Academy mang den moi truong mam non hien dai, yeu thuong va giau trai nghiem cho tre.",
  openGraph: {
    title: "Ket noi gia dinh | Truong Mam non Princeton",
    description:
      "Kham pha moi truong hoc tap, chuong trinh giao duc va hanh trinh phat trien tai Princeton Academy.",
  },
};

export const dynamic = "force-dynamic";

function assetSrc(image: { src: string } | string) {
  return typeof image === "string" ? image : image.src;
}

function LuxuryFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[32px] border border-[#e6d9cf] bg-white/60 p-2 shadow-[0_28px_70px_rgba(64,22,14,0.10)] ${className}`}>
      <div className="overflow-hidden rounded-[24px] bg-[#fffefa] shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
        {children}
      </div>
    </div>
  );
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

function PrimaryCta({ href, children }: { href: string; children: React.ReactNode }) {
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
    { number: "10", label: t("about.stats.campus") },
    { number: "02", label: t("about.stats.language") },
    { number: "10+", label: t("about.stats.club") },
    { number: "30+", label: t("about.stats.event") },
  ];

  const facilitySlides = aboutContent.facilityImages.map((item) => ({
    image: item.imageUrl,
    title: item.title,
  }));
  const momentSlides = aboutContent.galleryImages.map((item, index) => ({
    image: item.url,
    title: item.title || item.alt || t("about.momentDefault").replace("{n}", `${index + 1}`),
  }));
  const teachers = aboutContent.teacherTeamItems.map((item) => ({
    id: item.id,
    icon: item.imageUrl,
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

      <section className="relative px-4 py-12 md:px-10 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#991B1B_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
        <div className="relative mx-auto grid max-w-[1360px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="about-luxury-rise">
            <p className="mb-5 inline-flex rounded-full border border-[#c8a46f] bg-[#fff9ed] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8b642f]">
              {t("about.badge")}
            </p>
            <h1 className="max-w-[780px] text-balance text-[44px] font-extrabold uppercase leading-[0.98] text-[#991B1B] md:text-[74px]">
              {t("about.heroTitle")}
            </h1>
            <p className="mt-7 max-w-[670px] text-[17px] font-medium leading-8 text-[#5d332b] md:text-[22px] md:leading-9">
              {t("about.heroText")}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <PrimaryCta href="/dang-ky">{t("about.ctaButton")}</PrimaryCta>
              <Link
                href="/lien-he"
                className="rounded-full border border-[#d8c8bb] bg-white/70 px-6 py-4 text-[14px] font-extrabold uppercase text-[#991B1B] no-underline transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[#c8a46f] hover:bg-white"
              >
                {t("nav.register")}
              </Link>
            </div>
          </div>

          <LuxuryFrame className="about-luxury-rise [animation-delay:120ms]">
            <div className="relative">
              <img
                src={imgHero.src}
                alt={t("about.heroImageAlt")}
                className="h-[360px] w-full object-cover md:h-[620px]"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[22px] border border-white/45 bg-[#2b120e]/[0.72] p-5 text-white shadow-[0_18px_50px_rgba(43,18,14,0.22)] md:inset-x-6 md:bottom-6 md:p-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#f1d49b]">
                  Princeton Academy
                </p>
                <p className="mt-2 max-w-[620px] text-[18px] font-semibold leading-7 md:text-[22px]">
                  {isEn ? "A refined learning environment shaped around trust, care and daily discovery." : "Mot khong gian hoc tap duoc cham chut bang niem tin, su cham soc va nhung kham pha moi ngay."}
                </p>
              </div>
            </div>
          </LuxuryFrame>
        </div>
      </section>

      <section className="px-4 pb-10 md:px-10 md:pb-20">
        <div className="mx-auto grid max-w-[1360px] gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="about-luxury-rise rounded-[28px] border border-[#e4d7cd] bg-white/[0.72] p-7 shadow-[0_22px_58px_rgba(64,22,14,0.08)]"
              style={{ animationDelay: `${160 + index * 70}ms` }}
            >
              <p className="text-[48px] font-extrabold leading-none text-[#991B1B] md:text-[60px]">
                {stat.number}
              </p>
              <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#7a4b35]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {facilitySlides.length ? (
        <section className="px-4 py-14 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[1360px] items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
            <LuxuryFrame className="order-2 lg:order-1">
              <FacilityCarousel slides={facilitySlides} />
            </LuxuryFrame>
            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="Campus"
                title={t("about.facilityTitle")}
                text={t("about.facilityText")}
              />
            </div>
          </div>
        </section>
      ) : null}

      {momentSlides.length ? (
        <section className="px-4 py-14 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[1360px] items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <SectionHeading
              eyebrow="Moments"
              title={t("about.momentTitle")}
              text={t("about.momentText")}
            />
            <LuxuryFrame>
              <FacilityCarousel slides={momentSlides} imageContext={t("about.momentContext")} />
            </LuxuryFrame>
          </div>
        </section>
      ) : null}

      {teachers.length ? (
        <section className="px-4 py-14 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1360px]">
            <SectionHeading
              eyebrow="Faculty"
              title={t("about.teacherTitle")}
              text={t("about.teacherText")}
              align="center"
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {teachers.map((teacher, index) => (
                <article
                  key={`teacher-${teacher.id}-${index}`}
                  className="about-luxury-rise overflow-hidden rounded-[30px] border border-[#e4d7cd] bg-white/[0.72] p-2 shadow-[0_24px_64px_rgba(64,22,14,0.08)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_30px_76px_rgba(64,22,14,0.12)]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="overflow-hidden rounded-[22px] bg-[#fffefa]">
                    {teacher.icon ? (
                      <div className="relative h-[250px] overflow-hidden">
                        <CoverImage
                          src={assetSrc(teacher.icon)}
                          alt={teacher.title}
                          zoom={teacher.coverZoom}
                          position={teacher.coverPosition}
                          frameAspect={1.45}
                        />
                      </div>
                    ) : null}
                    <div className="p-6">
                      <h3 className="text-[24px] font-extrabold leading-tight text-[#991B1B]">
                        {teacher.title}
                      </h3>
                      <p className="mt-4 text-[16px] font-medium leading-7 text-[#5d332b]">
                        {teacher.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-14 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1360px] gap-6 rounded-[36px] bg-[#2b120e] p-2 shadow-[0_36px_90px_rgba(43,18,14,0.20)] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="overflow-hidden rounded-[28px] bg-black">
            <iframe
              src="https://www.youtube.com/embed/T5pfrxobVtE?vq=hd720&rel=0"
              title={t("about.videoTitle")}
              className="h-[280px] w-full md:h-[520px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col justify-center rounded-[28px] border border-white/10 bg-[#3a1712] p-8 text-white md:p-12">
            <p className="mb-4 inline-flex w-fit rounded-full border border-[#d6b06f]/40 bg-white/[0.08] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f1d49b]">
              Visit
            </p>
            <h2 className="text-balance text-[34px] font-extrabold uppercase leading-[1.04] md:text-[52px]">
              {t("about.ctaTitle")}
            </h2>
            <p className="mt-5 text-[16px] font-medium leading-7 text-white/[0.86] md:text-[20px] md:leading-8">
              {t("about.ctaText")}
            </p>
            <div className="mt-8">
              <PrimaryCta href="/dang-ky">{t("about.ctaButton")}</PrimaryCta>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
