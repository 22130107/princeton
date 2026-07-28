import { NextResponse } from "next/server";
import {
  archiveCurriculumTrack,
  updateCurriculumTrack,
  type UpdateCurriculumTrackInput,
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
    const body = (await request.json()) as Partial<UpdateCurriculumTrackInput>;
    await updateCurriculumTrack(id, body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể cập nhật chương trình học.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    await archiveCurriculumTrack(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể ẩn chương trình học.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
