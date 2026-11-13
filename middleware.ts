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

function decodeBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function sessionToken(raw: string): string | undefined {
  let value = raw.trim();
  if (value.startsWith("base64-")) {
    try {
      value = decodeBase64Url(value.slice("base64-".length));
    } catch {
      return undefined;
    }
  }
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed) && typeof parsed[0] === "string") return parsed[0];
    if (parsed && typeof parsed === "object" && typeof parsed.access_token === "string") {
      return parsed.access_token;
    }
    if (typeof parsed === "string") return parsed;
  } catch {
    if (value.split(".").length === 3) return value;
  }
  return undefined;
}

function extractToken(request: NextRequest): string | undefined {
  const groups = new Map<string, { index: number; value: string }[]>();
  for (const cookie of request.cookies.getAll()) {
    const match = cookie.name.match(/^(?:sb|app)-.*auth-token(?:\.(\d+))?$/);
    if (!match) continue;
    const base = cookie.name.replace(/\.\d+$/, "");
    const parts = groups.get(base) ?? [];
    parts.push({ index: match[1] ? Number(match[1]) : 0, value: cookie.value });
    groups.set(base, parts);
  }

  for (const parts of groups.values()) {
    const token = sessionToken(
      parts
        .sort((a, b) => a.index - b.index)
        .map((part) => part.value)
        .join("")
    );
    if (token) return token;
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
