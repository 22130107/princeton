"use client";

import svgPaths from "../svg-g45k1n1pz5";
import { useEffect, useRef, useState } from "react";
import { CoverImage } from "@/components/Shared/CoverImage";
import { useCountdownValues } from "@/components/Shared/useCountdownValues";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import { useRegistrationSectionSettings } from "@/components/Shared/useRegistrationSectionSettings";
import { PROMO_FRAME_ASPECT } from "@/lib/registration-section-config";
import type { RegistrationSectionSettings } from "@/lib/registration-section-config";
import imgTask73WassGiam50PhiGhiDanhDesktopTvCopy1Jpg from "../../../assets/c59ba9f7308cb819ecc8ed6f5ece801f19707aac.png";

type ProgramOption = {
  slug: string;
  label: string;
};

type CampusOption = {
  slug: string;
  label: string;
};

const fallbackPrograms: ProgramOption[] = [
  { slug: "penguin", label: "Penguin (2-3 TUỔI)" },
];

const appointmentTimeOptions: ProgramOption[] = [
  { slug: "", label: "Khung giờ" },
  { slug: "08:30", label: "08:30" },
  { slug: "09:30", label: "09:30" },
  { slug: "10:30", label: "10:30" },
  { slug: "14:00", label: "14:00" },
  { slug: "15:00", label: "15:00" },
  { slug: "16:00", label: "16:00" },
];

const SECTION_ARTBOARD_WIDTH = 1304;
const SECTION_ARTBOARD_HEIGHT = 907.69;

type PromoImage = {
  url: string;
  zoom: number;
  position: string;
};

function useRegistrationPromoAlt() {
  const { t } = useLanguage();
  return t("register.promoAlt");
}

function Task73WassGiam50PhiGhiDanhDesktopTvCopy1Jpg({ promo }: { promo: PromoImage }) {
  return (
    <div className="max-w-[764.3099975585938px] relative self-stretch shrink-0 w-[764.31px]" data-name="TASK-73-WASS-Giam-50-PHI-GHI-DANH_Desktop-TV-copy-1.jpg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <CoverImage
          src={promo.url}
          alt={useRegistrationPromoAlt()}
          zoom={promo.zoom}
          position={promo.position}
          frameAspect={PROMO_FRAME_ASPECT}
        />
      </div>
    </div>
  );
}

function Picture({ promo }: { promo: PromoImage }) {
  return (
    <div className="content-stretch flex h-[875.69px] items-start justify-center relative shrink-0" data-name="Picture">
      <Task73WassGiam50PhiGhiDanhDesktopTvCopy1Jpg promo={promo} />
    </div>
  );
}

function Container171({ promo }: { promo: PromoImage }) {
  return (
    <div className="content-stretch flex flex-col items-center max-w-[816.47998046875px] overflow-clip relative rounded-[48px] self-stretch shrink-0 w-[764.31px]" data-name="Container">
      <Picture promo={promo} />
    </div>
  );
}

function FormBgSvg() {
  return (
    <div className="h-[854.019px] relative shrink-0 w-[490.54px]" data-name="form-bg.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="854.019" preserveAspectRatio="none" viewBox="0 0 490.54 854.019" width="490.54">
        <g clipPath="url(#clip0_1_958)" id="form-bg.svg">
          <path d={svgPaths.p31c23df0} fill="var(--fill-0, #FFFEFA)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_958">
            <rect fill="white" height="854.019" width="490.54" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FormBgSvgClip() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center overflow-clip pb-[21.671px]" data-name="form-bg.svg clip">
      <FormBgSvg />
    </div>
  );
}

function SubmitBtnSvg() {
  return (
    <div className="h-[61.803px] relative shrink-0 w-[206.01px]" data-name="submit-btn.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="61.803" preserveAspectRatio="none" viewBox="0 0 206.01 61.803" width="206.01">
        <g clipPath="url(#clip0_1_1049)" id="submit-btn.svg">
          <path d={svgPaths.p2db05780} fill="var(--fill-0, #800000)" id="Vector" />
          <path d={svgPaths.p16f6d900} fill="var(--fill-0, #FFC400)" id="Vector_2" stroke="var(--stroke-0, #A30000)" strokeWidth="1.962" />
        </g>
        <defs>
          <clipPath id="clip0_1_1049">
            <rect fill="white" height="61.803" width="206.01" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SubmitBtnSvgClip() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center justify-center overflow-clip py-[0.098px]" data-name="submit-btn.svg clip">
      <SubmitBtnSvg />
    </div>
  );
}

function Button2({
  label,
  isSubmitting,
  onSubmit,
}: {
  label: string;
  isSubmitting: boolean;
  onSubmit: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={isSubmitting}
      onClick={onSubmit}
      className="content-stretch flex cursor-pointer items-center justify-center px-[16px] py-[6px] relative rounded-[4px] shrink-0 disabled:cursor-wait disabled:opacity-80"
      data-name="Button"
    >
      <SubmitBtnSvgClip />
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#b80000] text-[26px] text-center uppercase whitespace-nowrap">
        <p className="leading-[50px]">{isSubmitting ? <SubmittingText /> : label}</p>
      </div>
    </button>
  );
}

