"use client";

import { useState } from "react";
import imgChuongTrinh from "../../assets/b6916482933e67cc337ea1071a428e34d7abe5f3.png";
import imgLogo from "../../assets/logo.png";

const tabs = ["Chương trình Tiêu chuẩn", "Chương trình Nâng cao"];

function CurriculumLogo() {
  return (
    <div className="flex w-full justify-center">
      <img src={imgLogo.src} alt="" className="h-[104px] w-[104px] object-contain" />
    </div>
  );
}

export default function MobileCurriculumSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#fff1f1] px-4 pt-10 pb-10">
      {/* Heading */}
      <h2 className="text-[#620000] font-bold text-[22px] uppercase text-center mb-8">
        CHƯƠNG TRÌNH HỌC
      </h2>

      {/* Tab + content — giống PC: List nằm trên BackgroundBorder */}
      <div className="flex flex-col">

        {/* Tabs — giống PC: Item (đỏ = active) + Item1 (trắng = inactive), rounded-tl rounded-tr */}
        <div className="flex gap-3 z-[2]">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActive(i)}
              className={[
                "flex-1 relative rounded-tl-[24px] rounded-tr-[24px] py-4 px-3",
                "border-t border-l border-r border-[#b80000]",
                i === active
                  ? "bg-[#b80000]"
                  : "bg-white",
              ].join(" ")}
            >
              <span
                className={[
                  "font-extrabold text-[15px] leading-snug text-center block",
                  i === active ? "text-white" : "text-[#b80000]",
                ].join(" ")}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>

        {/* BackgroundBorder — 2 góc trên vuông mọi lúc */}
        <div className="relative bg-white z-[1] rounded-bl-[28px] rounded-br-[28px]">
          <div
            aria-hidden
            className="absolute inset-0 border border-[#b80000] pointer-events-none rounded-bl-[28px] rounded-br-[28px]"
          />
          <div className="relative p-5 flex flex-col gap-4">
            <CurriculumLogo />
            {/* Text — giống PC: font-medium text-[#620000] */}
            <p className="text-[#620000] font-medium text-[14px] leading-relaxed">
              Được xây dựng trên nền tảng Chương trình Giáo dục Mầm non của Bộ GD&amp;ĐT Việt Nam cùng Khung Giáo dục Mầm non Quốc gia Úc (EYLF), chương trình khuyến khích học sinh tự do khám phá và chủ động học hỏi. Qua mỗi hoạt động, trẻ từng bước hình thành phản xạ giao tiếp tự nhiên, kỹ năng xã hội - cảm xúc, từ đó xây dựng nền tảng vững chắc cho các giai đoạn học tập tiếp theo.
            </p>

            {/* Ảnh — giống PC: overflow-clip rounded-[14px], giữ tỉ lệ 575/343 */}
            <div className="overflow-hidden rounded-[14px] w-full">
              <img
                src={imgChuongTrinh.src}
                alt="Chương trình học"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "575.2 / 343.51" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
