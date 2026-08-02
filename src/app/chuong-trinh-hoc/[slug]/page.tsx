import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import RichContent from "@/components/Shared/RichContent";
import SiteFooter from "@/components/Shared/SiteFooter";
import { CoverImage } from "@/components/Shared/CoverImage";
import { getCurriculumTracks } from "@/lib/content";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import imgLogo from "@/assets/logo.png";
import imgCardLogo from "@/assets/logo1.png";

type CurriculumDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

async function getTrack(slug: string) {
  const tracks = await getCurriculumTracks();
  return {
    track: tracks.find((item) => item.slug === slug) ?? null,
    tracks,
  };
}

export async function generateMetadata({
  params,
}: CurriculumDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { track } = await getTrack(slug);
  const lang = await getServerLang();

  if (!track) {
    return {
      title: "Chương trình học | Trường Mầm non Princeton",
    };
  }

  const isEn = lang === "en";
  const title = isEn && track.titleEn ? track.titleEn : track.title;
  const description = isEn && track.descriptionEn ? track.descriptionEn : track.description;

  return {
    title: `${title} | Trường Mầm non Princeton`,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CurriculumDetailPage({ params }: CurriculumDetailPageProps) {
  const { slug } = await params;
  const t = await getServerT();
  const lang = await getServerLang();
  const { track, tracks } = await getTrack(slug);

  if (!track) notFound();

  const isEn = lang === "en";
  const title = isEn && track.titleEn ? track.titleEn : track.title;
  const description = isEn && track.descriptionEn ? track.descriptionEn : track.description;
  const content = isEn && track.contentEn.length ? track.contentEn : track.content;

  const relatedTracks = tracks.filter((item) => item.slug !== track.slug);

  return (
    <main className="min-h-screen bg-[#fffefa] pt-[80px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <article className="bg-[#fffefa] px-3 py-6 md:px-8 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <Link
            href="/chuong-trinh-hoc"
            className="mb-6 inline-flex rounded-full border border-[#ff1f1f] bg-white px-5 py-3 text-[14px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(255,31,31,0.18)]"
          >
            {t("curriculum.back")}
          </Link>
        </div>

        <div className="mx-auto max-w-[1180px] border-2 border-[#ff1f1f] bg-white px-4 pb-10 pt-7 md:px-12 md:pb-14 md:pt-10">
          <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <img
              src={imgLogo.src}
              alt="Princeton Academy"
              className="h-[92px] w-auto object-contain md:h-[118px]"
            />
            <div className="mt-6 w-full px-5 py-3 md:px-9 md:py-5">
              <p className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#b80000] md:text-[15px]">
                {isEn && track.categoryEn ? track.categoryEn : track.category}
              </p>
              <h1 className="mt-3 text-[30px] font-extrabold leading-tight text-[#b80000] md:text-[52px]">
                {title}
              </h1>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-[1040px] md:mt-10">
            <div className="px-2 py-7 md:px-6 md:py-9">
              <p className="text-[18px] font-bold leading-8 text-[#620000] md:text-[22px] md:leading-9">
                {description}
              </p>

              <div className="mt-8 text-[17px] font-medium leading-8 md:text-[19px] md:leading-9">
                <RichContent blocks={content.length ? content : [description]} />
              </div>
            </div>
          </div>
        </div>

        {relatedTracks.length ? (
          <section className="mx-auto mt-10 max-w-[1180px]">
            <h2 className="text-[28px] font-extrabold uppercase text-[#b80000] md:text-[42px]">
              {t("curriculum.related")}
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {relatedTracks.map((item) => (
                <Link
                  key={item.slug}
                  href={`/chuong-trinh-hoc/${item.slug}`}
                  className="overflow-hidden border border-[#ff1f1f] bg-white text-[#620000] no-underline shadow-[4px_4px_0_rgba(255,31,31,0.12)]"
                >
                  <div className="relative h-[160px] bg-[#fffefa]">
                    {item.imageUrl ? (
                      <CoverImage
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        zoom={item.coverZoom}
                        position={item.coverPosition}
                        frameAspect={2.375}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <img
                          src={imgLogo.src}
                          alt="Princeton Academy"
                          className="h-[90px] w-auto object-contain"
                        />
                      </div>
                    )}
                    <img
                      src={imgCardLogo.src}
                      alt="Princeton Academy"
                      className="absolute left-3 top-3 h-[62px] w-[62px] object-contain"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[12px] font-extrabold uppercase text-[#b80000]">
                      {isEn && item.categoryEn ? item.categoryEn : item.category}
                    </p>
                    <h3 className="mt-3 text-[20px] font-extrabold leading-tight">
                      {isEn && item.titleEn ? item.titleEn : item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <SiteFooter />
    </main>
  );
}
