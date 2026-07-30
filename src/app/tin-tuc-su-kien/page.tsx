import type { Metadata } from "next";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { getNewsPosts } from "@/lib/content";
import imgWaveTop from "@/assets/38d9a61e041eae8aa98304a4098248683a3a95d6.png";
import NewsSearchList from "./NewsSearchList";

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

          <NewsSearchList initialPosts={newsPosts} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
