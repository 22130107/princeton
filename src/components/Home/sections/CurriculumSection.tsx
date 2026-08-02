"use client";

import { useEffect, useMemo, useState } from "react";
import { CoverImage } from "@/components/Shared/CoverImage";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgChuongTrinhTieuChuanPng from "../../../assets/b6916482933e67cc337ea1071a428e34d7abe5f3.png";
import imgLogo from "../../../assets/logo.png";

type CurriculumTrack = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  titleEn?: string;
  descriptionEn?: string;
  imageUrl: string;
  imageAlt: string;
  coverPosition: string;
  coverZoom: number;
};

const fallbackTracks: CurriculumTrack[] = [
  {
    id: 1,
    slug: "chuong-trinh-tieu-chuan",
    title: "Chương trình Tiêu chuẩn",
    category: "Tiêu chuẩn",
    description:
      "Được xây dựng trên nền tảng Chương trình Giáo dục Mầm non của Bộ GD&ĐT Việt Nam cùng Khung Giáo dục Mầm non Quốc gia Úc (EYLF), chương trình khuyến khích học sinh tự do khám phá và chủ động học hỏi. Qua mỗi hoạt động, trẻ từng bước hình thành phản xạ giao tiếp tự nhiên, kỹ năng xã hội - cảm xúc, từ đó xây dựng nền tảng vững chắc cho các giai đoạn học tập tiếp theo.",
    imageUrl: imgChuongTrinhTieuChuanPng.src,
    imageAlt: "Chương trình Tiêu chuẩn",
    coverPosition: "50% 50%",
    coverZoom: 1,
  },
  {
    id: 2,
    slug: "chuong-trinh-nang-cao",
    title: "Chương trình Nâng cao",
    category: "Nâng cao",
    description:
      "Chương trình được thiết kế để mở rộng trải nghiệm học tập, giúp trẻ phát triển ngôn ngữ, tư duy phản biện, khả năng hợp tác và sự tự tin thông qua các hoạt động khám phá, dự án và thực hành sáng tạo.",
    imageUrl: imgChuongTrinhTieuChuanPng.src,
    imageAlt: "Chương trình Nâng cao",
    coverPosition: "50% 50%",
    coverZoom: 1,
  },
];

function Heading1() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[60px] text-center whitespace-nowrap">
        <p className="leading-[60px]">{t("home.curriculum.title")}</p>
      </div>
    </div>
  );
}

function CurriculumLogo() {
  return (
    <div className="flex items-start">
      <img
        src={imgLogo.src}
        alt="Princeton Academy"
        className="h-[112px] w-[112px] object-contain"
      />
    </div>
  );
}

function TrackTab({
  track,
  active,
  onClick,
}: {
  track: CurriculumTrack;
  active: boolean;
  onClick: () => void;
}) {
  const { lang } = useLanguage();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${active ? "bg-[#b80000]" : "bg-white"} flex-[1_0_0] min-w-px relative rounded-tl-[24px] rounded-tr-[24px] self-stretch`}
      data-name="Item"
    >
      <div
        aria-hidden
        className="absolute border-[#b80000] border-l-[0.8px] border-r-[0.8px] border-solid border-t-[0.8px] inset-0 pointer-events-none rounded-tl-[24px] rounded-tr-[24px]"
      />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[16px] pt-[16.8px] px-[32.8px] relative size-full">
          <div
            className={`[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[30px] text-center whitespace-nowrap ${
              active ? "text-white" : "text-[#b80000]"
            }`}
          >
            <p className="leading-[45px]">{lang === "en" && track.titleEn ? track.titleEn : track.title}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function TrackTabs({
  tracks,
  active,
  onChange,
}: {
  tracks: CurriculumTrack[];
  active: number;
  onChange: (index: number) => void;
}) {
  return (
    <div
      className="content-stretch flex gap-[12px] h-[77.8px] items-start justify-center overflow-auto relative shrink-0 w-full z-[2]"
      data-name="List"
    >
      {tracks.map((track, index) => (
        <TrackTab
          key={track.slug || track.id}
          track={track}
          active={active === index}
          onClick={() => onChange(index)}
        />
      ))}
    </div>
  );
}

function TrackContent({ track }: { track: CurriculumTrack }) {
  const { lang } = useLanguage();
  const description = lang === "en" && track.descriptionEn ? track.descriptionEn : track.description;
  return (
    <div className="bg-white relative rounded-bl-[28px] rounded-br-[28px] shrink-0 w-full z-[1]" data-name="Background+Border">
      <div
        aria-hidden
        className="absolute border border-[#b80000] border-solid inset-0 pointer-events-none rounded-bl-[28px] rounded-br-[28px]"
      />
      <div className="content-stretch flex flex-col items-start p-[32.8px] relative size-full">
        <div className="relative shrink-0 w-full" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start justify-center relative size-full">
            <div className="shrink-0 pt-[4px] w-[112px]">
              <CurriculumLogo />
            </div>

            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px pb-[16px] relative" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[22px] w-full">
                  <p className="leading-[33px]">{description}</p>
                </div>
              </div>
            </div>

            <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip relative rounded-[14px]" data-name="Container">
              <div
                className="aspect-[575.2000122070312/343.510009765625] relative shrink-0 w-full"
                data-name="chuong_trinh_tieu_chuan.png"
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <CoverImage
                    src={track.imageUrl || imgChuongTrinhTieuChuanPng.src}
                    alt={track.imageAlt || track.title}
                    zoom={track.coverZoom}
                    position={track.coverPosition}
                    frameAspect={575.2 / 343.51}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CurriculumSection() {
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
    <div
      className="absolute bg-[#fff1f1] content-stretch flex flex-col items-start left-0 pb-[80px] pt-[84px] px-[104px] right-0 top-[3642.04px]"
      data-name="Section"
    >
      <div className="max-w-[1320px] relative shrink-0 w-full" data-name="Container">
        <div className="content-stretch flex flex-col gap-[80px] items-start max-w-[inherit] px-[12px] relative size-full">
          <Heading1 />
          <div className="content-stretch flex flex-col isolate items-start relative shrink-0 w-full" data-name="Container">
            <TrackTabs
              tracks={visibleTracks}
              active={Math.min(active, visibleTracks.length - 1)}
              onChange={setActive}
            />
            <TrackContent track={activeTrack} />
          </div>
        </div>
      </div>
    </div>
  );
}
