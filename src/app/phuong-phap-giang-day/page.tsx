import type { Metadata } from "next";
import HeaderSection from "@/components/Home/sections/HeaderSection";
import MobileHeader from "@/components/Mobile/MobileHeader";
import SiteFooter from "@/components/Shared/SiteFooter";
import TeachingMethodsSection from "@/components/Shared/TeachingMethodsSection";
import { getTeachingMethods } from "@/lib/content";
import { mediaImage } from "@/lib/media-url";
import imgMascotPenguin from "@/assets/7418d3b6d509d03b45710cdbc11e6c298f5a9959.png";
const imgMascotKoala = mediaImage("d088645c54f44b84375f6cb56aeabe8e06bc006b.png");

export const metadata: Metadata = {
  title: "Phương Pháp Giáo Dục | Trường Mầm non Princeton",
  description:
    "Khám phá phương pháp giáo dục mầm non tại Trường Mầm non Princeton: học qua chơi, lấy trẻ làm trung tâm, khai phóng tư duy và học qua tương tác.",
  openGraph: {
    title: "Phương Pháp Giáo Dục | Trường Mầm non Princeton",
    description:
      "Các phương pháp giáo dục hiện đại giúp trẻ học tập trọn vẹn, tự nhiên và đầy hứng khởi tại Princeton.",
  },
};

export const dynamic = "force-dynamic";

export default async function PhuongPhapGiangDayPage() {
  const methods = await getTeachingMethods();

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffefa] pt-[64px] text-[#620000] md:pt-[99px]">
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="fixed inset-x-0 top-0 z-50 hidden h-[99px] md:block">
        <HeaderSection />
      </div>

      <section className="relative bg-[#fff1f1] px-4 py-10 md:px-10 md:py-16">
        <img
          src={imgMascotPenguin.src}
          alt=""
          className="pointer-events-none absolute left-4 top-5 h-16 w-16 object-contain md:left-[8%] md:top-10 md:h-24 md:w-24"
        />
        <img
          src={imgMascotKoala.src}
          alt=""
          className="pointer-events-none absolute bottom-4 right-4 h-16 w-16 object-contain md:right-[8%] md:h-24 md:w-24"
        />
        <div className="relative z-[1] mx-auto max-w-[980px] text-center">
          <p className="mb-3 inline-flex rounded-full border border-[#b80000] bg-white px-4 py-2 text-[14px] font-bold uppercase text-[#b80000]">
            Phương pháp giáo dục
          </p>
          <h1 className="text-[40px] font-extrabold uppercase leading-[1.05] md:text-[68px]">
            Học qua trải nghiệm, lớn lên bằng sự tò mò
          </h1>
          <p className="mx-auto mt-5 max-w-[760px] text-[17px] font-medium leading-7 md:text-[22px] md:leading-8">
            Sự kết hợp hài hòa giữa các triết lý giáo dục hiện đại giúp khơi mở trọn vẹn tiềm năng tự nhiên, nuôi dưỡng tư duy độc lập và niềm yêu thích học tập suốt đời của con.
          </p>
        </div>
      </section>

      <TeachingMethodsSection
        methods={methods}
        topZigzagColor="#fff1f1"
        bottomZigzagColor="#e8f3e6"
      />

      <SiteFooter />
    </main>
  );
}
