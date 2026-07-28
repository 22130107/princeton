import { NextResponse } from "next/server";
import { getClassPrograms } from "@/lib/content";
import { createClassProgram, type CreateClassProgramInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const programs = await getClassPrograms();

  return NextResponse.json({
    ok: true,
    programs: programs.map((program) => ({
      ...program,
      slug: program.slug,
      name: program.name,
      age: program.age,
      label: `${program.name} (${program.age})`,
    })),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateClassProgramInput>;
    const id = await createClassProgram(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo khối lớp.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
