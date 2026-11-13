/** Dual-read env helpers for Supabase → plain app cutover. */

export function appPublicUrl(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ""
  ).replace(/\/+$/, "");
}

export function appAnonKey(): string {
  return (
    process.env.NEXT_PUBLIC_APP_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ""
  );
}

export function appServiceKey(): string {
  return (
    process.env.APP_SERVICE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  );
}

/** Cookie project ref derived from public URL host (matches prior sb-<ref>-auth-token). */
export function appCookieRef(): string {
  try {
    const raw =
      appPublicUrl() ||
      (typeof window !== "undefined" ? window.location.origin : "") ||
      "http://localhost";
    const host = new URL(raw).hostname;
    return host.split(".")[0] || "app";
  } catch {
    return "app";
  }
}
