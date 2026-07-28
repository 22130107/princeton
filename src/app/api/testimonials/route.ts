import { NextResponse } from "next/server";
import { getTestimonials } from "@/lib/content";
import { createTestimonial, type CreateTestimonialInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const testimonials = await getTestimonials();

  return NextResponse.json({
    ok: true,
    testimonials,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateTestimonialInput>;
    const id = await createTestimonial(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo chia sẻ phụ huynh.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
