import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import RichContent from "@/components/Shared/RichContent";
import SiteFooter from "@/components/Shared/SiteFooter";
import { CoverImage } from "@/components/Shared/CoverImage";
import { getClassProgram, getClassPrograms } from "@/lib/content";
import imgLogo from "@/assets/logo.png";
import imgCardLogo from "@/assets/logo1.png";

type ClassDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ClassDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await getClassProgram(slug);

  if (!program) {
    return {
      title: "Khối lớp | Trường Mầm non Princeton",
    };
  }

  return {
    title: `${program.name} ${program.age} | Trường Mầm non Princeton`,
    description: program.excerpt,
    openGraph: {
      title: `${program.name} ${program.age}`,
      description: program.excerpt,
    },
  };
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { slug } = await params;
  const program = await getClassProgram(slug);

  if (!program) notFound();

  const classPrograms = await getClassPrograms();
  const relatedPrograms = classPrograms.filter((item) => item.slug !== program.slug);
  const scheduleItems = program.schedule.map((item) => item.trim()).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#fffefa] pt-[80px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="bg-[#fffefa] px-3 py-6 md:px-8 md:py-10">
        <div className="mx-auto max-w-[1180px]">
          <Link
            href="/khoi-lop"
            className="mb-6 inline-flex rounded-full border border-[#ff1f1f] bg-white px-5 py-3 text-[14px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(255,31,31,0.18)]"
          >
            Quay lại khối lớp
          </Link>
        </div>

        <article className="mx-auto max-w-[1180px] border-2 border-[#ff1f1f] bg-white px-4 pb-10 pt-7 md:px-12 md:pb-14 md:pt-10">
          <header className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <img
              src={imgLogo.src}
              alt="Princeton Academy"
              className="h-[92px] w-[92px] rounded-[16px] object-cover md:h-[118px] md:w-[118px]"
            />
            <div className="mt-6 w-full px-5 py-3 md:px-9 md:py-5">
              <p className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-[#b80000] md:text-[15px]">
                {program.category}
              </p>
              <h1 className="mt-3 text-[34px] font-extrabold uppercase leading-tight text-[#b80000] md:text-[58px]">
                {program.name}
              </h1>
              <p className="mt-3 text-[22px] font-bold text-[#b80000] md:text-[28px]">
                {program.age}
              </p>
            </div>
          </header>

          <div className="mx-auto mt-8 max-w-[1040px] md:mt-10">
            <div className="flex min-h-[260px] items-center justify-center bg-[#fff1f1] md:min-h-[430px]">
              {program.imageUrl ? (
                <img
                  src={program.imageUrl}
                  alt={program.imageAlt}
                  className="max-h-[210px] max-w-[72%] object-contain md:max-h-[340px]"
                />
              ) : null}
            </div>

            <div className="px-2 py-7 md:px-6 md:py-9">
              <p className="text-[18px] font-bold leading-8 text-[#620000] md:text-[22px] md:leading-9">
                {program.excerpt}
              </p>

              {program.description ? (
                <div className="mt-8 text-[17px] font-medium leading-8 text-[#620000] md:text-[19px] md:leading-9">
                  <RichContent blocks={[program.description]} />
                </div>
              ) : null}

              {scheduleItems.length ? (
                <section className="mt-10">
                <h2 className="text-[28px] font-extrabold uppercase text-[#b80000] md:text-[42px]">
                  Lịch học
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {scheduleItems.map((item) => (
                    <article key={item} className="border border-[#ff1f1f] bg-white px-5 py-4">
                      <div className="text-[17px] font-medium leading-8 md:text-[18px]">
                        <RichContent blocks={[item]} />
                      </div>
                    </article>
                  ))}
                </div>
                </section>
              ) : null}
            </div>
          </div>
        </article>

        <section className="mx-auto mt-10 max-w-[1180px]">
          <h2 className="text-[28px] font-extrabold uppercase text-[#b80000] md:text-[42px]">
            Các khối lớp khác
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {relatedPrograms.map((item) => (
              <Link
                key={item.slug}
                href={`/khoi-lop/${item.slug}`}
                className="overflow-hidden border border-[#ff1f1f] bg-[#fffefa] text-center text-[#620000] no-underline shadow-[4px_4px_0_rgba(255,31,31,0.12)]"
              >
                <div
                  className="relative flex min-h-[128px] items-center justify-center p-4 pt-12"
                  style={{ backgroundColor: item.color || "#fffefa" }}
                >
                  <img
                    src={imgCardLogo.src}
                    alt="Princeton Academy"
                    className="absolute left-3 top-3 h-[62px] w-[62px] object-contain"
                  />
                  {item.imageUrl ? (
                    <div className="h-16 w-16 overflow-hidden rounded-[12px]">
                      <CoverImage
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        zoom={item.coverZoom}
                        position={item.coverPosition}
                        frameAspect={1}
                      />
                    </div>
                  ) : (
                    <img src={imgLogo.src} alt="Princeton Academy" className="h-16 w-16 rounded-[12px] object-cover" />
                  )}
                </div>
                <div className="bg-[#fffefa] p-4">
                  <h3 className="text-[20px] font-extrabold">{item.name}</h3>
                  <p className="mt-1 text-[15px] font-bold">{item.age}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
