import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "./mysql";
import { sendRegistrationConfirmationEmail } from "./registration-email";
import { findRegistrationCampusOption } from "./campuses";

export type EnrollmentLeadInput = {
  audience?: "parent" | "partner";
  parentName: string;
  phone: string;
  email: string;
  campusId?: number | string | null;
  campusSlug?: string | null;
  grade: string;
  agreed: boolean;
  sourcePage?: string;
  sourceDevice?: "desktop" | "mobile" | "tablet" | "unknown";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  appointmentDate?: string;
  appointmentTime?: string;
};

type ClassProgramRow = RowDataPacket & {
  id: number;
};

type CampaignRow = RowDataPacket & {
  id: number;
};

type CampusRow = RowDataPacket & {
  id: number;
  name: string;
};

const gradeSlugMap: Record<string, string> = {
  penguin: "penguin",
  wombat: "wombat",
  koala: "koala",
  kangaroo: "kangaroo",
  preschool: "preschool",
  "partner-franchise": "partner-franchise",
  "partner-admissions": "partner-admissions",
  "partner-media": "partner-media",
  "partner-vendor": "partner-vendor",
};

const consentText =
  "Tôi xác nhận rằng các thông tin cá nhân được cung cấp là chính xác và đồng ý để Nhà trường thu thập, lưu trữ, xử lý và sử dụng theo quy định của pháp luật về bảo vệ dữ liệu cá nhân.";

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function normalizeGradeToSlug(grade: string) {
  const normalized = grade.trim().toLowerCase();
  const direct = gradeSlugMap[normalized];
  if (direct) return direct;

  return Object.keys(gradeSlugMap).find((slug) => normalized.includes(slug)) ?? null;
}

function normalizeCampusId(value: EnrollmentLeadInput["campusId"]) {
  if (value === undefined || value === null || value === "") return null;

  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function normalizeCampusSlug(value: EnrollmentLeadInput["campusSlug"]) {
  return value?.trim() ?? "";
}

function getRequestedAppointmentAt(date?: string | null, time?: string | null) {
  const normalizedDate = date?.trim();
  const normalizedTime = time?.trim();

  if (!normalizedDate || !normalizedTime) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalizedDate)) return null;
  if (!/^\d{2}:\d{2}$/.test(normalizedTime)) return null;

  const appointment = new Date(`${normalizedDate}T${normalizedTime}:00`);
  if (Number.isNaN(appointment.getTime())) return null;

  return appointment;
}

function formatAppointmentLabel(value: Date | null) {
  if (!value) return "Chờ nhà trường xếp lịch";

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(value);
}

export function validateEnrollmentLead(input: Partial<EnrollmentLeadInput>) {
  const errors: Record<string, string> = {};
  const parentName = input.parentName?.trim() ?? "";
  const phone = normalizePhone(input.phone?.trim() ?? "");
  const email = input.email?.trim() ?? "";
  const grade = input.grade?.trim() ?? "";
  const campusId = normalizeCampusId(input.campusId);
  const campusSlug = normalizeCampusSlug(input.campusSlug);
  const gradeSlug = normalizeGradeToSlug(grade);
  const audience: "parent" | "partner" =
    input.audience === "partner" || gradeSlug?.startsWith("partner-") ? "partner" : "parent";

  if (campusSlug && !findRegistrationCampusOption(campusSlug)) {
    errors.campusSlug = "Cơ sở không hợp lệ.";
  }

  if (parentName.length < 2) {
    errors.parentName = "Vui lòng nhập họ và tên.";
  }

  if (!/^\+?\d{9,15}$/.test(phone)) {
    errors.phone = "Số điện thoại không hợp lệ.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (!gradeSlug) {
    errors.grade = "Khối lớp không hợp lệ.";
  }

  if (!input.agreed) {
    errors.agreed = "Cần đồng ý xử lý dữ liệu cá nhân.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      parentName,
      phone,
      email,
      audience,
      campusId,
      campusSlug,
      grade,
      sourcePage: input.sourcePage?.trim() || null,
      sourceDevice: input.sourceDevice ?? "unknown",
      utmSource: input.utmSource?.trim() || null,
      utmMedium: input.utmMedium?.trim() || null,
      utmCampaign: input.utmCampaign?.trim() || null,
      utmContent: input.utmContent?.trim() || null,
      utmTerm: input.utmTerm?.trim() || null,
      appointmentDate: input.appointmentDate?.trim() || null,
      appointmentTime: input.appointmentTime?.trim() || null,
    },
  };
}

