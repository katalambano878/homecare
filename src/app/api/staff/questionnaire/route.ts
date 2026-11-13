import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isPlainPostgres } from "@/lib/db/mode";
import { createClient as createPgClient } from "@/lib/db/query-builder";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.staff_id || !body.staff_name) {
            return NextResponse.json({ error: "staff_id and staff_name required" }, { status: 400 });
        }

        const hasFormData = body.form_data && typeof body.form_data === "object";
        const hasLegacyAvailability = body.availability != null && body.availability !== "";

        if (!hasFormData && !hasLegacyAvailability) {
            return NextResponse.json({ error: "Provide form_data (interview form) or availability" }, { status: 400 });
        }

        const supabase = isPlainPostgres()
            ? createPgClient()
            : createSupabaseClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
            );

        const row: Record<string, unknown> = {
            staff_id: body.staff_id,
            staff_name: body.staff_name,
            availability: hasLegacyAvailability ? body.availability : (body.form_data?.full_name ? "Interview form" : ""),
            preferred_shifts: body.preferred_shifts || null,
            transport_mode: body.transport_mode || null,
            max_travel_distance: body.max_travel_distance || null,
            special_skills: body.special_skills || null,
            certifications: body.certifications || null,
            languages: body.languages || null,
            emergency_contact_name: body.emergency_contact_name || null,
            emergency_contact_phone: body.emergency_contact_phone || null,
            health_conditions: body.health_conditions || null,
            additional_notes: body.additional_notes || null,
        };

        if (hasFormData) {
            row.form_data = body.form_data;
        }

        const { error } = await supabase.from("staff_questionnaires").insert(row);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
