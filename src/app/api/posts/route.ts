import { NextResponse } from "next/server";
import { getNewsPosts } from "@/lib/content";
import { createPost, type CreatePostInput } from "@/lib/content-write";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getNewsPosts();

  return NextResponse.json({ ok: true, posts });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreatePostInput>;
    const id = await createPost(body);

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo tin tức/sự kiện.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
