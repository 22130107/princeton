import { NextResponse } from "next/server";
import { getCurriculumTracks } from "@/lib/content";
import { createCurriculumTrack, type CreateCurriculumTrackInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const tracks = await getCurriculumTracks();

  return NextResponse.json({ ok: true, tracks });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateCurriculumTrackInput>;
    const id = await createCurriculumTrack(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo chương trình học.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
