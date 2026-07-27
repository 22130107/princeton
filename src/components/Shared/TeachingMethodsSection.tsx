import Link from "next/link";
import type { TeachingMethod } from "@/data/teachingMethods";
import { teachingMethods } from "@/data/teachingMethods";
import imgPlane from "@/assets/87b0baec94bf2f1f980990704ca31b5f776eae03.png";
import imgZigzagTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import imgZigzagBottom from "@/assets/d698542361c4bd444dda74cab23735d3d9459bf4.png";

function TeachingMethodCard({
  method,
  filled,
}: {
  method: TeachingMethod;
  filled: boolean;
}) {
  return (
    <Link
      href={`/phuong-phap-giang-day/${method.slug}`}
      className={[
        "group relative block rounded-[20px] text-[#620000] no-underline transition-transform duration-200 hover:-translate-y-1",
        filled ? "shadow-[6px_6px_0_rgba(98,0,0,0.16)]" : "bg-[#ffc107]",
      ].join(" ")}
      style={filled ? { backgroundColor: method.background } : undefined}
    >
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 rounded-[20px] border-2 border-dashed",
          filled ? "border-[#b80000]/45" : "border-[#fffefa]",
        ].join(" ")}
      />
      <div className="relative flex flex-col gap-4 p-[18px] sm:flex-row sm:items-center md:p-[18.4px]">
        <div className="mx-auto h-[118px] w-[118px] shrink-0 sm:mx-0 md:h-[154px] md:w-[154px]">
          <img
            src={method.image.src}
            alt=""
            className="h-full w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h3 className="text-[22px] font-extrabold leading-[1.12] text-[#620000] md:text-[28px]">
            {method.title}
          </h3>
          <p className="mt-2 text-[16px] font-medium leading-[1.45] text-[#620000] md:text-[18px] md:leading-[26px]">
            {method.description}
          </p>
          <span className="mt-4 inline-flex rounded-full bg-[#b80000] px-4 py-2 text-[13px] font-extrabold uppercase text-white shadow-[0_3px_0_#800000] transition-transform duration-200 group-hover:translate-x-1">
            Xem chi tiết
          </span>
        </div>
      </div>
    </Link>
  );
}

type TeachingMethodsSectionProps = {
  showHeading?: boolean;
  showZigzags?: boolean;
  filledCards?: boolean;
  topZigzagColor?: string;
  bottomZigzagColor?: string;
  className?: string;
};

export default function TeachingMethodsSection({
  showHeading = true,
  showZigzags = true,
  filledCards = false,
  topZigzagColor,
  bottomZigzagColor,
  className = "",
}: TeachingMethodsSectionProps) {
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

      <div className="relative mx-auto max-w-[1320px] px-4 py-12 md:px-10 md:py-[100px] lg:px-[104px]">
        {showHeading ? (
          <div className="mx-auto mb-10 max-w-[976px] text-center md:mb-12">
            <h2 className="text-[34px] font-bold uppercase leading-none text-[#620000] md:text-[60px] md:leading-[60px]">
              Phương pháp giáo dục
            </h2>
            <p className="mt-5 text-[18px] font-medium leading-7 text-[#620000] md:text-[24px] md:leading-8">
              Trường Mầm non Princeton áp dụng những phương pháp giáo dục tiên tiến, mang đến cho trẻ các trải nghiệm học tập trọn vẹn và đầy hứng khởi.
            </p>
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
          {teachingMethods.map((method) => (
            <TeachingMethodCard
              key={method.title}
              method={method}
              filled={filledCards}
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
