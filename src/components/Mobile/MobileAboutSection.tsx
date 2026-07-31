import svgPaths from "../Home/svg-g45k1n1pz5";
import Link from "next/link";
import imgWebKindergarten2Jpg1 from "../../assets/7152d23b5ad0228ac40827979cdce9d4dfc3a8fb.png";
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
  decoration: React.ReactNode;
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
        <div
          className="absolute pointer-events-none"
          style={{ inset: "-17px 0px 17px -4px" }}
        >
          {decoration}
        </div>
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
  return (
    <section className="bg-[#e8f3e6] px-[14px] pb-8 pt-10">
      <CornerBrandLogo />

      {/* Heading */}
      <h2 className="mb-5 text-center text-[#b80000] font-extrabold text-[28px] uppercase leading-none">
        Về Chúng Tôi
      </h2>

      {/* Image */}
      <div className="relative mb-5 overflow-hidden rounded-[13px] shadow-[0_5px_12px_rgba(98,0,0,0.12)]">
        <img
          src={imgWebKindergarten2Jpg1.src}
          alt="Trường Mầm non Princeton"
          className="h-[190px] w-full object-cover object-[48%_center]"
        />
      </div>

      {/* Description */}
      <div className="mx-auto max-w-[390px] text-center">
        <p className="mb-5 text-[#620000] font-medium text-[14px] leading-[1.75]">
          <strong className="font-extrabold">Princeton Academy Premier</strong> là trường mầm non quốc tế định hướng phát triển toàn diện cho trẻ thông qua môi trường học tập hiện đại, an toàn và truyền cảm hứng. Nhà trường chú trọng xây dựng nền tảng vững chắc về <strong className="font-extrabold">ngôn ngữ, tư duy và nhân cách</strong>, giúp trẻ tự tin khám phá thế giới, phát huy tiềm năng và sẵn sàng cho hành trình học tập trong tương lai.
        </p>
        <p className="text-[#620000] font-medium text-[14px] leading-[1.75]">
          Chương trình học tại Princeton Academy Premier được thiết kế theo định hướng giáo dục quốc tế với <strong className="font-extrabold">80-100% thời lượng học bằng tiếng Anh</strong> tùy độ tuổi. Trẻ được tiếp cận <strong className="font-extrabold">9 môn học chuẩn Mỹ</strong> như Ngôn ngữ, Toán, Khoa học STEM, Mỹ thuật, Montessori, Âm nhạc, Giáo dục thể chất, Khoa học xã hội và Giáo dục nhân cách. Đồng thời, chương trình còn tích hợp các phương pháp giáo dục tiên tiến như <strong className="font-extrabold">Montessori, Reggio Emilia, Glenn Doman, Howard Gardner</strong> và phương pháp <strong className="font-extrabold">Socratic Questioning (SQM)</strong> nhằm khuyến khích tư duy phản biện, sáng tạo và khả năng giải quyết vấn đề.
        </p>
      </div>
    </section>
  );
}
