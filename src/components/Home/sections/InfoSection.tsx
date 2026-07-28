 "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import svgPaths from "../svg-g45k1n1pz5";
import imgBackground6 from "../../../assets/76ae85eb95c1037d24fc4b213196313a7543a830.png";
import imgBackground4 from "../../../assets/451163d5761eb2fd4f4fc21e0662c4d50571045a.png";
import imgClassWombatPng from "../../../assets/3dc1ce007304dd7c637e9e4c763ad7fda6021a35.png";
import imgBackgroundBorder from "../../../assets/b8936ceb2afcdcf3ec9bf2508692d1c0866ccf6e.png";
import imgClassPenguinPng from "../../../assets/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import imgClassKoalaPng from "../../../assets/d088645c54f44b84375f6cb56aeabe8e06bc006b.png";
import imgClassPreschoolPng from "../../../assets/58895c008a094b06474cacb153601040cef3cf48.png";
import imgClassKangarooPng from "../../../assets/d0268a1bfec279b63f5d3717d847ff89893ec9a7.png";
import imgImage8 from "../../../assets/19f3ec75d04d4778613b623fd67426de89defdb9.png";
import imgBackground7 from "../../../assets/15745d29eddade36047a580e4620dc891bb7902d.png";
import imgBackground8 from "../../../assets/2733e2352734e4c64d23bbca5e0cf9b52124bf84.png";
import imgBackground5 from "../../../assets/f27370ae642f585465776911bba325c723a71553.png";

type HomeClassProgram = {
  id: number;
  slug: string;
  name: string;
  age: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
};

const classCardStyles = [
  { background: imgBackground4.src, border: "#92d0db", imageWidth: "w-[122.76px]", imageClass: "h-full left-[-36.82%] top-0 w-[173.64%]" },
  { background: imgBackground5.src, border: "#ffcf82", imageWidth: "w-[125.71px]", imageClass: "h-full left-[-34.78%] top-0 w-[169.56%]" },
  { background: imgBackground6.src, border: "#abe099", imageWidth: "w-[129.13px]", imageClass: "h-full left-[-32.54%] top-0 w-[165.07%]" },
  { background: imgBackground7.src, border: "#f9ba93", imageWidth: "w-[87.38px]", imageClass: "left-0 top-0 size-full" },
  { background: imgBackground8.src, border: "#ffacb9", imageWidth: "w-[88.78px]", imageClass: "h-full left-0 top-0 w-full" },
];

function Container201() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[60px] text-center whitespace-nowrap">
          <p className="leading-[60px]">HỆ THỐNG KHỐI LỚP</p>
        </div>
      </div>
    </div>
  );
}

function ClassPenguinPng() {
  return (
    <div className="h-[100px] max-h-[100px] max-w-[213.16000366210938px] relative shrink-0 w-[122.76px]" data-name="class-penguin.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-36.82%] max-w-none top-0 w-[173.64%]" src={imgClassPenguinPng.src} />
      </div>
    </div>
  );
}

function Container203() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <ClassPenguinPng />
    </div>
  );
}

function Container204() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[26px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Penguin</p>
      </div>
    </div>
  );
}

function BackgroundBorder12() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center pb-[7.6px] pt-[9.6px] px-[21.6px] relative rounded-[30px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#92d0db] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[26px]">2 - 3 tuổi</p>
      </div>
    </div>
  );
}

function Background18() {
  return (
    <div className="relative self-stretch shrink-0 w-[245.16px]" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackground4.src} />
      </div>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center px-[16px] py-[48px] relative size-full">
          <Container203 />
          <Container204 />
          <BackgroundBorder12 />
        </div>
      </div>
    </div>
  );
}

function ClassWombatPng() {
  return (
    <div className="h-[100px] max-h-[100px] max-w-[213.14999389648438px] relative shrink-0 w-[125.71px]" data-name="class-wombat.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-34.78%] max-w-none top-0 w-[169.56%]" src={imgClassWombatPng.src} />
      </div>
    </div>
  );
}

function Container205() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <ClassWombatPng />
    </div>
  );
}

function Container206() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[26px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Wombat</p>
      </div>
    </div>
  );
}

