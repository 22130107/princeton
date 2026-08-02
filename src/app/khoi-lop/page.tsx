import type { Metadata } from "next";
import Link from "next/link";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { CoverImage } from "@/components/Shared/CoverImage";
import { getClassPrograms } from "@/lib/content";
import { getServerT, getServerLang } from "@/lib/i18n-server";
import imgLogo from "@/assets/logo.png";
import imgCardLogo from "@/assets/logo1.png";
import imgWaveTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import stickerA from "@/assets/sticker/58895c008a094b06474cacb153601040cef3cf48.png";
import stickerB from "@/assets/sticker/6344cf27-7411-4173-b9fd-570675106a47.png";
import stickerC from "@/assets/sticker/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import stickerD from "@/assets/sticker/c0575f19-d630-4b56-b954-383cd28b2ce9.png";

export const metadata: Metadata = {
  title: "Khối Lớp | Trường Mầm non Princeton",
  description:
    "Hệ thống khối lớp Penguin, Wombat, Koala, Kangaroo và Preschool tại Trường Mầm non Princeton.",
  openGraph: {
    title: "Khối Lớp | Trường Mầm non Princeton",
    description:
      "Khám phá hệ thống khối lớp theo độ tuổi tại Trường Mầm non Princeton.",
  },
};

export const dynamic = "force-dynamic";

const floatingStickers = [
  { image: stickerA, className: "left-[4%] top-[18%] h-16 w-16 md:h-24 md:w-24", duration: "6.4s", delay: "-1.2s", rotate: "-10deg" },
  { image: stickerB, className: "right-[6%] top-[12%] h-20 w-20 md:h-28 md:w-28", duration: "7.1s", delay: "-3.1s", rotate: "12deg" },
  { image: stickerC, className: "left-[8%] bottom-[12%] h-16 w-16 md:h-24 md:w-24", duration: "5.8s", delay: "-2.4s", rotate: "8deg" },
];

function FloatingStickers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      {floatingStickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker.image.src}
          alt=""
          className={`absolute object-contain opacity-95 drop-shadow-[0_12px_14px_rgba(98,0,0,0.22)] ${sticker.className}`}
          style={{
            animation: `program-sticker-sway ${sticker.duration} ease-in-out infinite`,
            animationDelay: sticker.delay,
            transform: `rotate(${sticker.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

export default async function KhoiLopPage() {
  const t = await getServerT();
  const lang = await getServerLang();
  const isEn = lang === "en";
  const classPrograms = await getClassPrograms();

  return (
    <main className="min-h-screen bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <style>{`
        @keyframes program-sticker-sway {
          0%, 100% { translate: 0 0; scale: 1; }
          35% { translate: 8px -14px; scale: 1.04; }
          70% { translate: -6px 10px; scale: 0.98; }
        }
      `}</style>
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative mt-6 overflow-hidden bg-[#fff1f1] px-4 pb-10 pt-28 md:mt-10 md:px-10 md:pb-16 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[2] h-[25px] bg-repeat-x"
          style={{
            backgroundImage: `url("${imgWaveTop.src}")`,
            backgroundSize: "176px 25px",
            backgroundPosition: "top left",
          }}
        />
        <FloatingStickers />
        <div className="relative z-[3] mx-auto max-w-[1180px]">
          <h1 className="text-center text-[34px] font-extrabold uppercase leading-tight md:text-[58px]">
            {t("classes.heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[16px] font-medium leading-7 md:text-[20px] md:leading-8">
            {t("classes.heroText")}
          </p>

          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classPrograms.map((program) => (
              <article
                key={program.slug}
                className="flex min-h-[520px] flex-col overflow-hidden border border-[#b80000] bg-[#fffefa] shadow-[4px_4px_0_rgba(184,0,0,0.16)]"
              >
                <div
                  className="relative aspect-[575.2/343.51] overflow-hidden"
                  style={{ backgroundColor: program.color }}
                >
                  {program.imageUrl ? (
                    <CoverImage
                      src={program.imageUrl}
                      alt={program.imageAlt}
                      zoom={program.coverZoom}
                      position={program.coverPosition}
                      frameAspect={575.2 / 343.51}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <img
                        src={imgLogo.src}
                        alt="Princeton Academy"
                        className="h-[118px] w-auto object-contain"
                      />
                    </div>
                  )}
                  <img
                    src={imgCardLogo.src}
                    alt="Princeton Academy"
                    className="absolute left-4 top-4 h-[78px] w-[78px] object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[13px] font-extrabold uppercase text-[#b80000]">
                    {program.category}
                  </p>
                  <h2 className="mt-3 text-[28px] font-extrabold leading-tight">
                    {isEn && program.nameEn ? program.nameEn : program.name}
                  </h2>
                  <p className="mt-2 inline-flex w-fit rounded-full border border-[#b80000] bg-white px-4 py-2 text-[16px] font-bold text-[#620000]">
                    {isEn && program.ageEn ? program.ageEn : program.age}
                  </p>
                  <p className="mt-3 line-clamp-3 text-[16px] font-medium leading-7">
                    {isEn && program.excerptEn ? program.excerptEn : program.excerpt}
                  </p>
                  <Link
                    href={`/khoi-lop/${program.slug}`}
                    className="mt-auto inline-flex w-fit rounded-full bg-[#b80000] px-5 py-3 text-[15px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000]"
                  >
                    {t("classes.viewSchedule")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
