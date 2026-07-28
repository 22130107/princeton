import { NextResponse } from "next/server";
import {
  archiveFacilityImage,
  updateFacilityImage,
  type UpdateFacilityImageInput,
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
    const body = (await request.json()) as Partial<UpdateFacilityImageInput>;
    await updateFacilityImage(id, body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể cập nhật ảnh cơ sở vật chất.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    await archiveFacilityImage(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể ẩn ảnh cơ sở vật chất.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