function SubmittingText() {
  const { t } = useLanguage();
  return <>{t("form.submitting")}</>;
}

function Container172({
  label,
  isSubmitting,
  onSubmit,
}: {
  label: string;
  isSubmitting: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-center left-[142.26px] pt-[10px] w-[206.01px] z-[2]" data-name="Container">
      <Button2 label={label} isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </div>
  );
}

function CloudSvg() {
  return (
    <div className="h-[114.364px] overflow-visible relative shrink-0 w-[442.54px]" data-name="cloud.svg">
      <svg className="absolute block inset-0 overflow-visible size-full" fill="none" height="114.364" preserveAspectRatio="none" viewBox="0 0 442.54 114.364" width="442.54">
        <path d={svgPaths.p85c0e40} fill="var(--fill-0, #B80000)" id="Vector" />
      </svg>
    </div>
  );
}

function CloudSvgClip() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[0_0.46px_0_0] items-center justify-center overflow-visible" data-name="cloud.svg clip">
      <CloudSvg />
    </div>
  );
}

function Container174({ title }: { title: string }) {
  const displayTitle = title.toLocaleUpperCase("vi-VN");

  return (
    <div className="content-stretch flex items-center justify-center min-w-[360px] px-[32px] py-[16px] relative shrink-0" data-name="Container">
      <div className="-translate-y-1/2 absolute bg-[#ffc300] left-0 rounded-[10px] size-[10px] top-1/2" data-name="Background" />
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-white whitespace-nowrap w-full">
        <p className="leading-[50px]">{displayTitle}</p>
      </div>
      <div className="-translate-y-1/2 absolute bg-[#ffc300] right-0 rounded-[10px] size-[10px] top-1/2" data-name="Background" />
    </div>
  );
}

function Heading6({ title }: { title: string }) {
  return (
    <div className="max-w-[480px] relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center max-w-[inherit] px-[24px] py-[16px] relative size-full">
          <CloudSvgClip />
          <Container174 title={title} />
        </div>
      </div>
    </div>
  );
}

function TimeBoxSvg() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="time-box.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="60" preserveAspectRatio="none" viewBox="0 0 60 60" width="60">
        <g clipPath="url(#clip0_1_944)" id="time-box.svg">
          <g filter="url(#filter0_i_1_944)" id="Group">
            <path d={svgPaths.p39455780} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <path d={svgPaths.p20745800} id="Vector_2" stroke="var(--stroke-0, #B80000)" />
          <path d={svgPaths.p27092040} fill="var(--fill-0, #B80000)" id="Vector_3" opacity="0.3" />
          <path d={svgPaths.p3a3bf000} fill="var(--fill-0, #B80000)" id="Vector_4" opacity="0.3" />
          <path d={svgPaths.p2e1e0680} fill="var(--fill-0, #B80000)" id="Vector_5" opacity="0.3" />
          <path d={svgPaths.p12fad00} fill="var(--fill-0, #B80000)" id="Vector_6" opacity="0.3" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="62" id="filter0_i_1_944" width="62" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.379808 0 0 0 0 0.021912 0 0 0 0 0.021912 0 0 0 0.2 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_944" />
          </filter>
          <clipPath id="clip0_1_944">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TimeBoxSvgClip() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center justify-center overflow-clip" data-name="time-box.svg clip">
      <TimeBoxSvg />
    </div>
  );
}

function Background14({ value }: { value: string }) {
  return (
    <div className="content-stretch flex size-[60px] items-center justify-center pb-[10.4px] pt-[9.6px] relative shrink-0" data-name="Background">
      <TimeBoxSvgClip />
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#b80000] text-[40px] text-center whitespace-nowrap">
        <p className="leading-[40px]">{value}</p>
      </div>
    </div>
  );
}

function Container177() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#b80000] text-[18px] text-center whitespace-nowrap">
        <p className="leading-[26px]">{t("countdown.days")}</p>
      </div>
    </div>
  );
}

function Container176({ value }: { value: string }) {
  return (
    <div className="content-stretch flex w-[60px] flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <Background14 value={value} />
      <Container177 />
    </div>
  );
}

function TimeBoxSvg1() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="time-box.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="60" preserveAspectRatio="none" viewBox="0 0 60 60" width="60">
        <g clipPath="url(#clip0_1_944)" id="time-box.svg">
          <g filter="url(#filter0_i_1_944)" id="Group">
            <path d={svgPaths.p39455780} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <path d={svgPaths.p20745800} id="Vector_2" stroke="var(--stroke-0, #B80000)" />
          <path d={svgPaths.p27092040} fill="var(--fill-0, #B80000)" id="Vector_3" opacity="0.3" />
          <path d={svgPaths.p3a3bf000} fill="var(--fill-0, #B80000)" id="Vector_4" opacity="0.3" />
          <path d={svgPaths.p2e1e0680} fill="var(--fill-0, #B80000)" id="Vector_5" opacity="0.3" />
          <path d={svgPaths.p12fad00} fill="var(--fill-0, #B80000)" id="Vector_6" opacity="0.3" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="62" id="filter0_i_1_944" width="62" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.379808 0 0 0 0 0.021912 0 0 0 0 0.021912 0 0 0 0.2 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_944" />
          </filter>
          <clipPath id="clip0_1_944">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TimeBoxSvgClip1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center justify-center overflow-clip" data-name="time-box.svg clip">
      <TimeBoxSvg1 />
    </div>
  );
}

