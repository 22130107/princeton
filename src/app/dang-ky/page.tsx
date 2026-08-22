import type { Metadata } from "next";
import { Suspense } from "react";
import DangKyContent from "./DangKyContent";
import { getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Đăng ký tuyển sinh",
  description:
    "Đăng ký nhận tư vấn chương trình học, lịch tham quan trường và thông tin tuyển sinh mới nhất từ Princeton Academy.",
  path: "/dang-ky",
});

export const dynamic = "force-dynamic";

export default async function DangKyPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <h1 className="sr-only">Đăng ký tuyển sinh Princeton Academy</h1>
      <Suspense fallback={<div className="min-h-screen bg-[#fffefa]" />}>
        <DangKyContent testimonials={testimonials} />
      </Suspense>
    </>
  );
}
