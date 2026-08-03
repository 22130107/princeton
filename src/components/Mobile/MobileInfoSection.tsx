"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import imgPaper from "../../assets/b8936ceb2afcdcf3ec9bf2508692d1c0866ccf6e.png";
import imgSpiral from "../../assets/19f3ec75d04d4778613b623fd67426de89defdb9.png";
import imgPenguinCard from "../../assets/451163d5761eb2fd4f4fc21e0662c4d50571045a.png";
import imgWombatCard from "../../assets/f27370ae642f585465776911bba325c723a71553.png";
import imgKoalaCard from "../../assets/76ae85eb95c1037d24fc4b213196313a7543a830.png";
import imgKangarooCard from "../../assets/15745d29eddade36047a580e4620dc891bb7902d.png";
import imgPreschoolCard from "../../assets/2733e2352734e4c64d23bbca5e0cf9b52124bf84.png";
import { useLanguage } from "@/components/Shared/LanguageProvider";

type MobileClassProgram = {
  id: number;
  slug: string;
  name: string;
  nameEn: string;
  age: string;
  ageEn: string;
  imageUrl: string;
  imageAlt: string;
};

const cardStyles = [
  { card: imgPenguinCard, color: "#92d0db", rotate: "-rotate-[2deg]" },
  { card: imgWombatCard, color: "#ffcf82", rotate: "rotate-[2deg]" },
  { card: imgKoalaCard, color: "#abe099", rotate: "rotate-[1deg]" },
  { card: imgKangarooCard, color: "#f9ba93", rotate: "-rotate-[1deg]" },
  { card: imgPreschoolCard, color: "#ffacb9", rotate: "-rotate-[3deg]" },
];

export default function MobileInfoSection() {
  const { t, lang } = useLanguage();
  const isEn = lang === "en";
  const [classes, setClasses] = useState<MobileClassProgram[]>([]);

  useEffect(() => {
    let alive = true;

    fetch("/api/class-programs")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.programs)) return;

        setClasses(
          data.programs.map((item: any) => ({
            id: item.id,
            slug: item.slug,
            name: item.name || "Khối lớp",
            nameEn: item.nameEn || item.name || "Class",
            age: item.age || "",
            ageEn: item.ageEn || item.age || "",
            imageUrl: item.imageUrl || "",
            imageAlt: item.imageAlt || item.name || "Khối lớp Princeton",
          })),
        );
      })
      .catch(() => {
        if (alive) setClasses([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="bg-[#fffefa] px-2 py-8">
      <div className="relative mx-auto max-w-[480px]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 left-10 right-10 z-[2] h-[42px] bg-repeat-x bg-contain"
          style={{ backgroundImage: `url("${imgSpiral.src}")`, backgroundSize: "96px 42px" }}
        />

        <div className="relative rounded-[20px] border-2 border-[#3c0000] bg-[#fffefa] p-2 shadow-[4px_6px_0_rgba(98,0,0,0.12)]">
          <div
            className="relative overflow-hidden rounded-[16px] bg-[#fffefa] px-3 pb-8 pt-14"
            style={{
              backgroundImage: `url("${imgPaper.src}")`,
              backgroundPosition: "center top",
              backgroundSize: "920px auto",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-2 rounded-[12px] border border-dashed border-[#d80000]"
            />

            <h2 className="relative z-[1] mb-8 text-center text-[28px] font-extrabold uppercase leading-tight text-[#620000]">
              {t("mobile.info.title")}
            </h2>

            <div className="relative z-[1] grid grid-cols-2 gap-x-3 gap-y-7">
              {classes.map((classItem, index) => {
                const style = cardStyles[index % cardStyles.length];
                const isLastOdd = classes.length % 2 === 1 && index === classes.length - 1;

                return (
                  <Link
                    key={classItem.id}
                    href={`/chuong-trinh-hoc/${classItem.slug}`}
                    className={[
                      "relative min-h-[178px] px-3 pb-5 pt-6 text-center text-[#620000] no-underline transition-transform duration-200 active:scale-[0.98]",
                      style.rotate,
                      isLastOdd ? "col-span-2 mx-auto w-[52%] min-w-[150px]" : "",
                    ].join(" ")}
                    style={{
                      backgroundImage: `url("${style.card.src}")`,
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="mx-auto mb-2 flex h-[68px] items-center justify-center">
                      {classItem.imageUrl ? (
                        <img
                          src={classItem.imageUrl}
                          alt={classItem.imageAlt}
                          className="max-h-full max-w-[86px] rounded-[12px] object-contain"
                        />
                      ) : null}
                    </div>
                    <h3 className="mb-2 text-[20px] font-extrabold leading-none text-[#620000]">
                      {isEn ? classItem.nameEn : classItem.name}
                    </h3>
                    <span
                      className="inline-flex min-h-9 items-center justify-center rounded-full border bg-white px-3 text-[16px] font-semibold leading-none text-[#620000]"
                      style={{ borderColor: style.color }}
                    >
                      {isEn ? classItem.ageEn : classItem.age}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
