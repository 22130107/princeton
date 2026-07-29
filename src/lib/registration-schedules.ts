import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "./mysql";

export type RegistrationScheduleStatus =
  | "new"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export type RegistrationSchedule = {
  id: number;
  leadId: number;
  parentName: string;
  phone: string;
  email: string;
  grade: string;
  classProgramName: string;
  requestedAt: string | null;
  status: RegistrationScheduleStatus;
  sourcePage: string;
  sourceDevice: string;
  emailStatus: string;
  emailSentAt: string | null;
  emailError: string;
  internalNote: string;
  createdAt: string;
  updatedAt: string;
};

type RegistrationScheduleRow = RowDataPacket & {
  id: number;
  lead_id: number;
  parent_name: string;
  phone: string;
  email: string | null;
  interested_grade_label: string | null;
  class_program_name: string | null;
  requested_at: Date | string | null;
  status: RegistrationScheduleStatus;
  source_page: string | null;
  source_device: string | null;
  email_status: string | null;
  email_sent_at: Date | string | null;
  email_error: string | null;
  internal_note: string | null;
  created_at: Date | string;
  updated_at: Date | string;
};

function toIso(value: Date | string | null) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  return new Date(value).toISOString();
}

function mapSchedule(row: RegistrationScheduleRow): RegistrationSchedule {
  return {
    id: row.id,
    leadId: row.lead_id,
    parentName: row.parent_name,
    phone: row.phone,
    email: row.email ?? "",
    grade: row.interested_grade_label ?? "",
    classProgramName: row.class_program_name ?? "",
    requestedAt: toIso(row.requested_at),
    status: row.status,
    sourcePage: row.source_page ?? "",
    sourceDevice: row.source_device ?? "unknown",
    emailStatus: row.email_status ?? "pending",
    emailSentAt: toIso(row.email_sent_at),
    emailError: row.email_error ?? "",
    internalNote: row.internal_note ?? "",
    createdAt: toIso(row.created_at) ?? "",
    updatedAt: toIso(row.updated_at) ?? "",
  };
}

export async function listRegistrationSchedules() {
  const pool = getMysqlPool();
  const [rows] = await pool.execute<RegistrationScheduleRow[]>(
    `SELECT
      schedules.id,
      schedules.lead_id,
      schedules.requested_at,
      schedules.status,
      schedules.email_status,
      schedules.email_sent_at,
      schedules.email_error,
      schedules.internal_note,
      schedules.created_at,
      schedules.updated_at,
      leads.parent_name,
      leads.phone,
      leads.email,
      leads.interested_grade_label,
      leads.source_page,
      leads.source_device,
      programs.name AS class_program_name
    FROM registration_schedules schedules
    INNER JOIN enrollment_leads leads ON leads.id = schedules.lead_id
    LEFT JOIN class_programs programs ON programs.id = leads.class_program_id
    ORDER BY COALESCE(schedules.requested_at, schedules.created_at) DESC, schedules.id DESC`,
  );

  return rows.map(mapSchedule);
}

export async function updateRegistrationSchedule(
  id: number,
  input: Partial<{
    status: RegistrationScheduleStatus;
    requestedAt: string | null;
    internalNote: string | null;
  }>,
) {
  const allowedStatuses: RegistrationScheduleStatus[] = [
    "new",
    "confirmed",
    "completed",
    "cancelled",
    "no_show",
  ];
  const status = input.status;

  if (status && !allowedStatuses.includes(status)) {
    return {
      ok: false as const,
      status: 422,
      message: "Trang thai lich dang ky khong hop le.",
    };
  }

  const requestedAt =
    input.requestedAt === undefined
      ? undefined
      : input.requestedAt
        ? new Date(input.requestedAt)
        : null;

  if (requestedAt instanceof Date && Number.isNaN(requestedAt.getTime())) {
    return {
      ok: false as const,
      status: 422,
      message: "Thoi gian lich dang ky khong hop le.",
    };
  }

  const pool = getMysqlPool();
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE registration_schedules
     SET
      status = COALESCE(:status, status),
      requested_at = CASE WHEN :hasRequestedAt THEN :requestedAt ELSE requested_at END,
      internal_note = CASE WHEN :hasInternalNote THEN :internalNote ELSE internal_note END
     WHERE id = :id`,
    {
      id,
      status: status ?? null,
      hasRequestedAt: input.requestedAt !== undefined,
      requestedAt: requestedAt ? requestedAt.toISOString().slice(0, 19).replace("T", " ") : null,
      hasInternalNote: input.internalNote !== undefined,
      internalNote: input.internalNote ?? null,
    },
  );

  if (!result.affectedRows) {
    return {
      ok: false as const,
      status: 404,
      message: "Khong tim thay lich dang ky.",
    };
  }

  return { ok: true as const, status: 200 };
}

export async function deleteRegistrationSchedule(id: number) {
  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute<(RowDataPacket & { lead_id: number })[]>(
      "SELECT lead_id FROM registration_schedules WHERE id = :id LIMIT 1",
      { id },
    );
    const leadId = rows[0]?.lead_id;

    if (!leadId) {
      await connection.rollback();
      return {
        ok: false as const,
        status: 404,
        message: "Khong tim thay lich dang ky.",
      };
    }

    await connection.execute("DELETE FROM enrollment_leads WHERE id = :leadId", {
      leadId,
    });

    await connection.commit();
    return { ok: true as const, status: 200 };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
