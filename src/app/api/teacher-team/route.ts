import { NextResponse } from "next/server";
import { getTeacherTeamItems } from "@/lib/content";
import { createTeacherTeamItem, type CreateTeacherTeamInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const teachers = await getTeacherTeamItems();

  return NextResponse.json({
    ok: true,
    teachers,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateTeacherTeamInput>;
    const id = await createTeacherTeamItem(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo đội ngũ giáo viên.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