function BackgroundBorder13() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center pb-[7.6px] pt-[9.6px] px-[21.6px] relative rounded-[30px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#ffcf82] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[26px]">3 - 4 tuổi</p>
      </div>
    </div>
  );
}

function Background19() {
  return (
    <div className="relative self-stretch shrink-0 w-[245.15px]" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackground5.src} />
      </div>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center px-[16px] py-[48px] relative size-full">
          <Container205 />
          <Container206 />
          <BackgroundBorder13 />
        </div>
      </div>
    </div>
  );
}

function ClassKoalaPng() {
  return (
    <div className="h-[100px] max-h-[100px] max-w-[213.16000366210938px] relative shrink-0 w-[129.13px]" data-name="class-koala.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-32.54%] max-w-none top-0 w-[165.07%]" src={imgClassKoalaPng.src} />
      </div>
    </div>
  );
}

function Container207() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <ClassKoalaPng />
    </div>
  );
}

function Container208() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[26px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Koala</p>
      </div>
    </div>
  );
}

function BackgroundBorder14() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center pb-[7.6px] pt-[9.6px] px-[21.6px] relative rounded-[30px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#abe099] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[26px]">4 - 5 tuổi</p>
      </div>
    </div>
  );
}

function Background20() {
  return (
    <div className="relative self-stretch shrink-0 w-[245.16px]" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackground6.src} />
      </div>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center px-[16px] py-[48px] relative size-full">
          <Container207 />
          <Container208 />
          <BackgroundBorder14 />
        </div>
      </div>
    </div>
  );
}

function ClassKangarooPng() {
  return (
    <div className="h-[100px] max-h-[100px] max-w-[213.16000366210938px] relative shrink-0 w-[87.38px]" data-name="class-kangaroo.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgClassKangarooPng.src} />
      </div>
    </div>
  );
}

function Container209() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <ClassKangarooPng />
    </div>
  );
}

function Container210() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[26px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Kangaroo</p>
      </div>
    </div>
  );
}

function BackgroundBorder15() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center pb-[7.6px] pt-[9.6px] px-[21.6px] relative rounded-[30px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#f9ba93] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[26px]">5 - 6 tuổi</p>
      </div>
    </div>
  );
}

function Background21() {
  return (
    <div className="relative self-stretch shrink-0 w-[245.16px]" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackground7.src} />
      </div>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center px-[16px] py-[48px] relative size-full">
          <Container209 />
          <Container210 />
          <BackgroundBorder15 />
        </div>
      </div>
    </div>
  );
}

function ClassPreschoolPng() {
  return (
    <div className="h-[100px] max-h-[100px] max-w-[213.16000366210938px] relative shrink-0 w-[88.78px]" data-name="class-preschool.png">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[99.99%]" src={imgClassPreschoolPng.src} />
      </div>
    </div>
  );
}

function Container211() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <ClassPreschoolPng />
    </div>
  );
}

function Container212() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[26px] text-center whitespace-nowrap">
        <p className="leading-[26px]">Preschool</p>
      </div>
    </div>
  );
}

function BackgroundBorder16() {
  return (
    <div className="bg-white content-stretch flex items-start justify-center pb-[7.6px] pt-[9.6px] px-[21.6px] relative rounded-[30px] shrink-0" data-name="Background+Border">
      <div aria-hidden className="absolute border border-[#ffacb9] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[20px] text-center whitespace-nowrap">
        <p className="leading-[26px]">5 - 6 tuổi</p>
      </div>
    </div>
  );
}

function Background22() {
  return (
    <div className="relative self-stretch shrink-0 w-[245.16px]" data-name="Background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgBackground8.src} />
      </div>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center px-[16px] py-[48px] relative size-full">
          <Container211 />
          <Container212 />
          <BackgroundBorder16 />
        </div>
      </div>
    </div>
  );
}

