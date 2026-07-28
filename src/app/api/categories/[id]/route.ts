import { NextResponse } from "next/server";
import { archiveCategory, updateCategory } from "@/lib/categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CategoryRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, { params }: CategoryRouteProps) {
  try {
    const { id } = await params;
    const body = await request.json();
    const category = await updateCategory(id, body);

    return NextResponse.json({ ok: true, category });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể cập nhật danh mục.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: CategoryRouteProps) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    await archiveCategory(id, body);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể xoá danh mục.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
