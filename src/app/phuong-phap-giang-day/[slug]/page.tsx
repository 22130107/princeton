import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import RichContent from "@/components/Shared/RichContent";
import SiteFooter from "@/components/Shared/SiteFooter";
import { getTeachingMethod, getTeachingMethods } from "@/lib/content";
import imgLogo from "@/assets/logo.png";
import imgWaveTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";

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

  if (!method) {
    return {
      title: "Phương pháp giáo dục | Trường Mầm non Princeton",
    };
  }

  return {
    title: `${method.title} | Trường Mầm non Princeton`,
    description: method.excerpt,
    openGraph: {
      title: method.title,
      description: method.excerpt,
    },
  };
}

export default async function TeachingMethodDetailPage({
  params,
}: TeachingMethodDetailPageProps) {
  const { slug } = await params;
  const method = await getTeachingMethod(slug);

  if (!method) notFound();

  const teachingMethods = await getTeachingMethods();
  const relatedMethods = teachingMethods
    .filter((item) => item.slug !== method.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <article className="relative mt-6 overflow-hidden bg-[#bfefff] px-4 pb-12 pt-24 md:mt-10 md:px-10 md:pb-16 md:pt-36">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[25px] bg-repeat-x"
          style={{
            backgroundImage: `url("${imgWaveTop.src}")`,
            backgroundSize: "176px 25px",
            backgroundPosition: "top left",
          }}
        />

        <div className="relative mx-auto max-w-[1040px]">
          <Link
            href="/phuong-phap-giang-day"
            className="inline-flex rounded-full border border-[#b80000] bg-white px-5 py-3 text-[14px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(98,0,0,0.18)]"
          >
            Quay lại phương pháp
          </Link>

          <div className="mt-7 rounded-[32px] border border-[#b80000] bg-[#fffefa] p-6 shadow-[6px_6px_0_rgba(184,0,0,0.25)] md:p-10">
            <div className="mb-6 flex justify-center md:mb-8">
              <img
                src={imgLogo.src}
                alt="Princeton Academy"
                className="h-[92px] w-auto object-contain md:h-[118px]"
              />
            </div>
            <div className="mx-auto max-w-[880px] text-center">
              <p className="text-[14px] font-extrabold uppercase text-[#b80000]">
                {method.category}
              </p>
              <h1 className="mt-4 text-[34px] font-extrabold leading-tight md:text-[56px]">
                {method.title}
              </h1>
              <p className="mt-5 text-[18px] font-bold leading-8 md:text-[22px] md:leading-9">
                {method.excerpt || method.description}
              </p>
            </div>

            <div className="mt-8 text-[17px] font-medium leading-8 md:text-[19px] md:leading-9">
              <RichContent blocks={(method.content.length ? method.content : [method.description]).filter(Boolean)} />
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-[28px] font-extrabold uppercase md:text-[42px]">
              Phương pháp liên quan
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {relatedMethods.map((item) => (
                <Link
                  key={item.slug}
                  href={`/phuong-phap-giang-day/${item.slug}`}
                  className="overflow-hidden rounded-[24px] border border-[#b80000] bg-[#fffefa] text-[#620000] no-underline shadow-[4px_4px_0_rgba(184,0,0,0.22)] transition-transform duration-200 hover:-translate-y-1"
                >
                  {item.imageUrl ? (
                    <div
                      className="flex h-[140px] items-center justify-center"
                      style={{ backgroundColor: item.background || "#fffefa" }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        className="h-[104px] w-[104px] object-contain"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <p className="text-[12px] font-extrabold uppercase text-[#b80000]">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-[20px] font-extrabold leading-tight">
                      {item.title}
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
