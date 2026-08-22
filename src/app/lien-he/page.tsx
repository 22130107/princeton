import type { Metadata } from "next";
import { Suspense } from "react";
import DangKyContent from "@/app/dang-ky/DangKyContent";
import { getTestimonials } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Liên hệ",
  description:
    "Liên hệ Princeton Academy để được tư vấn tuyển sinh, chương trình học, tham quan cơ sở hoặc hợp tác cùng nhà trường.",
  path: "/lien-he",
});

export const dynamic = "force-dynamic";

export default async function LienHePage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <h1 className="sr-only">Liên hệ Princeton Academy</h1>
      <Suspense fallback={<div className="min-h-screen bg-[#fffefa]" />}>
        <DangKyContent testimonials={testimonials} />
      </Suspense>
    </>
  );
}
