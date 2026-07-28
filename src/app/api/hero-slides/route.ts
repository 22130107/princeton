import { NextResponse } from "next/server";
import { getHeroSlides } from "@/lib/content";
import { createHeroSlide, type CreateHeroSlideInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const slides = await getHeroSlides();

  return NextResponse.json({
    ok: true,
    slides,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateHeroSlideInput>;
    const id = await createHeroSlide(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo banner.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
