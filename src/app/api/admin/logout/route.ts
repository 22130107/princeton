import { NextResponse } from "next/server";
import { adminSessionCookieName, isAdminCookieSecure } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(adminSessionCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: isAdminCookieSecure(),
    path: "/",
    maxAge: 0,
  });

  return response;
}
