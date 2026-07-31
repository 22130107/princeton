import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  adminSessionMaxAgeSeconds,
  createAdminSessionToken,
  isAdminAuthConfigured,
  isAdminCookieSecure,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Chưa cấu hình tài khoản admin. Hãy thêm ADMIN_USERNAME, ADMIN_PASSWORD và ADMIN_SESSION_SECRET.",
      },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as { username?: unknown; password?: unknown } | null;
  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng.",
      },
      { status: 401 },
    );
  }

  const token = await createAdminSessionToken(username);
  const response = NextResponse.json({ ok: true });

  response.cookies.set(adminSessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isAdminCookieSecure(),
    path: "/",
    maxAge: adminSessionMaxAgeSeconds,
  });

  return response;
}
