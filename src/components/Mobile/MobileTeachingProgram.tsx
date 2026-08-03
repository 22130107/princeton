"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mediaUrl } from "@/lib/media-url";
import { useLanguage } from "@/components/Shared/LanguageProvider";
import imgZigzagTop from "../../assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import imgZigzagBottom from "../../assets/d698542361c4bd444dda74cab23735d3d9459bf4.png";

type MobileTeachingMethod = {
  id: number;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  imageUrl: string;
  imageAlt: string;
};

const fallbackMethods: MobileTeachingMethod[] = [
  {
    id: 1,
    imageUrl: mediaUrl("4067071ed218b109a3b3d760ab5b856a1c4d1556.png"),
    imageAlt: "Kết hợp nhiều phương pháp",
    title: "Kết hợp nhiều phương pháp",
    titleEn: "Combining multiple methods",
    description: "Trẻ được tiếp cận các phương pháp giáo dục hiện đại, nổi bật là Play-based Learning, giúp trẻ học tập thông qua các hoạt động vui chơi và tiếp thu kiến thức một cách tự nhiên.",
    descriptionEn:
      "Children explore modern educational methods, especially play-based learning, helping them learn through play activities and absorb knowledge naturally.",
  },
  {
    id: 2,
    imageUrl: mediaUrl("6fcde84113072aa66cc43c4fc5efa3b2d4e6feb8.png"),
    imageAlt: "Lấy trẻ làm trung tâm",
    title: "Lấy trẻ làm trung tâm",
    titleEn: "Child-centered learning",
    description: "Trẻ được tôn trọng sở thích, bản sắc cá nhân và nhịp độ phát triển. Thầy cô tạo cơ hội để trẻ chủ động khám phá, đặt câu hỏi và học hỏi theo cách riêng của mình.",
    descriptionEn:
      "Children's interests, personal identity and pace of development are respected. Teachers create opportunities for children to actively explore, ask questions and learn in their own way.",
  },
  {
    id: 3,
    imageUrl: mediaUrl("ba09fe820d0f9cb663b24826afea30ad6fc2c8a2.png"),
    imageAlt: "Khai phóng tư duy",
    title: "Khai phóng tư duy",
    titleEn: "Unlocking thinking",
    description: "Trẻ được tham gia các hoạt động đa dạng trong lớp và sau giờ học như Câu lạc bộ, học tập thực tế, sự kiện, từ đó phát triển tư duy độc lập và tự do thể hiện bản thân.",
    descriptionEn:
      "Children join varied activities in class and after school such as clubs, real-life learning and events, developing independent thinking and freely expressing themselves.",
  },
  {
    id: 4,
    imageUrl: mediaUrl("aa47a37d3cb1c1b806218e09ba36b08f5e7c4d55.png"),
    imageAlt: "Học qua tương tác và hợp tác",
    title: "Học qua tương tác & hợp tác",
    titleEn: "Learning through interaction & cooperation",
    description: "Trẻ phát triển kỹ năng xã hội, khả năng lắng nghe thông qua các hoạt động giao tiếp, chia sẻ và hợp tác với bạn bè, thầy cô và môi trường xung quanh.",
    descriptionEn:
      "Children develop social skills and listening ability through communication, sharing and cooperation with friends, teachers and the surrounding environment.",
  },
];

export default function MobileTeachingProgram() {
  const { t, lang } = useLanguage();
  const isEn = lang === "en";
  const [methods, setMethods] = useState<MobileTeachingMethod[]>(fallbackMethods);

  useEffect(() => {
    let alive = true;

    fetch("/api/teaching-methods")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.methods)) return;

        const nextMethods = data.methods.slice(0, 4).map((item: any, index: number) => {
          const fallback = fallbackMethods[index] ?? fallbackMethods[0];

          return {
            id: item.id ?? fallback.id,
            title: item.title || fallback.title,
            titleEn: item.titleEn || fallback.titleEn,
            description: item.description || item.excerpt || fallback.description,
            descriptionEn:
              item.descriptionEn || item.excerptEn || fallback.descriptionEn,
            imageUrl: item.imageUrl || fallback.imageUrl,
            imageAlt: item.imageAlt || item.title || fallback.imageAlt,
          };
        });

        if (nextMethods.length) {
          setMethods(nextMethods);
        }
      })
      .catch(() => {
        if (alive) setMethods(fallbackMethods);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="relative bg-[#F4D06F]">
      <div
        className="h-[25px] w-full bg-repeat-x"
        style={{
          backgroundImage: `url("${imgZigzagTop.src}")`,
          backgroundSize: "176px 25px",
          backgroundPosition: "top left",
        }}
      />

      <div className="px-4 pb-10 pt-8">
        <h2 className="mb-2 text-center text-[22px] font-bold uppercase text-[#620000]">
          {t("home.program.title")}
        </h2>
        <p className="mb-7 text-center text-[14px] font-medium leading-relaxed text-[#620000]">
          {t("home.program.text")}
        </p>

        <div className="flex flex-col gap-4">
          {methods.map((method) => (
            <div key={method.id} className="relative rounded-[20px] bg-[#fffefa] shadow-[6px_6px_0_rgba(184,0,0,0.3)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[20px] border-2 border-dashed border-[#ff7777]"
              />
              <div className="relative flex items-center gap-4 p-[18px]">
                <div className="h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[16px]">
                  <img
                    src={method.imageUrl}
                    alt={method.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <p className="text-[16px] font-extrabold leading-snug text-[#620000]">
                    {isEn ? method.titleEn || method.title : method.title}
                  </p>
                  <p className="text-[13px] font-medium leading-relaxed text-[#620000]">
                    {isEn ? method.descriptionEn || method.description : method.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/con-duong-princeton"
          className="mx-auto mt-7 flex w-fit rounded-full bg-[#b80000] px-6 py-3 text-[14px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000]"
        >
          {t("home.readMore")}
        </Link>
      </div>

      <div
        className="h-[25px] w-full rotate-180 bg-repeat-x"
        style={{
          backgroundImage: `url("${imgZigzagBottom.src}")`,
          backgroundSize: "176px 25px",
          backgroundPosition: "top left",
        }}
      />
    </section>
  );
}
