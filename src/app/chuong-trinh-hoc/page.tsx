import type { Metadata } from "next";
import Link from "next/link";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { CoverImage } from "@/components/Shared/CoverImage";
import { getCurriculumTracks } from "@/lib/content";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import imgLogo from "@/assets/logo.png";
import imgCardLogo from "@/assets/logo1.png";
import imgWaveTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";

export const metadata: Metadata = {
  title: "Cuộc sống tại Princeton | Trường Mầm non Princeton",
  description:
    "Khám phá các chương trình học tại Trường Mầm non Princeton: chương trình tiêu chuẩn, nâng cao và các hoạt động phát triển toàn diện.",
  openGraph: {
    title: "Cuộc sống tại Princeton | Trường Mầm non Princeton",
    description:
      "Các chương trình học được xây dựng để trẻ phát triển cân bằng về ngôn ngữ, tư duy, vận động và kỹ năng xã hội.",
  },
};

export const dynamic = "force-dynamic";

export default async function ChuongTrinhHocPage() {
  const t = await getServerT();
  const lang = await getServerLang();
  const isEn = lang === "en";
  const tracks = await getCurriculumTracks();

  return (
    <main className="min-h-screen bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative mt-6 overflow-hidden bg-[#F4D06F] px-4 pb-10 pt-28 md:mt-10 md:px-10 md:pb-16 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[2] h-[25px] bg-repeat-x"
          style={{
            backgroundImage: `url("${imgWaveTop.src}")`,
            backgroundSize: "176px 25px",
            backgroundPosition: "top left",
          }}
        />
        <div className="relative z-[3] mx-auto max-w-[1180px]">
          <div className="mx-auto max-w-[860px] text-center">
            <h1 className="text-[34px] font-extrabold uppercase leading-tight md:text-[58px]">
              {t("curriculum.heroTitle")}
            </h1>
            <p className="mx-auto mt-4 max-w-[760px] text-[16px] font-medium leading-7 md:text-[20px] md:leading-8">
              {t("curriculum.heroText")}
            </p>
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <article
                key={track.slug}
                className="flex min-h-[520px] flex-col overflow-hidden border border-[#b80000] bg-[#fffefa] shadow-[4px_4px_0_rgba(184,0,0,0.16)]"
              >
                <div className="relative h-[225px] bg-[#fff1f1]">
                  {track.imageUrl ? (
                    <CoverImage
                      src={track.imageUrl}
                      alt={track.imageAlt}
                      zoom={track.coverZoom}
                      position={track.coverPosition}
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
                    {isEn && track.categoryEn ? track.categoryEn : track.category}
                  </p>
                  <h2 className="mt-3 text-[23px] font-extrabold leading-tight md:text-[25px]">
                    {isEn && track.titleEn ? track.titleEn : track.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[16px] font-medium leading-7">
                    {isEn && track.descriptionEn ? track.descriptionEn : track.description}
                  </p>
                  <Link
                    href={`/cuoc-song-tai-princeton/${track.slug}`}
                    className="mt-auto inline-flex w-fit rounded-full bg-[#b80000] px-5 py-3 text-[15px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000]"
                  >
                    {t("curriculum.viewDetail")}
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