export async function createEnrollmentLead(
  input: EnrollmentLeadInput,
  requestMeta: { ipAddress?: string | null; userAgent?: string | null } = {},
) {
  const validation = validateEnrollmentLead(input);
  if (!validation.valid) {
    return { ok: false as const, status: 422, errors: validation.errors };
  }

  const pool = getMysqlPool();
  const connection = await pool.getConnection();

  try {
    let campusId: number | null = null;
    let campusName = "";

    if (validation.data.campusSlug) {
      const campusOption = findRegistrationCampusOption(validation.data.campusSlug);

      if (!campusOption) {
        return {
          ok: false as const,
          status: 422,
          errors: { campusSlug: "Cơ sở không hợp lệ." },
        };
      }

      const [campusRows] = await connection.execute<CampusRow[]>(
        "SELECT id, name FROM campuses WHERE slug = :slug LIMIT 1",
        { slug: campusOption.slug },
      );

      if (campusRows[0]) {
        campusId = campusRows[0].id;
        campusName = campusRows[0].name;
      } else {
        const [campusResult] = await connection.execute<ResultSetHeader>(
          `INSERT INTO campuses (
            slug,
            name,
            address_line,
            sort_order,
            is_active
          ) VALUES (
            :slug,
            :name,
            :address,
            :sortOrder,
            TRUE
          )`,
          {
            slug: campusOption.slug,
            name: campusOption.name,
            address: campusOption.address,
            sortOrder: campusOption.sortOrder,
          },
        );

        campusId = campusResult.insertId;
        campusName = campusOption.name;
      }
    } else if (validation.data.campusId) {
      const [campusRows] = await connection.execute<CampusRow[]>(
        "SELECT id, name FROM campuses WHERE id = :id AND is_active = TRUE LIMIT 1",
        { id: validation.data.campusId },
      );

      if (!campusRows[0]) {
        return {
          ok: false as const,
          status: 422,
          errors: { campusId: "Cơ sở không hợp lệ." },
        };
      }

      campusId = campusRows[0].id;
      campusName = campusRows[0].name;
    }

    await connection.beginTransaction();

    const gradeSlug = normalizeGradeToSlug(validation.data.grade);
    const requestedAppointmentAt = getRequestedAppointmentAt(
      validation.data.appointmentDate,
      validation.data.appointmentTime,
    );

    const [programRows] = await connection.execute<ClassProgramRow[]>(
      "SELECT id FROM class_programs WHERE slug = :slug AND is_active = TRUE LIMIT 1",
      { slug: gradeSlug },
    );

    const [campaignRows] = await connection.execute<CampaignRow[]>(
      "SELECT id FROM campaigns WHERE slug = :slug LIMIT 1",
      { slug: "uu-dai-ghi-danh" },
    );

    const classProgramId = programRows[0]?.id ?? null;
    const campaignId = campaignRows[0]?.id ?? null;

    const [leadResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO enrollment_leads (
        parent_name,
        phone,
        email,
        class_program_id,
        interested_grade_label,
        campus_id,
        campaign_id,
        source_page,
        source_device,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        status
      ) VALUES (
        :parentName,
        :phone,
        :email,
        :classProgramId,
        :interestedGradeLabel,
        :campusId,
        :campaignId,
        :sourcePage,
        :sourceDevice,
        :utmSource,
        :utmMedium,
        :utmCampaign,
        :utmContent,
        :utmTerm,
        'new'
      )`,
      {
        parentName: validation.data.parentName,
        phone: validation.data.phone,
        email: validation.data.email,
        classProgramId,
        interestedGradeLabel: validation.data.grade,
        campusId,
        campaignId,
        sourcePage: validation.data.sourcePage,
        sourceDevice: validation.data.sourceDevice,
        utmSource: validation.data.utmSource,
        utmMedium: validation.data.utmMedium,
        utmCampaign: validation.data.utmCampaign,
        utmContent: validation.data.utmContent,
        utmTerm: validation.data.utmTerm,
      },
    );

    await connection.execute(
      `INSERT INTO lead_consents (
        lead_id,
        consent_text,
        consent_version,
        accepted,
        ip_address,
        user_agent
      ) VALUES (
        :leadId,
        :consentText,
        'v1',
        TRUE,
        :ipAddress,
        :userAgent
      )`,
      {
        leadId: leadResult.insertId,
        consentText,
        ipAddress: requestMeta.ipAddress ?? null,
        userAgent: requestMeta.userAgent ?? null,
      },
    );

    await connection.execute(
      `INSERT INTO lead_status_history (lead_id, old_status, new_status, note)
       VALUES (:leadId, NULL, 'new', 'Lead submitted from registration form')`,
      { leadId: leadResult.insertId },
    );

    await connection.execute(
      `INSERT INTO registration_schedules (
        lead_id,
        requested_at,
        status,
        email_status
      ) VALUES (
        :leadId,
        :requestedAt,
        'new',
        'pending'
      )`,
      {
        leadId: leadResult.insertId,
        requestedAt: requestedAppointmentAt
          ? requestedAppointmentAt.toISOString().slice(0, 19).replace("T", " ")
          : null,
      },
    );

    await connection.commit();

    const emailResult = await sendRegistrationConfirmationEmail({
      to: validation.data.email,
      parentName: validation.data.parentName,
      phone: validation.data.phone,
      grade: validation.data.grade,
      audience: validation.data.audience,
      campusName,
      appointmentLabel: formatAppointmentLabel(requestedAppointmentAt),
      leadId: leadResult.insertId,
    });

    await connection.execute(
      `UPDATE registration_schedules
       SET
        email_status = :emailStatus,
        email_sent_at = CASE WHEN :emailStatus = 'sent' THEN NOW() ELSE email_sent_at END,
        email_error = :emailError
       WHERE lead_id = :leadId`,
      {
        leadId: leadResult.insertId,
        emailStatus: emailResult.status,
        emailError: "error" in emailResult ? emailResult.error : null,
      },
    );

    return {
      ok: true as const,
      status: 201,
      leadId: leadResult.insertId,
      emailStatus: emailResult.status,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
