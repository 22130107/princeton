import { NextResponse } from "next/server";
import { getGalleryImages } from "@/lib/content";
import { createGalleryImage, type CreateGalleryImageInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const images = await getGalleryImages();

  return NextResponse.json({
    ok: true,
    images,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateGalleryImageInput>;
    const id = await createGalleryImage(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo ảnh khoảnh khắc.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
