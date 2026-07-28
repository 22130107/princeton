import { NextResponse } from "next/server";
import { createEnrollmentLead, type EnrollmentLeadInput } from "@/lib/enrollment";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<EnrollmentLeadInput>;
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() ?? null;
    const userAgent = request.headers.get("user-agent");

    const result = await createEnrollmentLead(body as EnrollmentLeadInput, {
      ipAddress,
      userAgent,
    });

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, errors: result.errors },
        { status: result.status },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        leadId: result.leadId,
        message: "Đăng ký thành công.",
      },
      { status: result.status },
    );
  } catch (error) {
    console.error("Failed to create enrollment lead", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Không thể lưu đăng ký. Vui lòng thử lại sau.",
      },
      { status: 500 },
    );
  }
}
