import type { Metadata } from "next";
import { Suspense } from "react";
import DangKyContent from "@/app/dang-ky/DangKyContent";
import { getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Liên hệ | Trường Mầm non Princeton",
  description:
    "Liên hệ Princeton để được tư vấn tuyển sinh hoặc đăng ký hợp tác cùng nhà trường.",
  openGraph: {
    title: "Liên hệ | Trường Mầm non Princeton",
    description:
      "Liên hệ Princeton để được tư vấn tuyển sinh hoặc đăng ký hợp tác cùng nhà trường.",
  },
};

export const dynamic = "force-dynamic";

export default async function LienHePage() {
  const testimonials = await getTestimonials();
  const testimonial = testimonials.length > 0 ? testimonials[0] : null;

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fffefa]" />}>
      <DangKyContent testimonial={testimonial} />
    </Suspense>
  );
}