function Background15({ value }: { value: string }) {
  return (
    <div className="content-stretch flex size-[60px] items-center justify-center pb-[10.4px] pt-[9.6px] relative shrink-0" data-name="Background">
      <TimeBoxSvgClip1 />
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#b80000] text-[40px] text-center whitespace-nowrap">
        <p className="leading-[40px]">{value}</p>
      </div>
    </div>
  );
}

function Container179() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#b80000] text-[18px] text-center whitespace-nowrap">
        <p className="leading-[26px]">{t("countdown.hours")}</p>
      </div>
    </div>
  );
}

function Container178({ value }: { value: string }) {
  return (
    <div className="content-stretch flex w-[60px] flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <Background15 value={value} />
      <Container179 />
    </div>
  );
}

function TimeBoxSvg2() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="time-box.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="60" preserveAspectRatio="none" viewBox="0 0 60 60" width="60">
        <g clipPath="url(#clip0_1_944)" id="time-box.svg">
          <g filter="url(#filter0_i_1_944)" id="Group">
            <path d={svgPaths.p39455780} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <path d={svgPaths.p20745800} id="Vector_2" stroke="var(--stroke-0, #B80000)" />
          <path d={svgPaths.p27092040} fill="var(--fill-0, #B80000)" id="Vector_3" opacity="0.3" />
          <path d={svgPaths.p3a3bf000} fill="var(--fill-0, #B80000)" id="Vector_4" opacity="0.3" />
          <path d={svgPaths.p2e1e0680} fill="var(--fill-0, #B80000)" id="Vector_5" opacity="0.3" />
          <path d={svgPaths.p12fad00} fill="var(--fill-0, #B80000)" id="Vector_6" opacity="0.3" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="62" id="filter0_i_1_944" width="62" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.379808 0 0 0 0 0.021912 0 0 0 0 0.021912 0 0 0 0.2 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_944" />
          </filter>
          <clipPath id="clip0_1_944">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TimeBoxSvgClip2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center justify-center overflow-clip" data-name="time-box.svg clip">
      <TimeBoxSvg2 />
    </div>
  );
}

function Background16({ value }: { value: string }) {
  return (
    <div className="content-stretch flex size-[60px] items-center justify-center pb-[10.4px] pt-[9.6px] relative shrink-0" data-name="Background">
      <TimeBoxSvgClip2 />
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#b80000] text-[40px] text-center whitespace-nowrap">
        <p className="leading-[40px]">{value}</p>
      </div>
    </div>
  );
}

function Container181() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#b80000] text-[18px] text-center whitespace-nowrap">
        <p className="leading-[26px]">{t("countdown.minutes")}</p>
      </div>
    </div>
  );
}

function Container180({ value }: { value: string }) {
  return (
    <div className="content-stretch flex w-[60px] flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <Background16 value={value} />
      <Container181 />
    </div>
  );
}

function TimeBoxSvg3() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="time-box.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="60" preserveAspectRatio="none" viewBox="0 0 60 60" width="60">
        <g clipPath="url(#clip0_1_944)" id="time-box.svg">
          <g filter="url(#filter0_i_1_944)" id="Group">
            <path d={svgPaths.p39455780} fill="var(--fill-0, white)" id="Vector" />
          </g>
          <path d={svgPaths.p20745800} id="Vector_2" stroke="var(--stroke-0, #B80000)" />
          <path d={svgPaths.p27092040} fill="var(--fill-0, #B80000)" id="Vector_3" opacity="0.3" />
          <path d={svgPaths.p3a3bf000} fill="var(--fill-0, #B80000)" id="Vector_4" opacity="0.3" />
          <path d={svgPaths.p2e1e0680} fill="var(--fill-0, #B80000)" id="Vector_5" opacity="0.3" />
          <path d={svgPaths.p12fad00} fill="var(--fill-0, #B80000)" id="Vector_6" opacity="0.3" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="62" id="filter0_i_1_944" width="62" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.379808 0 0 0 0 0.021912 0 0 0 0 0.021912 0 0 0 0.2 0" />
            <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_944" />
          </filter>
          <clipPath id="clip0_1_944">
            <rect fill="white" height="60" width="60" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TimeBoxSvgClip3() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center justify-center overflow-clip" data-name="time-box.svg clip">
      <TimeBoxSvg3 />
    </div>
  );
}

