import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import {
  getTeachingMethod,
  teachingMethods,
} from "@/data/teachingMethods";
import imgWaveTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";

type TeachingMethodDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return teachingMethods.map((method) => ({ slug: method.slug }));
}

export async function generateMetadata({
  params,
}: TeachingMethodDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const method = getTeachingMethod(slug);

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
  const method = getTeachingMethod(slug);

  if (!method) notFound();

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

          <div className="mt-7 overflow-hidden rounded-[42px] border border-[#b80000] bg-[#fffefa] shadow-[6px_6px_0_rgba(184,0,0,0.25)]">
            <div
              className="flex h-[280px] items-center justify-center md:h-[500px]"
              style={{ backgroundColor: method.background }}
            >
              <img
                src={method.image.src}
                alt={method.title}
                className="h-[220px] w-[220px] object-contain md:h-[360px] md:w-[360px]"
              />
            </div>
            <div className="p-6 md:p-10">
              <p className="text-[14px] font-extrabold uppercase text-[#b80000]">
                {method.category}
              </p>
              <h1 className="mt-4 text-[34px] font-extrabold leading-tight md:text-[56px]">
                {method.title}
              </h1>
              <p className="mt-5 text-[18px] font-bold leading-8 md:text-[22px] md:leading-9">
                {method.excerpt}
              </p>

              <div className="mt-8 space-y-5 text-[17px] font-medium leading-8 md:text-[19px] md:leading-9">
                {method.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
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
                  className="overflow-hidden rounded-[30px] border border-[#b80000] bg-[#fffefa] text-[#620000] no-underline shadow-[4px_4px_0_rgba(184,0,0,0.22)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div
                    className="flex h-[160px] items-center justify-center"
                    style={{ backgroundColor: item.background }}
                  >
                    <img
                      src={item.image.src}
                      alt=""
                      className="h-[120px] w-[120px] object-contain"
                    />
                  </div>
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
