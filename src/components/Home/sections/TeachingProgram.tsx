"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mediaUrl } from "@/lib/media-url";
import { CoverImage } from "@/components/Shared/CoverImage";
import { useLanguage } from "@/components/Shared/LanguageProvider";

type HomeTeachingMethod = {
  id: number;
  title: string;
  description: string;
  titleEn?: string;
  descriptionEn?: string;
  imageUrl: string;
  imageAlt: string;
  coverPosition: string;
  coverZoom: number;
};

const fallbackTeachingMethods: HomeTeachingMethod[] = [
  {
    id: 1,
    title: "Kết hợp nhiều phương pháp",
    description:
      "Trẻ được tiếp cận các phương pháp giáo dục hiện đại, nổi bật là Play-based Learning, giúp trẻ học tập thông qua các hoạt động vui chơi và tiếp thu kiến thức một cách tự nhiên.",
    imageUrl: mediaUrl("4067071ed218b109a3b3d760ab5b856a1c4d1556.png"),
    imageAlt: "Kết hợp nhiều phương pháp",
    coverPosition: "50% 50%",
    coverZoom: 1,
  },
  {
    id: 2,
    title: "Lấy trẻ làm trung tâm",
    description:
      "Trẻ được tôn trọng sở thích, bản sắc cá nhân và nhịp độ phát triển. Thầy cô tạo cơ hội để trẻ chủ động khám phá, đặt câu hỏi và học hỏi theo cách riêng của mình.",
    imageUrl: mediaUrl("6fcde84113072aa66cc43c4fc5efa3b2d4e6feb8.png"),
    imageAlt: "Lấy trẻ làm trung tâm",
    coverPosition: "50% 50%",
    coverZoom: 1,
  },
  {
    id: 3,
    title: "Khai phóng tư duy",
    description:
      "Trẻ được tham gia các hoạt động đa dạng trong lớp và sau giờ học như Câu lạc bộ, Học tập thực tế, sự kiện, từ đó phát triển tư duy độc lập và tự do thể hiện bản thân.",
    imageUrl: mediaUrl("ba09fe820d0f9cb663b24826afea30ad6fc2c8a2.png"),
    imageAlt: "Khai phóng tư duy",
    coverPosition: "50% 50%",
    coverZoom: 1,
  },
{
    id: 4,
    title: "Học qua tương tác & hợp tác",
    description:
      "Trẻ phát triển kỹ năng xã hội, khả năng lắng nghe thông qua các hoạt động giao tiếp, chia sẻ và hợp tác với bạn bè, thầy cô và môi trường xung quanh.",
    imageUrl: mediaUrl("aa47a37d3cb1c1b806218e09ba36b08f5e7c4d55.png"),
    imageAlt: "Học qua tương tác và hợp tác",
    coverPosition: "50% 50%",
    coverZoom: 1,
  },
];

const cardGridClasses = [
  "col-1 row-1",
  "col-2 row-1",
  "col-1 row-2",
  "col-2 row-2",
];

function Container64() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[60px] text-center text-[#991B1B] whitespace-nowrap">
        <p className="leading-[60px]">{t("home.program.title")}</p>
      </div>
    </div>
  );
}

