import type { Metadata } from "next";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import { getNewsPosts } from "@/lib/content";
import { getServerT } from "@/lib/i18n-server";
import { buildMetadata } from "@/lib/seo";
import NewsSearchList from "./NewsSearchList";

export const metadata: Metadata = buildMetadata({
  title: "Hợp tác cùng Princeton",
  description:
    "Cơ hội hợp tác nhượng quyền thương hiệu mầm non Princeton Academy. Đồng hành cùng mô hình giáo dục chuẩn Mỹ bền vững, tối ưu vận hành và lan tỏa giá trị tri thức vượt trội.",
  path: "/hop-tac-cung-princeton",
});

export const dynamic = "force-dynamic";

export default async function TinTucSuKienPage() {
  const t = await getServerT();
  const newsPosts = await getNewsPosts();

  return (
    <main className="min-h-screen bg-[#F7F4F2] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative overflow-hidden bg-[#F7F4F2] px-4 pb-10 pt-28 md:px-10 md:pb-16 md:pt-40">
        <div className="relative z-[3] mx-auto max-w-[1180px]">
          <h1 className="text-center text-[34px] font-extrabold uppercase leading-tight text-[#991B1B] md:text-[58px]">
            {t("news.heroTitle")}
          </h1>
          <p className="mx-auto mt-4 max-w-[760px] text-center text-[16px] font-medium leading-7 md:text-[20px] md:leading-8">
            {t("news.heroText")}
          </p>

          <NewsSearchList initialPosts={newsPosts} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
