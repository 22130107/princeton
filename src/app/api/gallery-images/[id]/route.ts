import { NextResponse } from "next/server";
import {
  archiveGalleryImage,
  updateGalleryImage,
  type UpdateGalleryImageInput,
} from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<UpdateGalleryImageInput>;
    await updateGalleryImage(id, body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể cập nhật ảnh khoảnh khắc.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    await archiveGalleryImage(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể ẩn ảnh khoảnh khắc.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
