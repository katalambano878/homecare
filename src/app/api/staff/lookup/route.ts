import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isPlainPostgres } from "@/lib/db/mode";
import { createClient as createPgClient } from "@/lib/db/query-builder";

export async function POST(request: NextRequest) {
    try {
        const { staff_id } = await request.json();

        if (!staff_id || typeof staff_id !== "string" || staff_id.trim().length === 0) {
            return NextResponse.json({ error: "Staff ID or Passport Number is required" }, { status: 400 });
        }

        const supabase = isPlainPostgres()
            ? createPgClient()
            : createSupabaseClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

        const query = staff_id.trim().toUpperCase();

        // Search by staff_id first, then by passport_number
        const { data } = await supabase
            .from("staff")
            .select("staff_id, passport_number, first_name, last_name, role, department, avatar_url, status, start_date")
            .eq("staff_id", query)
            .eq("published", true)
            .single();

        if (data) {
            return NextResponse.json({ found: true, staff: data }, { status: 200 });
        }

        // Fallback: search by passport_number (case-insensitive)
        const { data: byPassport } = await supabase
            .from("staff")
            .select("staff_id, passport_number, first_name, last_name, role, department, avatar_url, status, start_date")
            .ilike("passport_number", query)
            .eq("published", true)
            .single();

        if (byPassport) {
            return NextResponse.json({ found: true, staff: byPassport }, { status: 200 });
        }

        return NextResponse.json({ found: false }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
