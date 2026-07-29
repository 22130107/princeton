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
        emailStatus: result.emailStatus,
        message: "\u0110\u0103ng k\u00fd th\u00e0nh c\u00f4ng.",
      },
      { status: result.status },
    );
  } catch (error) {
    console.error("Failed to create enrollment lead", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Kh\u00f4ng th\u1ec3 l\u01b0u \u0111\u0103ng k\u00fd. Vui l\u00f2ng th\u1eed l\u1ea1i sau.",
      },
      { status: 500 },
    );
  }
}
