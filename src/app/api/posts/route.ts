import { NextResponse } from "next/server";
import { getNewsPosts } from "@/lib/content";
import { createPost, type CreatePostInput } from "@/lib/content-write";
import { filterAndRankPosts } from "@/lib/post-search";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function positiveInteger(value: string | null, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim();
  const limitParam = searchParams.get("limit");
  const posts = filterAndRankPosts(await getNewsPosts(), query);

  if (limitParam) {
    const limit = Math.min(24, positiveInteger(limitParam, 6));
    const total = posts.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const page = Math.min(positiveInteger(searchParams.get("page"), 1), totalPages);
    const startIndex = (page - 1) * limit;

    return NextResponse.json({
      ok: true,
      posts: posts.slice(startIndex, startIndex + limit),
      query,
      page,
      limit,
      total,
      totalPages,
    });
  }

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
