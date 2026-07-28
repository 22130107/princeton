import svgPaths from "../Home/svg-g45k1n1pz5";
import Link from "next/link";
import imgWebKindergarten2Jpg1 from "../../assets/7152d23b5ad0228ac40827979cdce9d4dfc3a8fb.png";
import imgLogo from "../../assets/logo1.png";

function CornerBrandLogo() {
  return (
    <div className="absolute right-[-4px] top-3 z-[2] flex w-[76px] flex-col items-center">
      <div className="relative h-[42px] w-[36px] overflow-hidden">
        <img
          src={imgLogo.src}
          alt=""
          className="absolute left-0 top-0 h-[42px] w-[102px] max-w-none object-contain object-left"
        />
      </div>
      <div className="mt-0.5 text-center text-[11px] font-extrabold uppercase leading-[10px] text-[#ed1c24]">
        <p>Princeton</p>
        <p>Academy</p>
      </div>
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
    <section className="bg-[#e8f3e6] px-4 py-8">
      {/* Heading */}
      <h2 className="text-[#620000] font-bold text-[28px] uppercase leading-tight mb-4">
        Về Chúng Tôi
      </h2>

      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden mb-5 shadow-md">
        <img
          src={imgWebKindergarten2Jpg1.src}
          alt="Trường Mầm non Princeton"
          className="w-full h-48 object-cover"
        />
        <CornerBrandLogo />
      </div>

      {/* Description */}
      <p className="text-[#620000] font-medium text-[14px] leading-relaxed mb-3">
        Trường Mầm non Princeton là nơi mang đến môi trường giáo dục hiện đại, năng động, hướng đến mục tiêu đào tạo nên những thế hệ học sinh phát triển toàn diện, có nhân cách tốt, giàu bản lĩnh và có khả năng tạo nên những giá trị tích cực cho xã hội khi trưởng thành.
      </p>
      <p className="text-[#620000] font-medium text-[14px] leading-relaxed mb-5">
        Chương trình học tại Trường Mầm non Princeton được xây dựng dựa trên sự kết hợp giữa chương trình của Bộ Giáo dục & Đào tạo Việt Nam và Chương trình Mầm non Pricenton, khuyến khích các em học sinh tự do khám phá, chủ động tư duy, nuôi dưỡng sự tò mò và hứng thú học tập.
      </p>

      {/* Stats — grid 2 cột, item cuối căn trái */}
      <div className="grid grid-cols-2 gap-y-8 pt-[20px]">
        <StatItem
          decoration={<AboutCounter1Svg />}
          numbers={["02"]}
          label="Cơ Sở"
        />
        <StatItem
          decoration={<AboutCounter2Svg />}
          numbers={["02"]}
          label="Ngôn ngữ"
        />
        <StatItem
          decoration={<AboutCounter3Svg />}
          numbers={["02"]}
          label="Chương trình học"
        />
        <StatItem
          decoration={<AboutCounter4Svg />}
          numbers={["10", "+"]}
          label="Câu lạc bộ"
        />
        {/* Item cuối: căn trái theo cột 1 */}
        <StatItem
          decoration={<AboutCounter4Svg />}
          numbers={["30", "+"]}
          label="Sự kiện"
        />
      </div>
      <div className="flex justify-center">
        <Link
          href="/gioi-thieu"
          className="mt-8 inline-flex rounded-full bg-[#b80000] px-6 py-3 text-[14px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000]"
        >
          Xem thêm
        </Link>
      </div>
    </section>
  );
}
