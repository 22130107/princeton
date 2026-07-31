"use client";

import { useEffect, useMemo, useState } from "react";
import imgChuongTrinh from "../../assets/b6916482933e67cc337ea1071a428e34d7abe5f3.png";
import imgLogo from "../../assets/logo.png";

type CurriculumTrack = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
};

const fallbackTracks: CurriculumTrack[] = [
  {
    id: 1,
    slug: "chuong-trinh-tieu-chuan",
    title: "Chương trình Tiêu chuẩn",
    category: "Tiêu chuẩn",
    description:
      "Được xây dựng trên nền tảng Chương trình Giáo dục Mầm non của Bộ GD&ĐT Việt Nam cùng Khung Giáo dục Mầm non Quốc gia Úc (EYLF), chương trình khuyến khích học sinh tự do khám phá và chủ động học hỏi. Qua mỗi hoạt động, trẻ từng bước hình thành phản xạ giao tiếp tự nhiên, kỹ năng xã hội - cảm xúc, từ đó xây dựng nền tảng vững chắc cho các giai đoạn học tập tiếp theo.",
    imageUrl: imgChuongTrinh.src,
    imageAlt: "Chương trình Tiêu chuẩn",
  },
  {
    id: 2,
    slug: "chuong-trinh-nang-cao",
    title: "Chương trình Nâng cao",
    category: "Nâng cao",
    description:
      "Chương trình được thiết kế để mở rộng trải nghiệm học tập, giúp trẻ phát triển ngôn ngữ, tư duy phản biện, khả năng hợp tác và sự tự tin thông qua các hoạt động khám phá, dự án và thực hành sáng tạo.",
    imageUrl: imgChuongTrinh.src,
    imageAlt: "Chương trình Nâng cao",
  },
];

function CurriculumLogo() {
  return (
    <div className="flex w-full justify-center">
      <img
        src={imgLogo.src}
        alt="Princeton Academy"
        className="h-[104px] w-[104px] object-contain"
      />
    </div>
  );
}

export default function MobileCurriculumSection() {
  const [active, setActive] = useState(0);
  const [tracks, setTracks] = useState<CurriculumTrack[]>(fallbackTracks);
  const visibleTracks = useMemo(() => tracks.slice(0, 2), [tracks]);
  const activeTrack = visibleTracks[Math.min(active, visibleTracks.length - 1)] ?? visibleTracks[0];

  useEffect(() => {
    let cancelled = false;

    fetch("/api/curriculum-tracks")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { tracks?: CurriculumTrack[] } | null) => {
        const nextTracks = Array.isArray(data?.tracks) ? data.tracks.slice(0, 2) : [];

        if (!cancelled && nextTracks.length) {
          setTracks(nextTracks);
          setActive(0);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-[#fff1f1] px-4 pt-10 pb-10">
      <h2 className="text-[#620000] font-bold text-[22px] uppercase text-center mb-8">
        CHƯƠNG TRÌNH HỌC
      </h2>

      <div className="flex flex-col">
        <div className="flex gap-3 z-[2]">
          {visibleTracks.map((track, index) => (
            <button
              key={track.slug || track.id}
              onClick={() => setActive(index)}
              className={[
                "flex-1 relative rounded-tl-[24px] rounded-tr-[24px] py-4 px-3",
                "border-t border-l border-r border-[#b80000]",
                index === active ? "bg-[#b80000]" : "bg-white",
              ].join(" ")}
            >
              <span
                className={[
                  "font-extrabold text-[15px] leading-snug text-center block",
                  index === active ? "text-white" : "text-[#b80000]",
                ].join(" ")}
              >
                {track.title}
              </span>
            </button>
          ))}
        </div>

        <div className="relative bg-white z-[1] rounded-bl-[28px] rounded-br-[28px]">
          <div
            aria-hidden
            className="absolute inset-0 border border-[#b80000] pointer-events-none rounded-bl-[28px] rounded-br-[28px]"
          />
          <div className="relative p-5 flex flex-col gap-4">
            <CurriculumLogo />
            <p className="text-[#620000] font-medium text-[14px] leading-relaxed">
              {activeTrack.description}
            </p>

            <div className="overflow-hidden rounded-[14px] w-full">
              <img
                src={activeTrack.imageUrl || imgChuongTrinh.src}
                alt={activeTrack.imageAlt || activeTrack.title}
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
