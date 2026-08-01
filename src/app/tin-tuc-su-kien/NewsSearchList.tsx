"use client";

import Link from "next/link";
import { Loader2, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import imgCardLogo from "@/assets/logo1.png";
import { CoverImage } from "@/components/Shared/CoverImage";

const POSTS_PER_PAGE = 6;
const POST_CARD_ASPECT = 360 / 225;

export type NewsSearchPost = {
  id: number;
  slug: string;
  imageUrl: string;
  imageAlt: string;
  coverPosition: string;
  coverZoom: number;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
};

type PostsResponse = {
  ok: boolean;
  posts: NewsSearchPost[];
  page?: number;
  total?: number;
  totalPages?: number;
};

type NewsSearchListProps = {
  initialPosts: NewsSearchPost[];
};

function getInitialPagePosts(posts: NewsSearchPost[]) {
  return posts.slice(0, POSTS_PER_PAGE);
}

export default function NewsSearchList({ initialPosts }: NewsSearchListProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(() => getInitialPagePosts(initialPosts));
  const [total, setTotal] = useState(initialPosts.length);
  const [totalPages, setTotalPages] = useState(
    Math.max(1, Math.ceil(initialPosts.length / POSTS_PER_PAGE)),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const hasSearch = Boolean(query.trim());
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = (params.get("q") ?? "").trim();
    const initialPage = Number.parseInt(params.get("page") ?? "1", 10);

    if (initialQuery) {
      setQuery(initialQuery);
      setIsSearchOpen(true);
    }
    if (Number.isFinite(initialPage) && initialPage > 1) setPage(initialPage);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      const nextTotalPages = Math.max(1, Math.ceil(initialPosts.length / POSTS_PER_PAGE));
      const nextPage = Math.min(page, nextTotalPages);
      const startIndex = (nextPage - 1) * POSTS_PER_PAGE;

      setPosts(initialPosts.slice(startIndex, startIndex + POSTS_PER_PAGE));
      setTotal(initialPosts.length);
      setTotalPages(nextTotalPages);
      if (nextPage !== page) setPage(nextPage);
      window.history.replaceState(
        null,
        "",
        nextPage > 1 ? `/tin-tuc-su-kien?page=${nextPage}` : "/tin-tuc-su-kien",
      );
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams({
        q: trimmedQuery,
        page: String(page),
        limit: String(POSTS_PER_PAGE),
      });

      setIsLoading(true);
      fetch(`/api/posts?${params.toString()}`, { signal: controller.signal })
        .then((response) => response.json() as Promise<PostsResponse>)
        .then((data) => {
          if (!data.ok) return;
          setPosts(data.posts);
          setTotal(data.total ?? data.posts.length);
          setTotalPages(data.totalPages ?? 1);
          window.history.replaceState(null, "", `/tin-tuc-su-kien?${params.toString()}`);
        })
        .catch((error) => {
          if ((error as Error).name !== "AbortError") {
            setPosts([]);
            setTotal(0);
            setTotalPages(1);
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false);
        });
    }, 260);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [initialPosts, isReady, page, query]);

  function clearSearch() {
    setQuery("");
    setPage(1);
    inputRef.current?.focus();
  }

  function closeSearch() {
    setQuery("");
    setPage(1);
    setIsSearchOpen(false);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <section className="mt-8">
      <div className="flex w-full justify-end">
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsSearchOpen(true);
            window.setTimeout(() => inputRef.current?.focus(), 0);
          }}
          onKeyDown={(event) => {
            if (isSearchOpen) return;
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            setIsSearchOpen(true);
            window.setTimeout(() => inputRef.current?.focus(), 0);
          }}
          aria-label="Mở tìm kiếm"
          title="Mở tìm kiếm"
          className={`flex items-end gap-2 text-[#b80000] transition-[width] duration-300 ${
            isSearchOpen ? "w-[min(100%,300px)] md:w-[380px]" : "w-[58px]"
          }`}
        >
          <div className="relative min-w-0 flex-1 border-b-2 border-[#b80000]">
            {isSearchOpen ? (
              <input
                ref={inputRef}
                type="text"
                autoComplete="off"
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                placeholder="Search..."
                className="h-10 w-full border-0 bg-transparent pr-9 text-[15px] font-bold text-[#620000] outline-none placeholder:text-[#b80000]/55 md:text-[16px]"
              />
            ) : null}
            {hasSearch ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  clearSearch();
                }}
                aria-label="Xóa tìm kiếm"
                title="Xóa tìm kiếm"
                className="absolute right-0 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-[#b80000]/70 transition-colors hover:bg-white/70 hover:text-[#b80000]"
              >
                <X size={14} strokeWidth={3} />
              </button>
            ) : null}
          </div>
          {!isSearchOpen ? (
            <Search className="mb-2 shrink-0 stroke-[3]" size={22} />
          ) : isLoading ? (
            <Loader2 className="mb-2 shrink-0 animate-spin" size={18} />
          ) : (
            <Search className="mb-2 shrink-0 stroke-[3]" size={22} />
          )}
          {isSearchOpen ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                closeSearch();
              }}
              aria-label="Đóng tìm kiếm"
              title="Đóng tìm kiếm"
              className="mb-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[#b80000]/20 bg-white/75 text-[#b80000] shadow-[0_3px_8px_rgba(98,0,0,0.12)] transition-all hover:-translate-y-0.5 hover:bg-[#b80000] hover:text-white"
            >
              <X size={15} strokeWidth={3} />
            </button>
          ) : null}
        </div>
      </div>

      {posts.length ? (
        <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex min-h-[520px] flex-col overflow-hidden border border-[#b80000] bg-[#fffefa] shadow-[4px_4px_0_rgba(184,0,0,0.16)]"
            >
              <div className="relative">
                {post.imageUrl ? (
                  <div className="relative h-[225px] w-full">
                    <CoverImage
                      src={post.imageUrl}
                      alt={post.imageAlt}
                      zoom={post.coverZoom}
                      position={post.coverPosition}
                      frameAspect={POST_CARD_ASPECT}
                    />
                  </div>
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
                <p className="mt-3 line-clamp-3 text-[16px] font-medium leading-7">
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
      ) : (
        <div className="mx-auto mt-9 max-w-[720px] border border-[#b80000] bg-[#fffefa] px-6 py-8 text-center shadow-[4px_4px_0_rgba(184,0,0,0.16)]">
          <h2 className="text-[26px] font-extrabold uppercase text-[#b80000]">
            Chưa tìm thấy bài viết phù hợp
          </h2>
          <p className="mt-3 text-[17px] font-medium leading-7">
            Thử tìm bằng từ khóa ngắn hơn, tên hoạt động, hoặc danh mục bài viết.
          </p>
        </div>
      )}

      {totalPages > 1 ? (
        <nav
          aria-label="Phân trang tin tức"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {page > 1 ? (
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="inline-flex min-h-11 items-center rounded-full border border-[#b80000] bg-[#fffefa] px-5 text-[15px] font-extrabold uppercase text-[#b80000] shadow-[0_3px_0_rgba(184,0,0,0.16)]"
            >
              Trang trước
            </button>
          ) : null}

          {pageNumbers.map((pageNumber) => {
            const isCurrentPage = pageNumber === page;

            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                aria-current={isCurrentPage ? "page" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-[15px] font-extrabold shadow-[0_3px_0_rgba(184,0,0,0.16)] ${
                  isCurrentPage
                    ? "border-[#620000] bg-[#b80000] text-white"
                    : "border-[#b80000] bg-[#fffefa] text-[#b80000]"
                }`}
              >
                Trang {pageNumber}
              </button>
            );
          })}

          {page < totalPages ? (
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="inline-flex min-h-11 items-center rounded-full border border-[#b80000] bg-[#fffefa] px-5 text-[15px] font-extrabold uppercase text-[#b80000] shadow-[0_3px_0_rgba(184,0,0,0.16)]"
            >
              Trang sau
            </button>
          ) : null}
        </nav>
      ) : null}
    </section>
  );
}
