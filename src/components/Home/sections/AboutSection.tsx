"use client";

import svgPaths from "../svg-g45k1n1pz5";
import Link from "next/link";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgWebKindergartenJpg from "../../../assets/a32b9595cff2ce9d1e97a98665d30a5e87620c30.png";
import imgWebKindergarten2Jpg from "../../../assets/becea57d21b16e69d315acb7b34ce055c670107e.png";
import imgBackground2 from "../../../assets/c335b55122c9354d6a38878d564d64507ec073d9.png";
import imgWebKindergartenJpg1 from "../../../assets/eca0f00994a6add059898b0052a18055c5e2de11.jpg";
import imgWebKindergarten2Jpg1 from "../../../assets/1785508275307_2464196110406402971_2464196110406402971_908152b1927fedcdd7fc0a83d44529f3.jpg";
import imgLogo from "../../../assets/logo.png";

function CornerBrandLogo() {
  return (
    <div className="absolute right-[-82px] top-[50px] z-[3] h-[104px] w-[104px]">
      <img alt="" className="h-full w-full object-contain" src={imgLogo.src} />
    </div>
  );
}


function Container31() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#b80000] text-[60px] uppercase whitespace-nowrap">
        <p className="leading-[60px]">{t("home.about.title")}</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[60px] items-start relative shrink-0" data-name="Heading 2">
      <Container31 />
    </div>
  );
}

function Container33() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[16px] w-full">
        <p className="leading-[24px]">
          <strong className="font-extrabold">Princeton Academy</strong>{t("home.about.text1.a")}<strong className="font-extrabold">{t("home.about.text1.b")}</strong>{t("home.about.text1.c")}<strong className="font-extrabold">{t("home.about.text1.d")}</strong>{t("home.about.text1.e")}
        </p>
      </div>
    </div>
  );
}

function Container34() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[16px] w-full">
        <p className="leading-[24px]">
          {t("home.about.text2.a")}<strong className="font-extrabold">{t("home.about.text2.b")}</strong>{t("home.about.text2.c")}<strong className="font-extrabold">{t("home.about.text2.d")}</strong>{t("home.about.text2.e")}<strong className="font-extrabold">{t("home.about.text2.f")}</strong>{t("home.about.text2.g")}<strong className="font-extrabold">{t("home.about.text2.h")}</strong>{t("home.about.text2.i")}<strong className="font-extrabold">{t("home.about.text2.j")}</strong>{t("home.about.text2.k")}
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[14px] items-start max-w-[560px] relative shrink-0 w-[560px]" data-name="Container">
      <Container33 />
      <Container34 />
    </div>
  );
}

function AboutCounter1Svg() {
  return (
    <div className="h-[54.028px] relative shrink-0 w-[62.34px]" data-name="about-counter-1.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="54.028" preserveAspectRatio="none" viewBox="0 0 62.34 54.028" width="62.34">
        <g clipPath="url(#clip0_1_1065)" id="about-counter-1.svg">
          <path d={svgPaths.p38b18aa0} fill="var(--fill-0, white)" fillOpacity="0.9" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1065">
            <rect fill="white" height="54.028" width="62.34" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Image() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-24px_20px_24px_-20px] items-center justify-center overflow-clip" data-name="Image">
      <AboutCounter1Svg />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#b32025] text-[56px] text-center text-shadow-[3px_3px_0px_white,-3px_3px_0px_white,3px_-3px_0px_white,-3px_-3px_0px_white] whitespace-nowrap">
        <p className="leading-[56px]">10</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Image />
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.6px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#620000] text-[22px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Cơ Sở</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[23.4px] items-start relative self-stretch shrink-0" data-name="Container">
      <Container37 />
      <Container39 />
    </div>
  );
}

