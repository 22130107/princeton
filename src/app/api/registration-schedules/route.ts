import { NextResponse } from "next/server";
import { listRegistrationSchedules } from "@/lib/registration-schedules";

export const runtime = "nodejs";

export async function GET() {
  try {
    const schedules = await listRegistrationSchedules();
    return NextResponse.json({ schedules });
  } catch (error) {
    console.error("Failed to list registration schedules", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Khong the tai lich dang ky.",
      },
      { status: 500 },
    );
  }
}