function Background17({ value }: { value: string }) {
  return (
    <div className="content-stretch flex size-[60px] items-center justify-center pb-[10.4px] pt-[9.6px] relative shrink-0" data-name="Background">
      <TimeBoxSvgClip3 />
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#b80000] text-[40px] text-center whitespace-nowrap">
        <p className="leading-[40px]">{value}</p>
      </div>
    </div>
  );
}

function Container183() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#b80000] text-[18px] text-center whitespace-nowrap">
        <p className="leading-[26px]">{t("countdown.seconds")}</p>
      </div>
    </div>
  );
}

function Container182({ value }: { value: string }) {
  return (
    <div className="content-stretch flex w-[60px] flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <Background17 value={value} />
      <Container183 />
    </div>
  );
}

function Container175({ settings }: { settings: RegistrationSectionSettings }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center justify-center pb-[12px] pt-[20px] relative size-full">
          <Container176 value={settings.countdownDays} />
          <Container178 value={settings.countdownHours} />
          <Container180 value={settings.countdownMinutes} />
          <Container182 value={settings.countdownSeconds} />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorderShadow({ settings }: { settings: RegistrationSectionSettings }) {
  return (
    <div className="bg-[#fff1f1] content-stretch drop-shadow-[4px_4px_0px_#b80000] flex flex-col items-start max-w-[400px] pb-px pt-[18.8px] px-[44px] relative rounded-[10px] shrink-0 w-[400px]" data-name="Background+Border+Shadow">
      <div aria-hidden className="absolute border border-[#b80000] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container175 settings={settings} />
    </div>
  );
}

function FieldBgSvg() {
  return (
    <div className="h-[50px] relative shrink-0 w-[362.745px]" data-name="field-bg.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="50" preserveAspectRatio="none" viewBox="0 0 362.745 50" width="362.745">
        <g clipPath="url(#clip0_1_961)" id="field-bg.svg">
          <path d={svgPaths.p330fad80} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #B80000)" strokeDasharray="1.96 3.92" strokeWidth="1.47059" />
        </g>
        <defs>
          <clipPath id="clip0_1_961">
            <rect fill="white" height="50" width="362.745" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Input() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Input">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[16px] relative size-full">
          <FieldBgSvg />
        </div>
      </div>
    </div>
  );
}

function Label({ visible }: { visible: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={`absolute content-stretch flex flex-col items-start left-0 px-[16px] right-0 top-[12px] pointer-events-none ${visible ? "" : "opacity-0"}`} data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Baloo_Paaji:Regular',Arial,Helvetica,sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#620000] text-[18px] whitespace-nowrap">
        <p>
          <span className="leading-[26px]">{`${t("form.name")} `}</span>
          <span className="leading-[26px] text-[red]">*</span>
        </p>
      </div>
    </div>
  );
}

function TextFieldOverlay({
  value,
  onChange,
  ariaLabel,
  topClass,
  type = "text",
  min,
}: {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  topClass: string;
  type?: "text" | "tel" | "email" | "date";
  min?: string;
}) {
  const inputValue = value ?? "";

  return (
    <input
      aria-label={ariaLabel}
      type={type}
      min={min}
      value={inputValue}
      onChange={(event) => onChange(event.target.value)}
      className={`absolute left-0 right-0 ${topClass} z-[2] h-[26px] bg-transparent px-[16px] py-0 font-['Baloo_Paaji:Regular',Arial,Helvetica,sans-serif] text-[18px] leading-[26px] text-[#620000] outline-none ${type === "date" && !inputValue ? "[&::-webkit-datetime-edit]:text-transparent" : ""}`}
    />
  );
}

function FieldLabel({
  text,
  visible,
  required = false,
}: {
  text: string;
  visible: boolean;
  required?: boolean;
}) {
  return (
    <div className={`absolute content-stretch flex flex-col items-start left-0 px-[16px] right-0 top-[15.4px] pointer-events-none ${visible ? "" : "opacity-0"}`} data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Baloo_Paaji:Regular',Arial,Helvetica,sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#620000] text-[18px] whitespace-nowrap">
        <p>
          <span className="leading-[26px]">{required ? `${text} ` : text}</span>
          {required ? <span className="leading-[26px] text-[red]">*</span> : null}
        </p>
      </div>
    </div>
  );
}

function Container185({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Label visible={!value} />
      <TextFieldOverlay ariaLabel={t("form.name")} topClass="top-[12px]" value={value} onChange={onChange} />
    </div>
  );
}

function FieldBgSvg1() {
  return (
    <div className="h-[50px] relative shrink-0 w-[362.745px]" data-name="field-bg.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="50" preserveAspectRatio="none" viewBox="0 0 362.745 50" width="362.745">
        <g clipPath="url(#clip0_1_961)" id="field-bg.svg">
          <path d={svgPaths.p330fad80} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #B80000)" strokeDasharray="1.96 3.92" strokeWidth="1.47059" />
        </g>
        <defs>
          <clipPath id="clip0_1_961">
            <rect fill="white" height="50" width="362.745" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function InputSDinThoi() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Input - Số điện thoại">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[16px] relative size-full">
          <FieldBgSvg1 />
        </div>
      </div>
    </div>
  );
}

function Label1({ visible }: { visible: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={`absolute content-stretch flex flex-col items-start left-0 px-[16px] right-0 top-[15.4px] pointer-events-none ${visible ? "" : "opacity-0"}`} data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Baloo_Paaji:Regular',Arial,Helvetica,sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#620000] text-[18px] whitespace-nowrap">
        <p>
          <span className="leading-[26px]">{`${t("form.phone")} `}</span>
          <span className="leading-[26px] text-[red]">*</span>
        </p>
      </div>
    </div>
  );
}

function Container186({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-start pt-[3.4px] relative shrink-0 w-full" data-name="Container">
      <InputSDinThoi />
      <Label1 visible={!value} />
      <TextFieldOverlay ariaLabel={t("form.phone")} topClass="top-[15.4px]" type="tel" value={value} onChange={onChange} />
    </div>
  );
}

function FieldBgSvg2() {
  return (
    <div className="h-[50px] relative shrink-0 w-[362.745px]" data-name="field-bg.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="50" preserveAspectRatio="none" viewBox="0 0 362.745 50" width="362.745">
        <g clipPath="url(#clip0_1_961)" id="field-bg.svg">
          <path d={svgPaths.p330fad80} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #B80000)" strokeDasharray="1.96 3.92" strokeWidth="1.47059" />
        </g>
        <defs>
          <clipPath id="clip0_1_961">
            <rect fill="white" height="50" width="362.745" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Input1() {
  return (
    <div className="h-[50px] relative shrink-0 w-full" data-name="Input">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[16px] relative size-full">
          <FieldBgSvg2 />
        </div>
      </div>
    </div>
  );
}

function Label2({ visible }: { visible: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={`absolute content-stretch flex flex-col items-start left-0 px-[16px] right-0 top-[15.4px] pointer-events-none ${visible ? "" : "opacity-0"}`} data-name="Label">
      <div className="[word-break:break-word] flex flex-col font-['Baloo_Paaji:Regular',Arial,Helvetica,sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#620000] text-[18px] whitespace-nowrap">
        <p>
          <span className="leading-[26px]">{`${t("form.email")} `}</span>
          <span className="leading-[26px] text-[red]">*</span>
        </p>
      </div>
    </div>
  );
}

function Container187({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-start pt-[3.4px] relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Label2 visible={!value} />
      <TextFieldOverlay ariaLabel={t("form.email")} topClass="top-[15.4px]" type="email" value={value} onChange={onChange} />
    </div>
  );
}

function DateField({
  value,
  onChange,
  min,
}: {
  value: string;
  onChange: (value: string) => void;
  min: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-start pt-[3.4px] relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <FieldLabel text={t("form.appointmentDate")} visible={!value} />
      <TextFieldOverlay
        ariaLabel={t("form.appointmentDate")}
        min={min}
        topClass="top-[15.4px]"
        type="date"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function FieldBgSvg3() {
  return (
    <div className="h-[49.125px] relative shrink-0 w-[356.4px]" data-name="field-bg.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="49.1254" preserveAspectRatio="none" viewBox="0 0 356.4 49.1254" width="356.4">
        <g clipPath="url(#clip0_1_941)" id="field-bg.svg">
          <path d={svgPaths.p39783640} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #B80000)" strokeDasharray="1.93 3.85" strokeWidth="1.44486" />
        </g>
        <defs>
          <clipPath id="clip0_1_941">
            <rect fill="white" height="49.1254" width="356.4" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function FieldBgSvgClip() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-center justify-center overflow-clip py-[0.437px]" data-name="field-bg.svg clip">
      <FieldBgSvg3 />
    </div>
  );
}

function Textbox({ label }: { label: string }) {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Textbox">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[16px] pr-[32px] relative size-full">
          <div className="[word-break:break-word] flex flex-col font-['Baloo_Paaji:Regular',Arial,Helvetica,sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#620000] text-[18px] w-full">
            <p className="leading-[26px]">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDownSvg() {
  return (
    <div className="h-[11px] relative shrink-0 w-[16px]" data-name="chevron-down.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="11" preserveAspectRatio="none" viewBox="0 0 16 11" width="16">
        <g clipPath="url(#clip0_1_938)" id="chevron-down.svg">
          <path clipRule="evenodd" d={svgPaths.p186ab200} fill="var(--fill-0, #620000)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_938">
            <rect fill="white" height="11" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Image11() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col h-[11px] items-center justify-center overflow-clip right-[24px] top-1/2 w-[16px]" data-name="Image">
      <ChevronDownSvg />
    </div>
  );
}

function ComboboxMenu({
  options,
  value,
  onChange,
  ariaLabel,
  placeholder,
}: {
  options: ProgramOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
}) {
  const selectValue = value ?? "";
  const selectedLabel =
    options.find((option) => option.slug === selectValue)?.label ?? placeholder ?? options[0]?.label ?? "";

  return (
    <div className="content-stretch flex flex-col h-[50px] items-start justify-center relative rounded-bl-[4px] rounded-br-[4px] shrink-0 w-full" data-name="Combobox menu">
      <FieldBgSvgClip />
      <Textbox label={selectedLabel} />
      <Image11 />
      <select
        aria-label={ariaLabel}
        value={selectValue}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 z-[2] cursor-pointer opacity-0"
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Container188({
  options,
  value,
  onChange,
  ariaLabel,
  placeholder,
}: {
  options: ProgramOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
}) {
  return (
    <div className="flex-[1_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ComboboxMenu
          options={options}
          value={value}
          onChange={onChange}
          ariaLabel={ariaLabel}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function ListboxMenu({
  options,
  value,
  onChange,
  ariaLabel,
  placeholder,
}: {
  options: ProgramOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
}) {
  return (
    <div className="bg-white min-h-[38px] relative shrink-0 w-full" data-name="Listbox menu">
      <div className="flex flex-row items-center justify-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-center flex flex-wrap items-center justify-center min-h-[inherit] pb-px pt-[4px] px-[6.8px] relative size-full">
          <Container188
            options={options}
            value={value}
            onChange={onChange}
            ariaLabel={ariaLabel}
            placeholder={placeholder}
          />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Label3({ text }: { text: string }) {
  return (
    <div className="[word-break:break-word] font-['Baloo_Paaji:Regular',Arial,Helvetica,sans-serif] leading-[0] max-w-[360.68px] not-italic relative shrink-0 text-[#620000] text-[16px] w-[360.68px]" data-name="Label">
      <div className="flex flex-col justify-center left-[28px] relative top-0 w-[332px]">
        <p className="leading-[18px] text-[13px]">{text}</p>
      </div>
    </div>
  );
}

function Input2({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="absolute left-0 top-0 z-[2] size-[18px] bg-white" data-name="Input">
      <div className="absolute inset-0 border border-[#c40000]" />
      {checked ? (
        <svg
          aria-hidden
          className="absolute left-[2px] top-[-3px] h-[18px] w-[20px]"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            d="M2 9.5L7.1 14.5L18 2"
            stroke="#c40000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      ) : null}
      <input
        aria-label={t("form.consent")}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="absolute left-0 top-0 z-[3] size-[24px] cursor-pointer opacity-0"
      />
    </div>
  );
}

function ListItem({
  consentText,
  checked,
  onToggle,
}: {
  consentText: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className="content-stretch flex flex-col items-start relative shrink-0 w-full cursor-pointer"
      data-name="List Item"
    >
      <Label3 text={consentText} />
      <Input2 checked={checked} onToggle={onToggle} />
    </label>
  );
}

function Container184({
  consentText,
  checked,
  onToggle,
  name,
  onNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  campuses,
  campusSlug,
  onCampusChange,
  programs,
  grade,
  onGradeChange,
  appointmentDate,
  onAppointmentDateChange,
  minAppointmentDate,
  appointmentTime,
  onAppointmentTimeChange,
}: {
  consentText: string;
  checked: boolean;
  onToggle: () => void;
  name: string;
  onNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  campuses: CampusOption[];
  campusSlug: string;
  onCampusChange: (value: string) => void;
  programs: ProgramOption[];
  grade: string;
  onGradeChange: (value: string) => void;
  appointmentDate: string;
  onAppointmentDateChange: (value: string) => void;
  minAppointmentDate: string;
  appointmentTime: string;
  onAppointmentTimeChange: (value: string) => void;
}) {
  const { t } = useLanguage();

  return (
    <div className="content-stretch flex flex-col gap-[12.6px] items-start relative shrink-0 w-full" data-name="Container">
      <Container185 value={name} onChange={onNameChange} />
      <Container186 value={phone} onChange={onPhoneChange} />
      <Container187 value={email} onChange={onEmailChange} />
      <ListboxMenu
        options={campuses}
        value={campusSlug}
        onChange={onCampusChange}
        ariaLabel={t("form.campus")}
        placeholder={t("form.campus")}
      />
      <ListboxMenu
        options={programs}
        value={grade}
        onChange={onGradeChange}
        ariaLabel={t("form.grade")}
      />
      <ListItem consentText={consentText} checked={checked} onToggle={onToggle} />
    </div>
  );
}






function Form({
  consentText,
  checked,
  onToggle,
  name,
  onNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  campuses,
  campusSlug,
  onCampusChange,
  programs,
  grade,
  onGradeChange,
  appointmentDate,
  onAppointmentDateChange,
  minAppointmentDate,
  appointmentTime,
  onAppointmentTimeChange,
}: {
  consentText: string;
  checked: boolean;
  onToggle: () => void;
  name: string;
  onNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  campuses: CampusOption[];
  campusSlug: string;
  onCampusChange: (value: string) => void;
  programs: ProgramOption[];
  grade: string;
  onGradeChange: (value: string) => void;
  appointmentDate: string;
  onAppointmentDateChange: (value: string) => void;
  minAppointmentDate: string;
  appointmentTime: string;
  onAppointmentTimeChange: (value: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[25.2px] items-start pt-[5.8px] relative shrink-0 w-[370px]" data-name="Form">
      <Container184
        consentText={consentText}
        checked={checked}
        onToggle={onToggle}
        name={name}
        onNameChange={onNameChange}
        phone={phone}
        onPhoneChange={onPhoneChange}
        email={email}
        onEmailChange={onEmailChange}
        campuses={campuses}
        campusSlug={campusSlug}
        onCampusChange={onCampusChange}
        programs={programs}
        grade={grade}
        onGradeChange={onGradeChange}
        appointmentDate={appointmentDate}
        onAppointmentDateChange={onAppointmentDateChange}
        minAppointmentDate={minAppointmentDate}
        appointmentTime={appointmentTime}
        onAppointmentTimeChange={onAppointmentTimeChange}
      />
    </div>
  );
}

function Container173({
  settings,
  checked,
  onToggleConsent,
  name,
  onNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  campuses,
  campusSlug,
  onCampusChange,
  programs,
  grade,
  onGradeChange,
  appointmentDate,
  onAppointmentDateChange,
  minAppointmentDate,
  appointmentTime,
  onAppointmentTimeChange,
}: {
  settings: RegistrationSectionSettings;
  checked: boolean;
  onToggleConsent: () => void;
  name: string;
  onNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  campuses: CampusOption[];
  campusSlug: string;
  onCampusChange: (value: string) => void;
  programs: ProgramOption[];
  grade: string;
  onGradeChange: (value: string) => void;
  appointmentDate: string;
  onAppointmentDateChange: (value: string) => void;
  minAppointmentDate: string;
  appointmentTime: string;
  onAppointmentTimeChange: (value: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center pb-[20px] pt-[12px] px-[24px] relative shrink-0" data-name="Container">
      <Heading6 title={settings.title} />
      {settings.showCountdown ? <BackgroundBorderShadow settings={settings} /> : null}
      {settings.showForm ? (
        <Form
          consentText={settings.consentText}
          checked={checked}
          onToggle={onToggleConsent}
          name={name}
          onNameChange={onNameChange}
          phone={phone}
          onPhoneChange={onPhoneChange}
          email={email}
          onEmailChange={onEmailChange}
          campuses={campuses}
          campusSlug={campusSlug}
          onCampusChange={onCampusChange}
          programs={programs}
          grade={grade}
          onGradeChange={onGradeChange}
          appointmentDate={appointmentDate}
          onAppointmentDateChange={onAppointmentDateChange}
          minAppointmentDate={minAppointmentDate}
          appointmentTime={appointmentTime}
          onAppointmentTimeChange={onAppointmentTimeChange}
        />
      ) : null}
    </div>
  );
}

function Background13({
  settings,
  checked,
  onToggleConsent,
  isSubmitting,
  onSubmit,
  name,
  onNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  campuses,
  campusSlug,
  onCampusChange,
  programs,
  grade,
  onGradeChange,
  appointmentDate,
  onAppointmentDateChange,
  minAppointmentDate,
  appointmentTime,
  onAppointmentTimeChange,
}: {
  settings: RegistrationSectionSettings;
  checked: boolean;
  onToggleConsent: () => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  name: string;
  onNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  campuses: CampusOption[];
  campusSlug: string;
  onCampusChange: (value: string) => void;
  programs: ProgramOption[];
  grade: string;
  onGradeChange: (value: string) => void;
  appointmentDate: string;
  onAppointmentDateChange: (value: string) => void;
  minAppointmentDate: string;
  appointmentTime: string;
  onAppointmentTimeChange: (value: string) => void;
}) {
  return (
    <div className="content-stretch flex flex-col h-[875.69px] items-start relative self-stretch shrink-0 w-[490.54px]" data-name="Background">
      <FormBgSvgClip />
      {settings.showForm ? (
        <Container172
          label={settings.submitLabel}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      ) : null}
      <Container173
        settings={settings}
        checked={checked}
        onToggleConsent={onToggleConsent}
        name={name}
        onNameChange={onNameChange}
        phone={phone}
        onPhoneChange={onPhoneChange}
        email={email}
        onEmailChange={onEmailChange}
        campuses={campuses}
        campusSlug={campusSlug}
        onCampusChange={onCampusChange}
        programs={programs}
        grade={grade}
        onGradeChange={onGradeChange}
        appointmentDate={appointmentDate}
        onAppointmentDateChange={onAppointmentDateChange}
        minAppointmentDate={minAppointmentDate}
        appointmentTime={appointmentTime}
        onAppointmentTimeChange={onAppointmentTimeChange}
      />
    </div>
  );
}

export default function RegistrationSection() {
  const { lang, t } = useLanguage();
  const settings = useRegistrationSectionSettings();
  const slotRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [campuses, setCampuses] = useState<CampusOption[]>([]);
  const [campusSlug, setCampusSlug] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [programs, setPrograms] = useState<ProgramOption[]>(fallbackPrograms);
  const [grade, setGrade] = useState(fallbackPrograms[0].slug);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [sectionScale, setSectionScale] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const promoImageUrl = settings.promoDesktopImageUrl || imgTask73WassGiam50PhiGhiDanhDesktopTvCopy1Jpg.src;
  const promo: PromoImage = {
    url: promoImageUrl,
    zoom: Math.min(3, Math.max(0.5, Number(settings.promoDesktopZoom) || 1)),
    position: settings.promoDesktopObjectPosition || "50% 50%",
  };
  const countdownValues = useCountdownValues(settings);
  const minAppointmentDate = (() => {
    const today = new Date();
    const offsetMs = today.getTimezoneOffset() * 60 * 1000;
    return new Date(today.getTime() - offsetMs).toISOString().slice(0, 10);
  })();
  const displaySettings = {
    ...settings,
    title: lang === "en" ? t("register.promoTitle") : settings.title,
    submitLabel: lang === "en" ? t("register.cta") : settings.submitLabel,
    consentText: lang === "en" ? t("form.consentLong") : settings.consentText,
    countdownDays: countdownValues.days,
    countdownHours: countdownValues.hours,
    countdownMinutes: countdownValues.minutes,
    countdownSeconds: countdownValues.seconds,
  };

  async function submitLead() {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enrollment-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: name,
          phone,
          email,
          campusSlug,
          grade,
          appointmentDate,
          appointmentTime,
          agreed,
          sourcePage: window.location.pathname,
          sourceDevice: "desktop",
        }),
      });

      if (!response.ok) return;

      setName("");
      setPhone("");
      setEmail("");
      setCampusSlug("");
      setAppointmentDate("");
      setAppointmentTime("");
      setAgreed(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const updateScale = () => {
      const width = slotRef.current?.offsetWidth ?? 0;
      if (!width) return;
      setSectionScale(Math.min(1, width / SECTION_ARTBOARD_WIDTH));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    let mounted = true;

    fetch("/api/class-programs")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !Array.isArray(data.programs)) return;

        const nextPrograms = data.programs
          .map((program: any) => ({
            slug: String(program.slug || ""),
            label: String(program.label || `${program.name || ""} ${program.age ? `(${program.age})` : ""}`),
          }))
          .filter((program: ProgramOption) => program.slug && program.label.trim());

        if (!nextPrograms.length) return;
        setPrograms(nextPrograms);
        setGrade((current) => (nextPrograms.some((program: ProgramOption) => program.slug === current) ? current : nextPrograms[0].slug));
      })
      .catch(() => undefined);

    fetch("/api/campuses")
      .then((response) => response.json())
      .then((data) => {
        if (!mounted || !Array.isArray(data.campuses)) return;

        const nextCampuses = data.campuses
          .map((campus: any) => ({
            slug: String(campus.slug || ""),
            label: String(campus.label || campus.name || ""),
          }))
          .filter((campus: CampusOption) => campus.slug && campus.label.trim());

        setCampuses(nextCampuses);
      })
      .catch(() => undefined);

    return () => {
      mounted = false;
    };
  }, []);

  if (!settings.isActive) return null;

  return (
    <div
      ref={slotRef}
      className="absolute left-[64px] right-[64px] top-[8022.35px]"
      style={{ height: SECTION_ARTBOARD_HEIGHT * sectionScale }}
    >
      <div
        className="mx-auto"
        style={{
          height: SECTION_ARTBOARD_HEIGHT * sectionScale,
          width: SECTION_ARTBOARD_WIDTH * sectionScale,
        }}
      >
        <div
          className="content-stretch flex gap-[16px] h-[907.69px] items-start p-[16px] rounded-[48px]"
          data-name="Section"
          style={{
            backgroundColor: settings.backgroundColor,
            transform: `scale(${sectionScale})`,
            transformOrigin: "top left",
            width: SECTION_ARTBOARD_WIDTH,
          }}
        >
          {settings.showPromoImage ? <Container171 promo={promo} /> : null}
          <Background13
            settings={displaySettings}
            checked={agreed}
            onToggleConsent={() => setAgreed((value) => !value)}
            isSubmitting={isSubmitting}
            onSubmit={submitLead}
            name={name}
            onNameChange={setName}
            phone={phone}
            onPhoneChange={setPhone}
            email={email}
            onEmailChange={setEmail}
            campuses={campuses}
            campusSlug={campusSlug}
            onCampusChange={setCampusSlug}
            programs={programs}
            grade={grade}
            onGradeChange={setGrade}
            appointmentDate={appointmentDate}
            onAppointmentDateChange={setAppointmentDate}
            minAppointmentDate={minAppointmentDate}
            appointmentTime={appointmentTime}
            onAppointmentTimeChange={setAppointmentTime}
          />
        </div>
      </div>
    </div>
  );
}
