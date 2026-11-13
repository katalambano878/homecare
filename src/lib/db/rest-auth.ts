// Resolve the caller identity for /rest|/storage shims.
// HTTP ACL only — in-process dbAdmin bypasses this layer.

import { NextRequest } from "next/server";
import { verifyAccessToken } from "./auth";
import { appAnonKey, appServiceKey } from "@/lib/env";

export type RestRole = "anon" | "authenticated" | "staff" | "admin" | "service_role";

export interface RestActor {
  role: RestRole;
  userId: string | null;
  email: string | null;
  isServiceRole: boolean;
  isStaff: boolean;
}

function headerKey(req: NextRequest): string | null {
  const apikey = req.headers.get("apikey") || req.headers.get("x-api-key");
  if (apikey) return apikey.trim();
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m?.[1]?.trim() || null;
}

function bearerToken(req: NextRequest): string | null {
  const auth = req.headers.get("authorization") || "";
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m?.[1]?.trim() || null;
}

export async function resolveRestActor(req: NextRequest): Promise<RestActor> {
  const serviceKey = appServiceKey();
  const anonKey = appAnonKey();
  const key = headerKey(req);
  const token = bearerToken(req);

  if (serviceKey && (key === serviceKey || token === serviceKey)) {
    return {
      role: "service_role",
      userId: null,
      email: null,
      isServiceRole: true,
      isStaff: true,
    };
  }

  // Prefer JWT when present (supabase-js sends both apikey=anon and Authorization=Bearer jwt)
  if (token && token !== anonKey && (!serviceKey || token !== serviceKey)) {
    const verified = await verifyAccessToken(token);
    if (verified) {
      const appMeta = (verified.payload.app_metadata || {}) as { role?: string };
      const roleName = appMeta.role;
      if (roleName === "admin") {
        return {
          role: "admin",
          userId: verified.userId,
          email: typeof verified.payload.email === "string" ? verified.payload.email : null,
          isServiceRole: false,
          isStaff: true,
        };
      }
      if (roleName === "staff") {
        return {
          role: "staff",
          userId: verified.userId,
          email: typeof verified.payload.email === "string" ? verified.payload.email : null,
          isServiceRole: false,
          isStaff: true,
        };
      }
      return {
        role: "authenticated",
        userId: verified.userId,
        email: typeof verified.payload.email === "string" ? verified.payload.email : null,
        isServiceRole: false,
        isStaff: false,
      };
    }
  }

  return {
    role: "anon",
    userId: null,
    email: null,
    isServiceRole: false,
    isStaff: false,
  };
}
