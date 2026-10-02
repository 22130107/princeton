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
      nameEn: program.nameEn,
      age: program.age,
      ageEn: program.ageEn,
      label: program.age ? `${program.name} (${program.age})` : program.name,
      labelEn: (program.ageEn || program.age)
        ? `${program.nameEn || program.name} (${program.ageEn || program.age})`
        : (program.nameEn || program.name),
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
