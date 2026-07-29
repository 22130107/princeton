import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import sharp from "sharp";
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
const webpRasterTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

function cleanAlt(value: FormDataEntryValue | null, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

type MediaAssetRow = RowDataPacket & {
  id: number;
  file_name: string;
  original_name: string | null;
  mime_type: string | null;
  url: string;
  alt_text: string | null;
  size_bytes: number | null;
  folder: string | null;
  created_at: Date | string;
};

function isSafeUploadedUrl(value: unknown) {
  return typeof value === "string" && /^\/uploads\/[a-zA-Z0-9._-]+$/.test(value);
}

async function prepareUploadImage(file: File) {
  const inputBuffer = Buffer.from(await file.arrayBuffer());

  if (!webpRasterTypes.has(file.type)) {
    const extension = allowedTypes.get(file.type) ?? "png";
    return {
      buffer: inputBuffer,
      extension,
      mimeType: file.type,
    };
  }

  const buffer = await sharp(inputBuffer, { animated: false })
    .webp({ quality: 90, effort: 4 })
    .toBuffer();

  return {
    buffer,
    extension: "webp",
    mimeType: "image/webp",
  };
}

export async function GET() {
  try {
    const pool = getMysqlPool();
    const [rows] = await pool.execute<MediaAssetRow[]>(
      `SELECT id, file_name, original_name, mime_type, url, alt_text, size_bytes, folder, created_at
       FROM media_assets
       WHERE mime_type LIKE 'image/%'
       ORDER BY created_at DESC, id DESC`,
    );

    return NextResponse.json({
      ok: true,
      assets: rows.map((asset) => ({
        id: asset.id,
        fileName: asset.file_name,
        originalName: asset.original_name ?? asset.file_name,
        mimeType: asset.mime_type ?? "",
        url: asset.url,
        alt: asset.alt_text ?? asset.original_name ?? asset.file_name,
        sizeBytes: asset.size_bytes,
        folder: asset.folder ?? "",
        isUploaded: isSafeUploadedUrl(asset.url),
        createdAt: asset.created_at instanceof Date ? asset.created_at.toISOString() : String(asset.created_at),
      })),
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Không thể tải thư viện ảnh." }, { status: 500 });
  }
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

    const uploadImage = await prepareUploadImage(file);
    const extension = uploadImage.extension;
    const fileName = `${randomUUID()}.${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);
    const url = `/uploads/${fileName}`;

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, uploadImage.buffer);

    const pool = getMysqlPool();
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO media_assets (file_name, original_name, mime_type, url, alt_text, size_bytes, folder)
       VALUES (:fileName, :originalName, :mimeType, :url, :altText, :sizeBytes, 'uploads')`,
      {
        fileName,
        originalName: file.name,
        mimeType: uploadImage.mimeType,
        url,
        altText: cleanAlt(formData.get("alt"), file.name),
        sizeBytes: uploadImage.buffer.length,
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

export async function DELETE(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as { id?: unknown; url?: unknown } | null;
    const id = typeof body?.id === "number" ? body.id : Number(body?.id);
    const url = isSafeUploadedUrl(body?.url) ? String(body?.url) : "";

    if ((!Number.isInteger(id) || id <= 0) && !url) {
      return NextResponse.json({ ok: false, message: "Không tìm thấy ảnh upload cần xóa." }, { status: 400 });
    }

    const pool = getMysqlPool();
    const [rows] = await pool.execute<MediaAssetRow[]>(
      `SELECT id, file_name, url, folder
       FROM media_assets
       WHERE ${url ? "url = :url" : "id = :id"}
       LIMIT 1`,
      { id, url },
    );
    const asset = rows[0];

    if (!asset) {
      return NextResponse.json({ ok: false, message: "Ảnh upload không còn tồn tại." }, { status: 404 });
    }

    if (!isSafeUploadedUrl(asset.url)) {
      return NextResponse.json({ ok: false, message: "Chỉ có thể xóa ảnh đã upload." }, { status: 400 });
    }

    try {
      await pool.execute<ResultSetHeader>("DELETE FROM media_assets WHERE id = :id", { id: asset.id });
    } catch (error) {
      const code = typeof error === "object" && error ? (error as { code?: string }).code : "";

      if (code === "ER_ROW_IS_REFERENCED_2" || code === "ER_ROW_IS_REFERENCED") {
        return NextResponse.json(
          { ok: false, message: "Ảnh đang được dùng ở mục bắt buộc. Hãy đổi ảnh hoặc xóa mục đó trước." },
          { status: 409 },
        );
      }

      throw error;
    }

    const uploadRoot = path.join(process.cwd(), "public", "uploads");
    const uploadFileName = path.basename(asset.url);
    const filePath = path.join(uploadRoot, uploadFileName);

    if (!filePath.startsWith(uploadRoot)) {
      return NextResponse.json({ ok: false, message: "Đường dẫn ảnh upload không hợp lệ." }, { status: 400 });
    }

    await unlink(filePath).catch((error) => {
      if (typeof error === "object" && error && (error as { code?: string }).code === "ENOENT") return;
      throw error;
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "Không thể xóa ảnh upload." }, { status: 500 });
  }
}
