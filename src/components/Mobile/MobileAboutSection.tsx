"use client";

import svgPaths from "../Home/svg-g45k1n1pz5";
import Link from "next/link";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgWebKindergarten2Jpg1 from "../../assets/1785508275307_2464196110406402971_2464196110406402971_908152b1927fedcdd7fc0a83d44529f3.jpg";
import imgLogo from "../../assets/logo.png";

function CornerBrandLogo() {
  return (
    <div className="mb-7 flex w-full justify-center">
      <img src={imgLogo.src} alt="" className="h-[104px] w-[104px] object-contain" />
    </div>
  );
}

// ─── SVG decorations — tái sử dụng nguyên từ PC ───────────────────────────

function AboutCounter1Svg() {
  return (
    <div className="h-[33px] relative shrink-0 w-[38px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="54.028" preserveAspectRatio="none" viewBox="0 0 62.34 54.028" width="62.34">
        <g clipPath="url(#clip-mob-c1)">
          <path d={svgPaths.p38b18aa0} fill="white" fillOpacity="0.9" />
        </g>
        <defs>
          <clipPath id="clip-mob-c1"><rect fill="white" height="54.028" width="62.34" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AboutCounter2Svg() {
  return (
    <div className="h-[34px] relative shrink-0 w-[31px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="56" preserveAspectRatio="none" viewBox="0 0 50.4615 56" width="50.4615">
        <g clipPath="url(#clip-mob-c2)">
          <path d={svgPaths.p6cd0980} fill="white" fillOpacity="0.9" />
        </g>
        <defs>
          <clipPath id="clip-mob-c2"><rect fill="white" height="56" width="50.4615" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AboutCounter3Svg() {
  return (
    <div className="h-[34px] relative shrink-0 w-[36px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="56" preserveAspectRatio="none" viewBox="0 0 58.4615 56" width="58.4615">
        <g clipPath="url(#clip-mob-c3)">
          <path d={svgPaths.p2aec3580} fill="white" fillOpacity="0.9" />
        </g>
        <defs>
          <clipPath id="clip-mob-c3"><rect fill="white" height="56" width="58.4615" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AboutCounter4Svg() {
  return (
    <div className="h-[34px] relative shrink-0 w-[43px]">
      <svg className="absolute block inset-0 size-full" fill="none" height="56" preserveAspectRatio="none" viewBox="0 0 70.1867 56" width="70.1867">
        <g clipPath="url(#clip-mob-c4)">
          <path d={svgPaths.p3e097f00} fill="white" fillOpacity="0.9" />
        </g>
        <defs>
          <clipPath id="clip-mob-c4"><rect fill="white" height="56" width="70.1867" /></clipPath>
        </defs>
      </svg>
    </div>
  );
}

// ─── Stat item — giống cấu trúc PC: SVG absolute phía sau, số ở trên ──────

type StatProps = {
  decoration?: React.ReactNode;
  /** Mảng các span số, ví dụ ["02"] hoặc ["10", "+"] */
  numbers: string[];
  label: string;
};

function StatItem({ decoration, numbers, label }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-[10px]">
      {/* Row số + decoration */}
      <div className="flex items-start relative shrink-0">
        {/* SVG decoration absolute phía sau */}
        {decoration ? (
          <div
            className="absolute pointer-events-none"
            style={{ inset: "-17px 0px 17px -4px" }}
          >
            {decoration}
          </div>
        ) : null}
        {/* Số */}
        {numbers.map((n, i) => (
          <span
            key={i}
            className="relative font-extrabold text-[#b32025] text-[40px] leading-[40px] text-center"
            style={{
              textShadow:
                "2px 2px 0 white, -2px 2px 0 white, 2px -2px 0 white, -2px -2px 0 white",
            }}
          >
            {n}
          </span>
        ))}
      </div>
      {/* Label */}
      <span className="font-semibold text-[#620000] text-[14px] leading-snug text-center">
        {label}
      </span>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────

export default function MobileAboutSection() {
  const { t } = useLanguage();
  const stats: StatProps[] = [
    { decoration: <AboutCounter1Svg />, numbers: ["10"], label: t("home.about.stats.campus") },
    { decoration: <AboutCounter2Svg />, numbers: ["02"], label: t("about.stats.language") },
    { decoration: <AboutCounter3Svg />, numbers: ["02"], label: t("home.about.stats.curriculum") },
    { decoration: <AboutCounter4Svg />, numbers: ["10", "+"], label: t("about.stats.club") },
    { numbers: ["30", "+"], label: t("about.stats.event") },
  ];

  return (
    <section className="bg-[#e8f3e6] px-[14px] pb-8 pt-10">
      <CornerBrandLogo />

      {/* Heading */}
      <h2 className="mb-5 text-center text-[#b80000] font-extrabold text-[28px] uppercase leading-none">
        {t("home.about.title")}
      </h2>

      {/* Image */}
      <div className="relative mb-5 overflow-hidden rounded-[13px] shadow-[0_5px_12px_rgba(98,0,0,0.12)]">
        <img
          src={imgWebKindergarten2Jpg1.src}
          alt={t("home.about.imageAlt")}
          className="aspect-[15/14] w-full object-cover object-[48%_center]"
        />
      </div>

      {/* Description */}
      <div className="mx-auto max-w-[390px] text-center">
        <p className="mb-5 text-[#620000] font-medium text-[14px] leading-[1.75]">
          <strong className="font-extrabold">Princeton Academy</strong>{t("home.about.text1.a")}<strong className="font-extrabold">{t("home.about.text1.b")}</strong>{t("home.about.text1.c")}<strong className="font-extrabold">{t("home.about.text1.d")}</strong>{t("home.about.text1.e")}
        </p>
        <p className="text-[#620000] font-medium text-[14px] leading-[1.75]">
          {t("home.about.text2.a")}<strong className="font-extrabold">{t("home.about.text2.b")}</strong>{t("home.about.text2.c")}<strong className="font-extrabold">{t("home.about.text2.d")}</strong>{t("home.about.text2.e")}<strong className="font-extrabold">{t("home.about.text2.f")}</strong>{t("home.about.text2.g")}<strong className="font-extrabold">{t("home.about.text2.h")}</strong>{t("home.about.text2.i")}<strong className="font-extrabold">{t("home.about.text2.j")}</strong>{t("home.about.text2.k")}
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-7 flex max-w-[390px] flex-wrap items-start justify-center">
        {stats.map((stat, index) => (
          <div key={index} className="w-1/3 px-1">
            <StatItem {...stat} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/ket-noi-gia-dinh"
          className="inline-flex rounded-full bg-[#b80000] px-7 py-3 text-[16px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000] transition-transform duration-200 hover:-translate-y-0.5"
        >
          {t("home.readMore")}
        </Link>
      </div>
    </section>
  );
}
