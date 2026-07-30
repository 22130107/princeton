import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

type MediaRouteProps = {
  params: Promise<{
    file: string;
  }>;
};

export async function GET(_request: Request, { params }: MediaRouteProps) {
  const { file } = await params;

  if (!/^[a-zA-Z0-9._-]+$/.test(file)) {
    return NextResponse.json({ message: "Invalid media file." }, { status: 400 });
  }

  const uploadRoot = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "uploads");
  const assetRoot = path.join(/*turbopackIgnore: true*/ process.cwd(), "src", "assets");
  const candidates = [
    path.join(uploadRoot, file),
    path.join(assetRoot, file),
    path.join(assetRoot, "sticker", file),
  ];

  for (const candidate of candidates) {
    try {
      const body = await readFile(candidate);
      const ext = path.extname(candidate).toLowerCase();

      return new Response(body, {
        headers: {
          "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      // Try the next known media folder.
    }
  }

  return NextResponse.json({ message: "Media file not found." }, { status: 404 });
}
