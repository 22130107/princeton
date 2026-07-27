import type { Metadata } from "next";
import Link from "next/link";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { newsPosts } from "@/data/newsPosts";
import imgWaveTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import stickerA from "@/assets/sticker/58895c008a094b06474cacb153601040cef3cf48.png";
import stickerB from "@/assets/sticker/6344cf27-7411-4173-b9fd-570675106a47.png";
import stickerC from "@/assets/sticker/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
import stickerD from "@/assets/sticker/c0575f19-d630-4b56-b954-383cd28b2ce9.png";

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

const floatingStickers = [
  {
    image: stickerA,
    className: "left-[4%] top-[18%] h-16 w-16 md:h-24 md:w-24",
    duration: "6.4s",
    delay: "-1.2s",
    rotate: "-10deg",
  },
  {
    image: stickerB,
    className: "right-[6%] top-[12%] h-20 w-20 md:h-28 md:w-28",
    duration: "7.1s",
    delay: "-3.1s",
    rotate: "12deg",
  },
  {
    image: stickerC,
    className: "left-[8%] bottom-[12%] h-16 w-16 md:h-24 md:w-24",
    duration: "5.8s",
    delay: "-2.4s",
    rotate: "8deg",
  },
  {
    image: stickerD,
    className: "right-[9%] bottom-[18%] h-20 w-20 md:h-32 md:w-32",
    duration: "7.8s",
    delay: "-4.2s",
    rotate: "-14deg",
  },
  {
    image: stickerB,
    className: "left-[39%] top-[24%] hidden h-16 w-16 md:block md:h-24 md:w-24",
    duration: "6.8s",
    delay: "-5.2s",
    rotate: "-6deg",
  },
  {
    image: stickerA,
    className: "right-[30%] bottom-[7%] hidden h-14 w-14 md:block md:h-20 md:w-20",
    duration: "5.6s",
    delay: "-0.8s",
    rotate: "16deg",
  },
];

function FloatingStickers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden">
      {floatingStickers.map((sticker, index) => (
        <img
          key={index}
          src={sticker.image.src}
          alt=""
          className={`absolute object-contain opacity-95 drop-shadow-[0_12px_14px_rgba(98,0,0,0.22)] ${sticker.className}`}
          style={{
            animation: `news-sticker-sway ${sticker.duration} ease-in-out infinite`,
            animationDelay: sticker.delay,
            transform: `rotate(${sticker.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

export default function TinTucSuKienPage() {
  return (
    <main className="min-h-screen bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <style>{`
        @keyframes news-sticker-sway {
          0%, 100% { translate: 0 0; scale: 1; }
          35% { translate: 8px -14px; scale: 1.04; }
          70% { translate: -6px 10px; scale: 0.98; }
        }
      `}</style>
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative mt-6 overflow-hidden bg-[#ffc107] px-4 pb-10 pt-28 md:mt-10 md:px-10 md:pb-16 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[2] h-[25px] bg-repeat-x"
          style={{
            backgroundImage: `url("${imgWaveTop.src}")`,
            backgroundSize: "176px 25px",
            backgroundPosition: "top left",
          }}
        />
        <FloatingStickers />
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
                className="flex min-h-[560px] flex-col overflow-hidden rounded-[42px] border border-[#b80000] bg-[#fffefa] shadow-[4px_4px_0_rgba(184,0,0,0.28)]"
              >
                <img
                  src={post.image.src}
                  alt={post.title}
                  className="h-[255px] w-full rounded-b-[0] rounded-t-[40px] object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[13px] font-extrabold uppercase text-[#b80000]">
                    {post.category}
                  </p>
                  <h2 className="mt-4 text-[24px] font-extrabold leading-tight md:text-[26px]">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-[16px] font-medium leading-7">
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
