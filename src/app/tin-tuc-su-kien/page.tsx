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

const POSTS_PER_PAGE = 6;

type TinTucSuKienPageProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

function getPageParam(value: string | string[] | undefined) {
  const pageValue = Array.isArray(value) ? value[0] : value;
  const parsedPage = Number.parseInt(pageValue ?? "1", 10);

  return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

function getPageHref(pageNumber: number) {
  return `/tin-tuc-su-kien?page=${pageNumber}`;
}

export default async function TinTucSuKienPage({
  searchParams,
}: TinTucSuKienPageProps) {
  const params = await searchParams;
  const newsPosts = await getNewsPosts();
  const totalPages = Math.max(1, Math.ceil(newsPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(getPageParam(params?.page), totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = newsPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

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
            {paginatedPosts.map((post) => (
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

          {totalPages > 1 ? (
            <nav
              aria-label="Phân trang tin tức"
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              {currentPage > 1 ? (
                <Link
                  href={getPageHref(currentPage - 1)}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#b80000] bg-[#fffefa] px-5 text-[15px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(184,0,0,0.16)]"
                >
                  Trang trước
                </Link>
              ) : null}

              {pageNumbers.map((pageNumber) => {
                const isCurrentPage = pageNumber === currentPage;

                return (
                  <Link
                    key={pageNumber}
                    href={getPageHref(pageNumber)}
                    aria-current={isCurrentPage ? "page" : undefined}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-[15px] font-extrabold no-underline shadow-[0_3px_0_rgba(184,0,0,0.16)] ${
                      isCurrentPage
                        ? "border-[#620000] bg-[#b80000] text-white"
                        : "border-[#b80000] bg-[#fffefa] text-[#b80000]"
                    }`}
                  >
                    Trang {pageNumber}
                  </Link>
                );
              })}

              {currentPage < totalPages ? (
                <Link
                  href={getPageHref(currentPage + 1)}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#b80000] bg-[#fffefa] px-5 text-[15px] font-extrabold uppercase text-[#b80000] no-underline shadow-[0_3px_0_rgba(184,0,0,0.16)]"
                >
                  Trang sau
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
