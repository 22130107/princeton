import { NextResponse } from "next/server";
import { getFacilityImages } from "@/lib/content";
import { createFacilityImage, type CreateFacilityImageInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const images = await getFacilityImages();

  return NextResponse.json({
    ok: true,
    images,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateFacilityImageInput>;
    const id = await createFacilityImage(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo ảnh cơ sở vật chất.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