function ClassProgramCard({ program, index }: { program: HomeClassProgram; index: number }) {
  const style = classCardStyles[index % classCardStyles.length];

  return (
    <Link
      href={`/khoi-lop/${program.slug}`}
      className="relative h-[289.2px] w-[245.16px] shrink-0 text-[#620000] no-underline transition-transform duration-200 hover:-translate-y-1"
      data-name="Background"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={style.background} />
      </div>
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-center px-[16px] py-[48px] relative size-full">
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
            <div className={`h-[100px] max-h-[100px] max-w-[213.16px] relative shrink-0 ${style.imageWidth}`} data-name="class-program-db.png">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {program.imageUrl ? (
                  <img
                    alt={program.imageAlt || program.name}
                    className={`absolute max-w-none object-contain ${style.imageClass}`}
                    src={program.imageUrl}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
            <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] relative shrink-0 text-[#620000] text-[26px] text-center whitespace-nowrap">
              <p className="leading-[26px]">{program.name}</p>
            </div>
          </div>
          <div className="bg-white content-stretch flex items-start justify-center pb-[7.6px] pt-[9.6px] px-[21.6px] relative rounded-[30px] shrink-0" data-name="Background+Border">
            <div aria-hidden className="absolute border border-solid inset-0 pointer-events-none rounded-[30px]" style={{ borderColor: style.border }} />
            <div className="[word-break:break-word] flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#620000] text-[20px] text-center whitespace-nowrap">
              <p className="leading-[26px]">{program.age}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Container202({ programs }: { programs: HomeClassProgram[] }) {
  return (
    <div className="min-h-[289.2px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex w-[calc(100%+8px)] -mx-1 flex-wrap items-start justify-center gap-y-[24px] relative">
        {programs.map((program, index) => (
          <ClassProgramCard key={program.id} program={program} index={index} />
        ))}
      </div>
    </div>
  );
}

function Border6({ programs }: { programs: HomeClassProgram[] }) {
  return (
    <div className="relative rounded-[26px] shrink-0 w-full" data-name="Border">
      <div aria-hidden className="absolute border border-[#b80000] border-dashed inset-0 pointer-events-none rounded-[26px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[48px] items-start pb-[53.6px] pt-[101.6px] px-[49.6px] relative size-full">
        <Container201 />
        <Container202 programs={programs} />
      </div>
    </div>
  );
}

function BackgroundBorder11({ programs }: { programs: HomeClassProgram[] }) {
  return (
    <div className="relative rounded-[30px] shrink-0 w-full z-[1]" data-name="Background+Border">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[30px]">
        <img alt="" className="absolute h-[188.06%] left-0 max-w-none top-0 w-[191.85%]" src={imgBackgroundBorder.src} />
      </div>
      <div aria-hidden className="absolute border-4 border-[#3c0000] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <div className="content-stretch flex flex-col items-start p-[12px] relative size-full">
        <Border6 programs={programs} />
      </div>
    </div>
  );
}

function Container200({ programs }: { programs: HomeClassProgram[] }) {
  return (
    <div className="content-stretch flex flex-col isolate items-center relative shrink-0 w-full" data-name="Container">
      <div className="bg-size-[517.5511420369148px_87.00000095367432px] bg-top-left h-[87px] mb-[-64px] relative shrink-0 w-[1246.6px] z-[2]" style={{ backgroundImage: `url("${imgImage8.src}")` }} data-name="Image" />
      <BackgroundBorder11 programs={programs} />
    </div>
  );
}

export default function InfoSection() {
  const [programs, setPrograms] = useState<HomeClassProgram[]>([]);

  useEffect(() => {
    let alive = true;

    fetch("/api/class-programs")
      .then((response) => response.json())
      .then((data) => {
        if (!alive || !Array.isArray(data.programs)) return;

        setPrograms(
          data.programs.map((item: any) => ({
            id: item.id,
            slug: item.slug,
            name: item.name || "Khối lớp",
            age: item.age || "",
            imageUrl: item.imageUrl || "",
            imageAlt: item.imageAlt || item.name || "Khối lớp Princeton",
            color: item.color || "#fffefa",
          })),
        );
      })
      .catch(() => {
        if (alive) setPrograms([]);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="absolute content-stretch flex flex-col items-start left-[86px] pb-[7px] pr-[7px] right-[86px] top-[4512.95px]" data-name="Section">
      <div className="absolute bg-[#b80000] inset-[5%_0_0_2%] rounded-[30px]" data-name="Background+Border">
        <div aria-hidden className="absolute border-4 border-[#3c0000] border-solid inset-0 pointer-events-none rounded-[30px]" />
      </div>
      <Container200 programs={programs} />
    </div>
  );
}
