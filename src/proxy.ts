import { NextRequest, NextResponse } from "next/server";
import { adminSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

const publicWriteApiPaths = new Set(["/api/enrollment-leads"]);

const protectedReadApiPrefixes = ["/api/registration-schedules"];

const protectedWriteApiPrefixes = [
  "/api/categories",
  "/api/class-programs",
  "/api/curriculum-tracks",
  "/api/facility-images",
  "/api/gallery-images",
  "/api/hero-slides",
  "/api/home-sections/registration",
  "/api/media",
  "/api/posts",
  "/api/registration-schedules",
  "/api/teacher-team",
  "/api/teaching-methods",
  "/api/testimonials",
];

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isProtectedApiRequest(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  if (!pathname.startsWith("/api/")) return false;
  if (pathname.startsWith("/api/admin/")) return false;

  if (method === "GET" || method === "HEAD" || method === "OPTIONS") {
    return matchesPrefix(pathname, protectedReadApiPrefixes);
  }

  if (publicWriteApiPaths.has(pathname)) return false;

  return matchesPrefix(pathname, protectedWriteApiPrefixes);
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", `${url.pathname}${url.search}`);

  return NextResponse.redirect(loginUrl);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = await verifyAdminSessionToken(request.cookies.get(adminSessionCookieName)?.value);

  if (pathname === "/admin/login") {
    if (!isLoggedIn) return NextResponse.next();

    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (isLoggedIn) return NextResponse.next();

    return redirectToLogin(request);
  }

  if (isProtectedApiRequest(request)) {
    if (isLoggedIn) return NextResponse.next();

    return NextResponse.json(
      {
        ok: false,
        message: "Phiên quản trị đã hết hạn. Vui lòng đăng nhập lại.",
      },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
