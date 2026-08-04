import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import RichContent from "@/components/Shared/RichContent";
import SiteFooter from "@/components/Shared/SiteFooter";
import { CoverImage } from "@/components/Shared/CoverImage";
import { getTeachingMethod, getTeachingMethods } from "@/lib/content";
import { getServerLang, getServerT } from "@/lib/i18n-server";
import imgLogo from "@/assets/logo.png";
import imgCardLogo from "@/assets/logo1.png";

type TeachingMethodDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: TeachingMethodDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const method = await getTeachingMethod(slug);
  const lang = await getServerLang();

  if (!method) {
    return {
      title: "Con đường Princeton | Trường Mầm non Princeton",
    };
  }

  const isEn = lang === "en";
  const title = isEn && method.titleEn ? method.titleEn : method.title;
  const description = isEn && method.excerptEn ? method.excerptEn : method.excerpt;

  return {
    title: `${title} | Trường Mầm non Princeton`,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function TeachingMethodDetailPage({
  params,
}: TeachingMethodDetailPageProps) {
  const { slug } = await params;
  const t = await getServerT();
  const lang = await getServerLang();
  const method = await getTeachingMethod(slug);

  if (!method) notFound();

  const isEn = lang === "en";
  const title = isEn && method.titleEn ? method.titleEn : method.title;
  const description = isEn && method.descriptionEn ? method.descriptionEn : method.description;
  const excerpt = isEn && method.excerptEn ? method.excerptEn : method.excerpt;
  const content = isEn && method.contentEn.length ? method.contentEn : method.content;

  const teachingMethods = await getTeachingMethods();
  const relatedMethods = teachingMethods
    .filter((item) => item.slug !== method.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <article className="relative mt-6 overflow-hidden bg-white px-4 pb-12 pt-12 md:mt-10 md:px-10 md:pb-16 md:pt-16">
        <div className="relative mx-auto max-w-[1040px]">
          <Link
            href="/con-duong-princeton"
            className="inline-flex rounded-full border border-[#b80000] bg-white px-5 py-3 text-[14px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(98,0,0,0.18)]"
          >
            {t("methods.back")}
          </Link>

          <div className="mt-7 border border-[#b80000] bg-white p-6 shadow-[6px_6px_0_rgba(184,0,0,0.18)] md:p-10">
            <div className="mb-6 flex justify-center md:mb-8">
              <img
                src={imgLogo.src}
                alt="Princeton Academy"
                className="h-[92px] w-auto object-contain md:h-[118px]"
              />
            </div>
            <div className="mx-auto max-w-[880px] text-center">
              <p className="text-[14px] font-extrabold uppercase text-[#b80000]">
                {lang === "en" ? method.categoryEn : method.category}
              </p>
              <h1 className="mt-4 text-[34px] font-extrabold leading-tight md:text-[56px]">
                {title}
              </h1>
              <p className="mt-5 text-[18px] font-bold leading-8 md:text-[22px] md:leading-9">
                {excerpt || description}
              </p>
            </div>

            <div className="mt-8 text-[17px] font-medium leading-8 md:text-[19px] md:leading-9">
              <RichContent blocks={(content.length ? content : [description]).filter(Boolean)} />
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-[28px] font-extrabold uppercase md:text-[42px]">
              {t("methods.related")}
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {relatedMethods.map((item) => (
                <Link
                  key={item.slug}
                  href={`/con-duong-princeton/${item.slug}`}
                  className="overflow-hidden border border-[#b80000] bg-white text-[#620000] no-underline shadow-[4px_4px_0_rgba(184,0,0,0.16)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div
                    className="relative aspect-square overflow-hidden"
                    style={{ backgroundColor: item.background || "#fffefa" }}
                  >
                    {item.imageUrl ? (
                      <CoverImage
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        zoom={item.coverZoom}
                        position={item.coverPosition}
                        frameAspect={1}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <img
                          src={imgLogo.src}
                          alt="Princeton Academy"
                          className="h-[64px] w-auto object-contain"
                        />
                      </div>
                    )}
                    <img
                      src={imgCardLogo.src}
                      alt="Princeton Academy"
                      className="absolute left-3 top-3 h-[62px] w-[62px] object-contain"
                    />
                  </div>
                  <div className="bg-white p-5">
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
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
