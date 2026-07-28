import { NextResponse } from "next/server";
import {
  archiveTeachingMethod,
  updateTeachingMethod,
  type UpdateTeachingMethodInput,
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
    const body = (await request.json()) as Partial<UpdateTeachingMethodInput>;
    await updateTeachingMethod(id, body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể cập nhật phương pháp giảng dạy.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    await archiveTeachingMethod(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể ẩn phương pháp giảng dạy.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
