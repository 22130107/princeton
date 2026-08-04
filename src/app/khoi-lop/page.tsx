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

export const metadata: Metadata = {
  title: "Chương trình học | Trường Mầm non Princeton",
  description:
    "Hệ thống khối lớp Penguin, Wombat, Koala, Kangaroo và Preschool tại Trường Mầm non Princeton.",
  openGraph: {
    title: "Chương trình học | Trường Mầm non Princeton",
    description:
      "Khám phá hệ thống khối lớp theo độ tuổi tại Trường Mầm non Princeton.",
  },
};

export const dynamic = "force-dynamic";

export default async function KhoiLopPage() {
  const t = await getServerT();
  const lang = await getServerLang();
  const isEn = lang === "en";
  const classPrograms = await getClassPrograms();

  return (
    <main className="min-h-screen bg-[#F7F4F2] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative overflow-hidden bg-[#F7F4F2] px-4 pb-10 pt-28 md:px-10 md:pb-16 md:pt-40">
        <div className="relative z-[3] mx-auto max-w-[1180px]">
          <h1 className="text-center text-[34px] font-extrabold uppercase leading-tight text-[#991B1B] md:text-[58px]">
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
                    {isEn && program.categoryEn ? program.categoryEn : program.category}
                  </p>
                  <h2 className="mt-3 text-[28px] font-extrabold leading-tight text-[#991B1B]">
                    {isEn && program.nameEn ? program.nameEn : program.name}
                  </h2>
                  <p className="mt-2 inline-flex w-fit rounded-full border border-[#b80000] bg-white px-4 py-2 text-[16px] font-bold text-[#620000]">
                    {isEn && program.ageEn ? program.ageEn : program.age}
                  </p>
                  <p className="mt-3 line-clamp-3 text-[16px] font-medium leading-7">
                    {isEn && program.excerptEn ? program.excerptEn : program.excerpt}
                  </p>
                  <Link
                    href={`/chuong-trinh-hoc/${program.slug}`}
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
