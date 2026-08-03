"use client";

import Link from "next/link";
import type { DbTeachingMethod } from "@/lib/content";
import { CoverImage } from "@/components/Shared/CoverImage";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgPlane from "@/assets/87b0baec94bf2f1f980990704ca31b5f776eae03.png";
import imgZigzagTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import imgZigzagBottom from "@/assets/d698542361c4bd444dda74cab23735d3d9459bf4.png";

function TeachingMethodCard({ method }: { method: DbTeachingMethod }) {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";
  const title = isEn && method.titleEn ? method.titleEn : method.title;
  const description = isEn && method.descriptionEn ? method.descriptionEn : method.description;
  return (
    <Link
      href={`/con-duong-princeton/${method.slug}`}
      className="group block rounded-[20px] border-2 border-dashed border-[#ff7777] bg-[#fffefa] text-[#620000] no-underline transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="flex min-h-[210px] flex-col gap-6 p-6 sm:flex-row sm:items-center md:min-h-[238px] md:p-8">
        <div className="relative mx-auto h-[140px] w-[140px] shrink-0 overflow-hidden rounded-[16px] sm:mx-0 md:h-[166px] md:w-[166px]">
          {method.imageUrl ? (
            <CoverImage
              src={method.imageUrl}
              alt={method.imageAlt}
              zoom={method.coverZoom}
              position={method.coverPosition}
              frameAspect={1}
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h3 className="text-[24px] font-extrabold leading-[1.14] text-[#620000] md:text-[30px]">
            {title}
          </h3>
          <p className="mt-4 text-[17px] font-medium leading-[1.48] text-[#620000] md:text-[21px] md:leading-[32px]">
            {description}
          </p>
          <span className="mt-5 inline-flex rounded-full bg-[#b80000] px-5 py-3 text-[13px] font-extrabold uppercase text-white shadow-[0_4px_0_#800000] transition-transform duration-200 group-hover:translate-x-1">
            {t("curriculum.viewDetail")}
          </span>
        </div>
      </div>
    </Link>
  );
}

type TeachingMethodsSectionProps = {
  methods: DbTeachingMethod[];
  showHeading?: boolean;
  showHeadingTitle?: boolean;
  showZigzags?: boolean;
  topZigzagColor?: string;
  bottomZigzagColor?: string;
  className?: string;
};

export default function TeachingMethodsSection({
  methods,
  showHeading = true,
  showHeadingTitle = true,
  showZigzags = true,
  topZigzagColor,
  bottomZigzagColor,
  className = "",
}: TeachingMethodsSectionProps) {
  const { t } = useLanguage();
  const useOriginalPinkTop = topZigzagColor?.toLowerCase() === "#fff1f1";
  const topZigzagStyle = useOriginalPinkTop
    ? {
        backgroundImage: `url("${imgZigzagBottom.src}")`,
        backgroundSize: "176px 25px",
      }
    : topZigzagColor
      ? {
          backgroundColor: topZigzagColor,
          WebkitMaskImage: `url("${imgZigzagTop.src}")`,
          maskImage: `url("${imgZigzagTop.src}")`,
          WebkitMaskRepeat: "repeat-x",
          maskRepeat: "repeat-x",
          WebkitMaskSize: "176px 25px",
          maskSize: "176px 25px",
        }
      : {
          backgroundImage: `url("${imgZigzagTop.src}")`,
          backgroundSize: "176px 25px",
        };

  const bottomZigzagStyle = bottomZigzagColor
    ? {
        backgroundColor: bottomZigzagColor,
        WebkitMaskImage: `url("${imgZigzagBottom.src}")`,
        maskImage: `url("${imgZigzagBottom.src}")`,
        WebkitMaskRepeat: "repeat-x",
        maskRepeat: "repeat-x",
        WebkitMaskSize: "176px 25px",
        maskSize: "176px 25px",
      }
    : {
        backgroundImage: `url("${imgZigzagBottom.src}")`,
        backgroundSize: "176px 25px",
      };

  return (
    <section className={`relative overflow-hidden bg-[#bfefff] ${className}`}>
      {showZigzags ? (
        <div
          className="h-[25px] bg-repeat-x"
          style={topZigzagStyle}
        />
      ) : null}

      <div className="relative mx-auto max-w-[1620px] px-4 py-12 md:px-10 md:py-[100px] lg:px-[42px]">
        {showHeading ? (
          <div className="mx-auto mb-10 max-w-[976px] text-center md:mb-12">
            {showHeadingTitle ? (
              <h2 className="text-[34px] font-bold uppercase leading-none text-[#620000] md:text-[60px] md:leading-[60px]">
                {t("methods.sectionTitle")}
              </h2>
            ) : null}
            <p className="mt-5 text-[18px] font-medium leading-7 text-[#620000] md:text-[24px] md:leading-8">
              {t("methods.sectionText")}
            </p>
          </div>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
          {methods.map((method) => (
            <TeachingMethodCard
              key={method.title}
              method={method}
            />
          ))}
        </div>

        <img
          src={imgPlane.src}
          alt=""
          className="pointer-events-none absolute -bottom-12 right-4 hidden h-[140px] w-[220px] object-contain opacity-95 lg:block"
        />
      </div>

      {showZigzags ? (
        <div
          className="h-[25px] rotate-180 bg-repeat-x"
          style={bottomZigzagStyle}
        />
      ) : null}
    </section>
  );
}
