import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2/promise";
import { getMysqlPool } from "@/lib/mysql";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/svg+xml", "svg"],
]);

const maxFileSize = 8 * 1024 * 1024;

function cleanAlt(value: FormDataEntryValue | null, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, message: "Vui lòng chọn ảnh/icon." }, { status: 400 });
    }

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { ok: false, message: "Chỉ hỗ trợ JPG, PNG, WebP hoặc SVG." },
        { status: 400 },
      );
    }

    if (file.size > maxFileSize) {
      return NextResponse.json(
        { ok: false, message: "Ảnh/icon không được vượt quá 8MB." },
        { status: 400 },
      );
    }

    const extension = allowedTypes.get(file.type) ?? "png";
    const fileName = `${randomUUID()}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);
    const url = `/uploads/${fileName}`;

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

    const pool = getMysqlPool();
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO media_assets (file_name, original_name, mime_type, url, alt_text, size_bytes, folder)
       VALUES (:fileName, :originalName, :mimeType, :url, :altText, :sizeBytes, 'uploads')`,
      {
        fileName,
        originalName: file.name,
        mimeType: file.type,
        url,
        altText: cleanAlt(formData.get("alt"), file.name),
        sizeBytes: file.size,
      },
    );

    return NextResponse.json({
      ok: true,
      asset: {
        id: result.insertId,
        url,
        alt: cleanAlt(formData.get("alt"), file.name),
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Không thể upload ảnh/icon." },
      { status: 500 },
    );
  }
}
