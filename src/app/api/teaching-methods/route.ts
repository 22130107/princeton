import { NextResponse } from "next/server";
import { getTeachingMethods } from "@/lib/content";
import { createTeachingMethod, type CreateTeachingMethodInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const methods = await getTeachingMethods();

  return NextResponse.json({ ok: true, methods });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateTeachingMethodInput>;
    const id = await createTeachingMethod(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo phương pháp giảng dạy.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
