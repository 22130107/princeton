import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getMysqlPool } from "./mysql";

export type EnrollmentLeadInput = {
  parentName: string;
  phone: string;
  email: string;
  grade: string;
  agreed: boolean;
  sourcePage?: string;
  sourceDevice?: "desktop" | "mobile" | "tablet" | "unknown";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
};

type ClassProgramRow = RowDataPacket & {
  id: number;
};

type CampaignRow = RowDataPacket & {
  id: number;
};

const gradeSlugMap: Record<string, string> = {
  penguin: "penguin",
  wombat: "wombat",
  koala: "koala",
  kangaroo: "kangaroo",
  preschool: "preschool",
};

const consentText =
  "Toi xac nhan rang cac thong tin ca nhan duoc cung cap la chinh xac va dong y de Nha truong thu thap, luu tru, xu ly va su dung theo quy dinh cua phap luat ve bao ve du lieu ca nhan.";

function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function normalizeGradeToSlug(grade: string) {
  const normalized = grade.trim().toLowerCase();
  const direct = gradeSlugMap[normalized];
  if (direct) return direct;

  return Object.keys(gradeSlugMap).find((slug) => normalized.includes(slug)) ?? null;
}

export function validateEnrollmentLead(input: Partial<EnrollmentLeadInput>) {
  const errors: Record<string, string> = {};
  const parentName = input.parentName?.trim() ?? "";
  const phone = normalizePhone(input.phone?.trim() ?? "");
  const email = input.email?.trim() ?? "";
  const grade = input.grade?.trim() ?? "";

  if (parentName.length < 2) {
    errors.parentName = "Vui long nhap ho va ten.";
  }

  if (!/^\+?\d{9,15}$/.test(phone)) {
    errors.phone = "So dien thoai khong hop le.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Email khong hop le.";
  }

  if (!normalizeGradeToSlug(grade)) {
    errors.grade = "Khoi lop khong hop le.";
  }

  if (!input.agreed) {
    errors.agreed = "Can dong y xu ly du lieu ca nhan.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      parentName,
      phone,
      email,
      grade,
      sourcePage: input.sourcePage?.trim() || null,
      sourceDevice: input.sourceDevice ?? "unknown",
      utmSource: input.utmSource?.trim() || null,
      utmMedium: input.utmMedium?.trim() || null,
      utmCampaign: input.utmCampaign?.trim() || null,
      utmContent: input.utmContent?.trim() || null,
      utmTerm: input.utmTerm?.trim() || null,
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
    await connection.beginTransaction();

    const gradeSlug = normalizeGradeToSlug(validation.data.grade);

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

    await connection.commit();

    return {
      ok: true as const,
      status: 201,
      leadId: leadResult.insertId,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
