import { NextResponse } from "next/server";
import { getRegistrationSectionSettings } from "@/lib/content";
import {
  updateRegistrationSectionSettings,
  type UpdateRegistrationSectionInput,
} from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getRegistrationSectionSettings();

  return NextResponse.json({
    ok: true,
    settings,
  });
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as UpdateRegistrationSectionInput;
    const settings = await updateRegistrationSectionSettings(body);

    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể cập nhật khối đăng ký.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
