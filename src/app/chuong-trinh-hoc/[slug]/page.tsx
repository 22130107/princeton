import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { classPrograms, getClassProgram } from "@/data/classPrograms";
import imgPaper from "@/assets/b8936ceb2afcdcf3ec9bf2508692d1c0866ccf6e.png";
import imgSpiral from "@/assets/19f3ec75d04d4778613b623fd67426de89defdb9.png";

type ClassDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return classPrograms.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: ClassDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getClassProgram(slug);

  if (!program) {
    return {
      title: "Chương trình học | Trường Mầm non Princeton",
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
  const program = getClassProgram(slug);

  if (!program) notFound();

  const relatedPrograms = classPrograms.filter((item) => item.slug !== program.slug);

  return (
    <main className="min-h-screen bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="bg-[#fff1f1] px-3 py-12 md:px-10 md:py-16">
        <div className="relative mx-auto max-w-[1320px] pt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-8 right-8 top-16 z-[3] h-[62px] bg-repeat-x"
            style={{
              backgroundImage: `url("${imgSpiral.src}")`,
              backgroundSize: "132px 58px",
              backgroundPosition: "top left",
            }}
          />

          <article className="relative rounded-[24px] border-[4px] border-[#3c0000] bg-[#fffefa] p-3 shadow-[8px_8px_0_#b80000] md:rounded-[34px] md:p-5">
            <div
              className="relative overflow-hidden rounded-[18px] px-4 pb-8 pt-24 md:rounded-[26px] md:px-12 md:pb-14 md:pt-28"
              style={{
                backgroundImage: `url("${imgPaper.src}")`,
                backgroundSize: "1200px auto",
                backgroundPosition: "center top",
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-3 rounded-[16px] border border-dashed border-[#d80000] md:inset-4 md:rounded-[22px]"
              />

              <div className="relative z-[1] mx-auto max-w-[1040px]">
                <Link
                  href="/chuong-trinh-hoc"
                  className="inline-flex rounded-full border border-[#b80000] bg-white px-5 py-3 text-[14px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(98,0,0,0.18)]"
                >
                  Quay lại khối lớp
                </Link>

                <div className="mt-8 grid items-center gap-8 md:grid-cols-[0.72fr_1.28fr]">
                  <div
                    className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center rounded-[34px] border border-dashed border-[#b80000]/45 shadow-[6px_6px_0_rgba(98,0,0,0.16)]"
                    style={{ backgroundColor: program.color }}
                  >
                    <img src={program.image.src} alt={program.name} className="h-[190px] w-[190px] object-contain md:h-[220px] md:w-[220px]" />
                  </div>

                  <div>
                    <p className="text-[15px] font-extrabold uppercase text-[#b80000]">
                      {program.category}
                    </p>
                    <h1 className="mt-3 text-[44px] font-extrabold uppercase leading-tight md:text-[72px]">
                      {program.name}
                    </h1>
                    <p className="mt-4 inline-flex rounded-full border border-[#b80000] bg-white px-5 py-3 text-[22px] font-bold">
                      {program.age}
                    </p>
                    <p className="mt-6 text-[18px] font-medium leading-8 md:text-[21px] md:leading-9">
                      {program.excerpt}
                    </p>
                  </div>
                </div>

                <section className="mt-10 rounded-[30px] bg-white/78 p-6 shadow-[4px_4px_0_rgba(98,0,0,0.12)] md:p-8">
                  <h2 className="text-[32px] font-extrabold uppercase leading-tight md:text-[48px]">
                    Lịch học
                  </h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {program.schedule.map((item, index) => (
                      <div
                        key={item}
                        className="rounded-[24px] border border-dashed border-[#b80000]/45 bg-[#fffefa] p-5"
                      >
                        <p className="text-[14px] font-extrabold uppercase text-[#b80000]">
                          Hoạt động {index + 1}
                        </p>
                        <p className="mt-3 text-[17px] font-medium leading-7 md:text-[18px]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-10">
                  <h2 className="text-[28px] font-extrabold uppercase md:text-[42px]">
                    Các khối lớp khác
                  </h2>
                  <div className="mt-5 grid gap-4 md:grid-cols-4">
                    {relatedPrograms.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/chuong-trinh-hoc/${item.slug}`}
                        className="rounded-[24px] border border-[#b80000] bg-white/85 p-4 text-center text-[#620000] no-underline shadow-[3px_3px_0_rgba(184,0,0,0.18)]"
                      >
                        <img src={item.image.src} alt={item.name} className="mx-auto h-16 w-16 object-contain" />
                        <h3 className="mt-3 text-[20px] font-extrabold">{item.name}</h3>
                        <p className="mt-1 text-[15px] font-bold">{item.age}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </article>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