function AboutCounter2Svg() {
  return (
    <div className="h-[56px] relative shrink-0 w-[50.462px]" data-name="about-counter-2.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="56" preserveAspectRatio="none" viewBox="0 0 50.4615 56" width="50.4615">
        <g clipPath="url(#clip0_1_1073)" id="about-counter-2.svg">
          <path d={svgPaths.p6cd0980} fill="var(--fill-0, white)" fillOpacity="0.9" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1073">
            <rect fill="white" height="56" width="50.4615" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-28px_-4px_28px_4px] items-center justify-center overflow-clip" data-name="Image">
      <AboutCounter2Svg />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#b32025] text-[56px] text-center text-shadow-[3px_3px_0px_white,-3px_3px_0px_white,3px_-3px_0px_white,-3px_-3px_0px_white] whitespace-nowrap">
        <p className="leading-[56px]">02</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Image1 />
      <Container42 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.6px] px-[12.46px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#620000] text-[22px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Ngôn ngữ</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[23.4px] items-center relative self-stretch shrink-0" data-name="Container">
      <Container41 />
      <Container43 />
    </div>
  );
}

function AboutCounter3Svg() {
  return (
    <div className="h-[56px] relative shrink-0 w-[58.462px]" data-name="about-counter-3.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="56" preserveAspectRatio="none" viewBox="0 0 58.4615 56" width="58.4615">
        <g clipPath="url(#clip0_1_1062)" id="about-counter-3.svg">
          <path d={svgPaths.p2aec3580} fill="var(--fill-0, white)" fillOpacity="0.9" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1062">
            <rect fill="white" height="56" width="58.4615" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-28px_-4px_28px_4px] items-center justify-center overflow-clip" data-name="Image">
      <AboutCounter3Svg />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#b32025] text-[56px] text-center text-shadow-[3px_3px_0px_white,-3px_3px_0px_white,3px_-3px_0px_white,-3px_-3px_0px_white] whitespace-nowrap">
        <p className="leading-[56px]">02</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Image2 />
      <Container46 />
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.6px] px-[3.65px] relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#620000] text-[22px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Chương trình học</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col gap-[23.4px] items-center relative self-stretch shrink-0" data-name="Container">
      <Container45 />
      <Container47 />
    </div>
  );
}

function AboutCounter4Svg() {
  return (
    <div className="h-[56px] relative shrink-0 w-[70.187px]" data-name="about-counter-4.svg">
      <svg className="absolute block inset-0 size-full" fill="none" height="56" preserveAspectRatio="none" viewBox="0 0 70.1867 56" width="70.1867">
        <g clipPath="url(#clip0_1_1081)" id="about-counter-4.svg">
          <path d={svgPaths.p3e097f00} fill="var(--fill-0, white)" fillOpacity="0.9" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_1_1081">
            <rect fill="white" height="56" width="70.1867" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-18px_-8.01px_18px_8px] items-center justify-center overflow-clip" data-name="Image">
      <AboutCounter4Svg />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#b32025] text-[56px] text-center text-shadow-[3px_3px_0px_white,-3px_3px_0px_white,3px_-3px_0px_white,-3px_-3px_0px_white] whitespace-nowrap">
        <p className="leading-[56px]">10</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#b32025] text-[56px] text-center text-shadow-[3px_3px_0px_white,-3px_3px_0px_white,3px_-3px_0px_white,-3px_-3px_0px_white] whitespace-nowrap">
        <p className="leading-[56px]">+</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Image3 />
      <Container50 />
      <Container51 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.6px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#620000] text-[22px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Câu lạc bộ</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[23.4px] items-start relative self-stretch shrink-0" data-name="Container">
      <Container49 />
      <Container52 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#b32025] text-[56px] text-center text-shadow-[3px_3px_0px_white,-3px_3px_0px_white,3px_-3px_0px_white,-3px_-3px_0px_white] whitespace-nowrap">
        <p className="leading-[56px]">30</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-center relative self-stretch shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[#b32025] text-[56px] text-center text-shadow-[3px_3px_0px_white,-3px_3px_0px_white,3px_-3px_0px_white,-3px_-3px_0px_white] whitespace-nowrap">
        <p className="leading-[56px]">+</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex h-[56px] items-start relative shrink-0" data-name="Container">
      <Container55 />
      <Container56 />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.6px] relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-[#620000] text-[22px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Sự kiện</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col gap-[23.4px] items-start relative self-stretch shrink-0" data-name="Container">
      <Container54 />
      <Container57 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex h-[164px] items-start justify-between pt-[32px] relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Container40 />
      <Container44 />
      <Container48 />
      <Container53 />
    </div>
  );
}

