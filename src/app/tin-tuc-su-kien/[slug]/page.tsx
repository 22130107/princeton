import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { getNewsPost, newsPosts } from "@/data/newsPosts";
import imgWaveTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) {
    return {
      title: "Tin tức | Trường Mầm non Princeton",
    };
  }

  return {
    title: `${post.title} | Trường Mầm non Princeton`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) notFound();

  const relatedPosts = newsPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <article className="relative mt-6 overflow-hidden bg-[#ffc107] px-4 pb-12 pt-24 md:mt-10 md:px-10 md:pb-16 md:pt-36">
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
            href="/tin-tuc-su-kien"
            className="inline-flex rounded-full border border-[#b80000] bg-white px-5 py-3 text-[14px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(98,0,0,0.18)]"
          >
            Quay lại tin tức
          </Link>

          <div className="mt-7 overflow-hidden rounded-[42px] border border-[#b80000] bg-[#fffefa] shadow-[6px_6px_0_rgba(184,0,0,0.25)]">
            <img
              src={post.image.src}
              alt={post.title}
              className="h-[280px] w-full object-cover md:h-[500px]"
            />
            <div className="p-6 md:p-10">
              <p className="text-[14px] font-extrabold uppercase text-[#b80000]">
                {post.category}
              </p>
              <h1 className="mt-4 text-[34px] font-extrabold leading-tight md:text-[56px]">
                {post.title}
              </h1>
              <p className="mt-5 text-[18px] font-bold leading-8 md:text-[22px] md:leading-9">
                {post.excerpt}
              </p>

              <div className="mt-8 space-y-5 text-[17px] font-medium leading-8 md:text-[19px] md:leading-9">
                {post.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-[28px] font-extrabold uppercase md:text-[42px]">
              Tin liên quan
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tin-tuc-su-kien/${item.slug}`}
                  className="overflow-hidden rounded-[30px] border border-[#b80000] bg-[#fffefa] text-[#620000] no-underline shadow-[4px_4px_0_rgba(184,0,0,0.22)]"
                >
                  <img src={item.image.src} alt={item.title} className="h-[160px] w-full object-cover" />
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
