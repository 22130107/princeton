import type { Metadata } from "next";
import Link from "next/link";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { getNewsPosts } from "@/lib/content";
import imgCardLogo from "@/assets/logo1.png";
import imgWaveTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";

export const metadata: Metadata = {
  title: "Tin Tức & Sự Kiện | Trường Mầm non Princeton",
  description:
    "Cập nhật tin tức, sự kiện, hoạt động học tập và khoảnh khắc đáng nhớ tại Trường Mầm non Princeton.",
  openGraph: {
    title: "Tin Tức & Sự Kiện | Trường Mầm non Princeton",
    description:
      "Cập nhật tin tức và sự kiện mới nhất tại Trường Mầm non Princeton.",
  },
};

export const dynamic = "force-dynamic";

export default async function TinTucSuKienPage() {
  const newsPosts = await getNewsPosts();

  return (
    <main className="min-h-screen bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative mt-6 overflow-hidden bg-[#ffe27a] px-4 pb-10 pt-28 md:mt-10 md:px-10 md:pb-16 md:pt-40">
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
          <h1 className="text-center text-[34px] font-extrabold uppercase leading-tight md:text-[58px]">
            Tin tức & sự kiện
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[16px] font-medium leading-7 md:text-[20px] md:leading-8">
            Cập nhật các hoạt động học tập, sự kiện nổi bật và những khoảnh khắc đáng nhớ tại Trường Mầm non Princeton, nơi mỗi trải nghiệm nhỏ đều góp phần nuôi dưỡng sự tự tin của trẻ.
          </p>

          <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsPosts.map((post) => (
              <article
                key={post.slug}
                className="flex min-h-[520px] flex-col overflow-hidden border border-[#b80000] bg-[#fffefa] shadow-[4px_4px_0_rgba(184,0,0,0.16)]"
              >
                <div className="relative">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      className="h-[225px] w-full object-cover"
                    />
                  ) : (
                    <div className="h-[225px] w-full bg-[#fff1f1]" />
                  )}
                  <img
                    src={imgCardLogo.src}
                    alt="Princeton Academy"
                    className="absolute left-4 top-4 h-[78px] w-[78px] object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[13px] font-extrabold uppercase text-[#b80000]">
                    {post.category}
                  </p>
                  <h2 className="mt-3 text-[23px] font-extrabold leading-tight md:text-[25px]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-[16px] font-medium leading-7">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/tin-tuc-su-kien/${post.slug}`}
                    className="mt-auto inline-flex w-fit rounded-full bg-[#b80000] px-5 py-3 text-[15px] font-extrabold uppercase text-white no-underline shadow-[0_4px_0_#800000]"
                  >
                    Xem chi tiết
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
