import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

function jwtSecret(): string {
  return (
    process.env.AUTH_JWT_SECRET ||
    process.env.JWT_SECRET ||
    process.env.SUPABASE_JWT_SECRET ||
    ""
  );
}

function usesPlainPostgres(): boolean {
  return !!(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

function extractToken(request: NextRequest): string | undefined {
  for (const [name, cookie] of request.cookies) {
    if (!name.startsWith("sb-") && !name.startsWith("app-")) continue;
    if (!name.includes("auth")) continue;
    try {
      const parsed = JSON.parse(cookie.value);
      if (Array.isArray(parsed) && parsed[0]) return String(parsed[0]);
      if (parsed && typeof parsed === "object" && parsed.access_token) {
        return String(parsed.access_token);
      }
      if (typeof parsed === "string") return parsed;
    } catch {
      if (cookie.value) return cookie.value;
    }
  }
  return undefined;
}

async function plainPgAdmin(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const secret = jwtSecret();
  const token = extractToken(request);
  if (!secret || !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    let jwt = token;
    try {
      const parsed = JSON.parse(token);
      if (parsed?.access_token) jwt = parsed.access_token;
      else if (Array.isArray(parsed) && parsed[0]) jwt = parsed[0];
    } catch {
      /* bare jwt */
    }
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(secret));
    if (payload.typ === "refresh") throw new Error("refresh token");
    const appMeta = (payload.app_metadata || {}) as { role?: string };
    if (appMeta.role !== "admin" && appMeta.role !== "staff") {
      throw new Error("not admin");
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export async function middleware(request: NextRequest) {
  if (usesPlainPostgres()) return plainPgAdmin(request);
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
