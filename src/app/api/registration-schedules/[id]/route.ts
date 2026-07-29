import { NextResponse } from "next/server";
import {
  deleteRegistrationSchedule,
  updateRegistrationSchedule,
  type RegistrationScheduleStatus,
} from "@/lib/registration-schedules";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const scheduleId = Number(id);
    if (!Number.isInteger(scheduleId) || scheduleId <= 0) {
      return NextResponse.json(
        { ok: false, message: "Ma lich dang ky khong hop le." },
        { status: 400 },
      );
    }

    const body = (await request.json()) as Partial<{
      status: RegistrationScheduleStatus;
      requestedAt: string | null;
      internalNote: string | null;
    }>;
    const result = await updateRegistrationSchedule(scheduleId, body);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to update registration schedule", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Khong the cap nhat lich dang ky.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const scheduleId = Number(id);
    if (!Number.isInteger(scheduleId) || scheduleId <= 0) {
      return NextResponse.json(
        { ok: false, message: "Ma lich dang ky khong hop le." },
        { status: 400 },
      );
    }

    const result = await deleteRegistrationSchedule(scheduleId);

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete registration schedule", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Khong the xoa lich dang ky.",
      },
      { status: 500 },
    );
  }
}
