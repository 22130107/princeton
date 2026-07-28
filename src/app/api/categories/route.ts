import { NextResponse } from "next/server";
import { createCategory, getCategoryOptions } from "@/lib/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await getCategoryOptions();

    return NextResponse.json({ ok: true, categories });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tải danh mục.";

    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category = await createCategory(body);

    return NextResponse.json({ ok: true, category }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo danh mục.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
