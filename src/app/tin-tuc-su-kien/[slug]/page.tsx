import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import RichContent from "@/components/Shared/RichContent";
import SiteFooter from "@/components/Shared/SiteFooter";
import { CoverImage } from "@/components/Shared/CoverImage";
import { getNewsPost, getNewsPosts } from "@/lib/content";
import { getServerT } from "@/lib/i18n-server";
import imgLogo from "@/assets/logo.png";
import imgCardLogo from "@/assets/logo1.png";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);

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
  const t = await getServerT();
  const post = await getNewsPost(slug);

  if (!post) notFound();

  const newsPosts = await getNewsPosts();
  const relatedPosts = newsPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

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
            href="/tin-tuc-su-kien"
            className="mb-6 inline-flex rounded-full border border-[#ff1f1f] bg-white px-5 py-3 text-[14px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(255,31,31,0.18)]"
          >
            {t("news.back")}
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
                {post.category}
              </p>
              <h1 className="mt-3 text-[30px] font-extrabold leading-tight text-[#b80000] md:text-[52px]">
                {post.title}
              </h1>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-[1040px] md:mt-10">
            {post.imageUrl ? (
              <div className="relative h-[260px] w-full overflow-hidden rounded-[18px] md:h-[460px]">
                <CoverImage
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  zoom={post.coverZoom}
                  position={post.coverPosition}
                  frameAspect={1040 / 460}
                />
              </div>
            ) : null}
            <div className="px-2 py-7 md:px-6 md:py-9">
              <p className="text-[18px] font-bold leading-8 text-[#620000] md:text-[22px] md:leading-9">
                {post.excerpt}
              </p>

              <div className="mt-8 text-[17px] font-medium leading-8 md:text-[19px] md:leading-9">
                <RichContent blocks={post.content} />
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto mt-10 max-w-[1180px]">
          <h2 className="text-[28px] font-extrabold uppercase text-[#b80000] md:text-[42px]">
            {t("news.related")}
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.slug}
                href={`/tin-tuc-su-kien/${item.slug}`}
                className="overflow-hidden border border-[#ff1f1f] bg-white text-[#620000] no-underline shadow-[4px_4px_0_rgba(255,31,31,0.12)]"
              >
                <div className="relative">
                  {item.imageUrl ? (
                    <div className="relative h-[160px] w-full">
                      <CoverImage
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        zoom={item.coverZoom}
                        position={item.coverPosition}
                        frameAspect={2.25}
                      />
                    </div>
                  ) : (
                    <div className="h-[160px] w-full bg-[#fff1f1]" />
                  )}
                  <img
                    src={imgCardLogo.src}
                    alt="Princeton Academy"
                    className="absolute left-3 top-3 h-[62px] w-[62px] object-contain"
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
      </article>
      <SiteFooter />
    </main>
  );
}