function Container65() {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[24px] text-center text-[#620000]">
        <p className="leading-[32px]">{t("home.program.text")}</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[976px] relative shrink-0 w-[976px]" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function TeachingMethodItem1Png() {
  return (
    <div className="aspect-[154/154] max-w-[154px] relative shrink-0 w-full" data-name="teaching-method-item-1.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={fallbackTeachingMethods[0].imageUrl} />
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[154px]" data-name="Container">
      <TeachingMethodItem1Png />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[28px] text-[#991B1B] w-full">
        <p className="leading-[28px]">Kết hợp nhiều phương pháp</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-[#620000] w-full">
        <p className="leading-[26px]">Trẻ được tiếp cận các phương pháp giáo dục hiện đại, nổi bật là Play-based Learning, giúp trẻ học tập thông qua các hoạt động vui chơi và tiếp thu kiến thức một cách tự nhiên.</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Container70 />
      <Container71 />
    </div>
  );
}

function Container67() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container68 />
        <Container69 />
      </div>
    </div>
  );
}

function Border2() {
  return (
    <div className="col-1 justify-self-stretch relative rounded-[20px] row-1 self-start shrink-0" data-name="Border">
      <div aria-hidden className="absolute border-2 border-[#fffefa] border-dashed inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col items-start p-[18.4px] relative size-full">
        <Container67 />
      </div>
    </div>
  );
}

function TeachingMethodItem3Png() {
  return (
    <div className="aspect-[154/154] max-w-[154px] relative shrink-0 w-full" data-name="teaching-method-item-3.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={fallbackTeachingMethods[1].imageUrl} />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[154px]" data-name="Container">
      <TeachingMethodItem3Png />
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[28px] text-[#991B1B] w-full">
        <p className="leading-[28px]">Lấy trẻ làm trung tâm</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-[#620000] w-full">
        <p className="leading-[26px]">Trẻ được tôn trọng sở thích, bản sắc cá nhân và nhịp độ phát triển. Thầy cô tạo cơ hội để trẻ chủ động khám phá, đặt câu hỏi và học hỏi theo cách riêng của mình.</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Container75 />
      <Container76 />
    </div>
  );
}

function Container72() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container73 />
        <Container74 />
      </div>
    </div>
  );
}

function Border3() {
  return (
    <div className="col-2 justify-self-stretch relative rounded-[20px] row-1 self-start shrink-0" data-name="Border">
      <div aria-hidden className="absolute border-2 border-[#fffefa] border-dashed inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col items-start p-[18.4px] relative size-full">
        <Container72 />
      </div>
    </div>
  );
}

function TeachingMethodItem2Png() {
  return (
    <div className="aspect-[154/162.44000244140625] max-w-[154px] relative shrink-0 w-full" data-name="teaching-method-item-2.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={fallbackTeachingMethods[2].imageUrl} />
      </div>
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[154px]" data-name="Container">
      <TeachingMethodItem2Png />
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[28px] text-[#991B1B] w-full">
        <p className="leading-[28px]">Khai phóng tư duy</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-[#620000] w-full">
        <p className="leading-[26px]">Trẻ được tham gia các hoạt động đa dạng trong lớp và sau giờ học như Câu lạc bộ, Học tập thực tế, sự kiện, từ đó phát triển tư duy độc lập và tự do thể hiện bản thân.</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Container80 />
      <Container81 />
    </div>
  );
}

function Container77() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container78 />
        <Container79 />
      </div>
    </div>
  );
}

function Border4() {
  return (
    <div className="col-1 justify-self-stretch relative rounded-[20px] row-2 self-start shrink-0" data-name="Border">
      <div aria-hidden className="absolute border-2 border-[#fffefa] border-dashed inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col items-start p-[18.4px] relative size-full">
        <Container77 />
      </div>
    </div>
  );
}

function TeachingMethodItem4Png() {
  return (
    <div className="aspect-[154/154] max-w-[154px] relative shrink-0 w-full" data-name="teaching-method-item-4.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={fallbackTeachingMethods[3].imageUrl} />
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[154px]" data-name="Container">
      <TeachingMethodItem4Png />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[28px] text-[#991B1B] w-full">
        <p className="leading-[28px]">{`Học qua tương tác & hợp tác`}</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-[#620000] w-full">
        <p className="leading-[26px]">Trẻ phát triển kỹ năng xã hội, khả năng lắng nghe thông qua các hoạt động giao tiếp, chia sẻ và hợp tác với bạn bè, thầy cô và môi trường xung quanh.</p>
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Container85 />
      <Container86 />
    </div>
  );
}

function Container82() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
        <Container83 />
        <Container84 />
      </div>
    </div>
  );
}

function Border5() {
  return (
    <div className="col-2 justify-self-stretch relative rounded-[20px] row-2 self-start shrink-0" data-name="Border">
      <div aria-hidden className="absolute border-2 border-[#fffefa] border-dashed inset-0 pointer-events-none rounded-[20px]" />
      <div className="content-stretch flex flex-col items-start pb-[26.84px] pt-[18.4px] px-[18.4px] relative size-full">
        <Container82 />
      </div>
    </div>
  );
}

function TeachingMethodCard({ method, index }: { method: HomeTeachingMethod; index: number }) {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const title = isEn && method.titleEn ? method.titleEn : method.title;
  const description = isEn && method.descriptionEn ? method.descriptionEn : method.description;
  const gridClass = cardGridClasses[index] ?? "";

  return (
    <div className={`${gridClass} justify-self-stretch relative rounded-[20px] self-start shrink-0 bg-[#fffefa] shadow-[6px_6px_0_rgba(184,0,0,0.3)]`} data-name="Border">
      <div aria-hidden className="absolute border-2 border-[#ff7777] border-dashed inset-0 pointer-events-none rounded-[20px]" />
      <div className={`content-stretch flex flex-col items-start ${index === 3 ? "pb-[26.84px] pt-[18.4px] px-[18.4px]" : "p-[18.4px]"} relative size-full`}>
        <div className="relative shrink-0 w-full" data-name="Container">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative size-full">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-[154px]" data-name="Container">
              <div className="aspect-[154/154] max-w-[154px] relative shrink-0 overflow-hidden rounded-[16px] w-full" data-name="teaching-method-db-item.png">
                <div className="absolute inset-0 pointer-events-none">
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
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                <div className="[word-break:break-word] flex flex-col font-extrabold justify-center leading-[0] relative shrink-0 text-[28px] text-[#991B1B] w-full">
                  <p className="leading-[28px]">{title}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
                <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[18px] text-[#620000] w-full">
                  <p className="leading-[26px]">{description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container66({ methods }: { methods: HomeTeachingMethod[] }) {
  return (
    <div className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__190.80px_199.24px] h-[438.04px] relative shrink-0 w-full" data-name="Container">
      {methods.slice(0, 4).map((method, index) => (
        <TeachingMethodCard key={`${method.id}-${index}`} method={method} index={index} />
      ))}
    </div>
  );
}

function Container62({ methods }: { methods: HomeTeachingMethod[] }) {
  return (
    <div className="max-w-[1320px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[48px] items-center max-w-[inherit] px-[12px] relative size-full">
          <Container63 />
          <Container66 methods={methods} />
        </div>
      </div>
    </div>
  );
}

export default function TeachingProgram() {
  const { t } = useLanguage();
  const [methods, setMethods] = useState<HomeTeachingMethod[]>(fallbackTeachingMethods);

  useEffect(() => {
    let alive = true;

    fetch("/api/teaching-methods")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.methods)) return;

        const nextMethods = data.methods.slice(0, 4).map((item: any, index: number) => {
          const fallback = fallbackTeachingMethods[index] ?? fallbackTeachingMethods[0];

          return {
            id: item.id ?? fallback.id,
            title: item.title || fallback.title,
            titleEn: item.titleEn || fallback.titleEn,
            description: item.description || item.excerpt || fallback.description,
            descriptionEn: item.descriptionEn || item.excerptEn || fallback.descriptionEn,
            imageUrl: item.imageUrl || fallback.imageUrl,
            imageAlt: item.imageAlt || item.title || fallback.imageAlt,
            coverPosition: item.coverPosition ?? "50% 50%",
            coverZoom: item.coverZoom ?? 1,
          };
        });

        if (nextMethods.length) {
          setMethods(nextMethods);
        }
      })
      .catch(() => {
        if (alive) setMethods(fallbackTeachingMethods);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="absolute bg-[#F7F4F2] content-stretch flex flex-col items-start left-0 pb-[132px] pt-[100px] px-[104px] right-0 top-[2776px]" data-name="Section">
      <Container62 methods={methods} />
      <Link
        href="/con-duong-princeton"
        className="absolute bottom-[54px] left-1/2 z-[3] -translate-x-1/2 rounded-full bg-[#b80000] px-7 py-3 text-[16px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000] transition-transform duration-200 hover:-translate-y-0.5"
      >
        {t("home.readMore")}
      </Link>
    </div>
  );
}