function Container30() {
  const { t } = useLanguage();
  return (
    <div className="mr-[-80px] relative self-stretch shrink-0 w-[648px]" data-name="Container">
      <div className="content-stretch flex flex-col gap-[14px] items-start pb-[48px] pt-[58px] relative size-full">
        <Heading />
        <Container32 />
        <Container35 />
        <div className="flex w-full justify-center">
          <Link
            href="/ket-noi-gia-dinh"
            className="inline-flex rounded-full bg-[#b80000] px-7 py-3 text-[16px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {t("home.readMore")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function WebKindergarten2Jpg() {
  return (
    <div
      className="absolute h-[416px] left-0 top-0 w-[471px] scale-[0.92] origin-top-left"
      style={{
        maskImage: `url("${imgWebKindergarten2Jpg.src}")`,
        WebkitMaskImage: `url("${imgWebKindergarten2Jpg.src}")`,
        maskSize: "471px 416px",
        WebkitMaskSize: "471px 416px",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
      data-name="web_kindergarten-2.jpg"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-5%] max-w-none top-0 w-[110%] object-cover" src={imgWebKindergarten2Jpg1.src} />
      </div>
    </div>
  );
}

function ImgMaskGroup3() {
  return (
    <div className="h-[416px] relative shrink-0 w-[471px]" data-name="Img:mask-group">
      <WebKindergarten2Jpg />
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <ImgMaskGroup3 />
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="h-[370px] relative shrink-0 w-[414px]" data-name="Mask Group">
      <div
        className="absolute bg-[#fff2f2] h-[370px] left-0 top-0 w-[414px]"
        style={{
          maskImage: `url("${imgBackground2.src}")`,
          WebkitMaskImage: `url("${imgBackground2.src}")`,
          maskSize: "414px 370px",
          WebkitMaskSize: "414px 370px",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
        data-name="Background"
      />
    </div>
  );
}

function WebKindergartenJpg() {
  return (
    <div
      className="-translate-x-1/2 absolute h-[354px] left-1/2 top-0 w-[398px]"
      style={{
        maskImage: `url("${imgWebKindergartenJpg.src}")`,
        WebkitMaskImage: `url("${imgWebKindergartenJpg.src}")`,
        maskSize: "398px 354px",
        WebkitMaskSize: "398px 354px",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
      data-name="web_kindergarten.jpg"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-16.71%] max-w-none top-0 w-[133.42%] object-cover" src={imgWebKindergartenJpg1.src} />
      </div>
    </div>
  );
}

function ImgMaskGroup4() {
  return (
    <div className="-translate-x-1/2 absolute h-[354px] left-1/2 top-[8px] w-[398px]" data-name="Img:mask-group">
      <WebKindergartenJpg />
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[289.8px] top-[259px]" data-name="Container">
      <MaskGroup />
      <ImgMaskGroup4 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Container58() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <CornerBrandLogo />
      <div className="content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <Container59 />
      </div>
    </div>
  );
}

function ContainerCssTransform() {
  return (
    <div className="content-stretch flex flex-col h-[710px] items-start justify-center relative shrink-0 w-[648px]" data-name="Container:css-transform">
      <Container58 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <ContainerCssTransform />
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#e8f3e6] relative shrink-0 w-full" data-name="Background">
      <div className="content-stretch flex flex-col items-start px-[116px] relative size-full">
        <Container29 />
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pb-[24px] right-0 top-[686px]" data-name="Section">
      <Background7 />
    </div>
  );
}
