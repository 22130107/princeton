import svgPaths from "../Home/svg-g45k1n1pz5";
import Link from "next/link";
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
  const stats: StatProps[] = [
    { decoration: <AboutCounter1Svg />, numbers: ["02"], label: "Cơ Sở" },
    { decoration: <AboutCounter2Svg />, numbers: ["02"], label: "Ngôn ngữ" },
    { decoration: <AboutCounter3Svg />, numbers: ["02"], label: "Chương trình học" },
    { decoration: <AboutCounter4Svg />, numbers: ["10", "+"], label: "Câu lạc bộ" },
    { numbers: ["30", "+"], label: "Sự kiện" },
  ];

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
          <strong className="font-extrabold">Princeton Academy</strong> là hệ thống mầm non quốc tế ra đời từ niềm tin: <strong className="font-extrabold">Giáo dục không phải là lấp đầy kiến thức, mà là kiến tạo mảnh đất màu mỡ để mỗi hạt giống độc bản được lớn lên.</strong> Chúng tôi không chỉ chuẩn bị cho trẻ vào lớp Một, mà tập trung vun đắp <strong className="font-extrabold">7 nhu cầu phát triển gốc rễ về Thể - Trí - Tâm - Nhân cách</strong>, giúp con xây dựng nội lực vững vàng để tự tin khám phá thế giới.
        </p>
        <p className="text-[#620000] font-medium text-[14px] leading-[1.75]">
          Chương trình học tại Princeton Academy được thiết kế chuẩn quốc tế với <strong className="font-extrabold">80–100% thời lượng tiếng Anh</strong>, tích hợp <strong className="font-extrabold">9 môn giáo dục sớm chuẩn Mỹ</strong> cùng chương trình <strong className="font-extrabold">Tư duy phản biện sớm (ECT)</strong>. Thông qua phương pháp độc quyền <strong className="font-extrabold">PEAK (Học qua trải nghiệm &amp; Chơi có chủ đích)</strong>, ngôn ngữ và kiến thức đến với con một cách tự nhiên nhẹ nhàng, đánh thức sự tò mò và trao cho con niềm tin tự hào: <strong className="font-extrabold">"Con tự làm được!"</strong>.
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
          href="/gioi-thieu"
          className="inline-flex rounded-full bg-[#b80000] px-7 py-3 text-[16px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Xem thêm
        </Link>
      </div>
    </section>
  );
}
