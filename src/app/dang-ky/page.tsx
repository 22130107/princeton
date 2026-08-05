import type { Metadata } from "next";
import { Suspense } from "react";
import DangKyContent from "./DangKyContent";
import { getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Đăng Ký | Trường Mầm non Princeton",
  description:
    "Đăng ký nhận ưu đãi và tư vấn tuyển sinh tại Trường Mầm non Princeton.",
  openGraph: {
    title: "Đăng Ký | Trường Mầm non Princeton",
    description:
      "Đăng ký nhận ưu đãi và tư vấn tuyển sinh tại Trường Mầm non Princeton.",
  },
};

export const dynamic = "force-dynamic";

export default async function DangKyPage() {
  const testimonials = await getTestimonials();
  const testimonial = testimonials.length > 0 ? testimonials[0] : null;

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fffefa]" />}>
      <DangKyContent testimonial={testimonial} />
    </Suspense>
  );
}
