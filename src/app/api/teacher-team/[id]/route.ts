import { NextResponse } from "next/server";
import {
  archiveTeacherTeamItem,
  updateTeacherTeamItem,
  type UpdateTeacherTeamInput,
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
    const body = (await request.json()) as Partial<UpdateTeacherTeamInput>;
    await updateTeacherTeamItem(id, body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể cập nhật đội ngũ giáo viên.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    await archiveTeacherTeamItem(id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể ẩn đội ngũ giáo viên.";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
