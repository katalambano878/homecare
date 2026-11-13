import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { isPlainPostgres } from '@/lib/db/mode';
import { createClient as createPgClient } from '@/lib/db/query-builder';

export async function POST(request: Request) {
    const body = await request.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isPlainPostgres() || (supabaseUrl && supabaseKey)) {
        try {
            const supabase = isPlainPostgres()
                ? createPgClient()
                : createSupabaseClient(supabaseUrl!, supabaseKey!);
            await supabase.from('leads').insert({
                name: body.name,
                email: body.email,
                phone: body.phone,
                zip_code: body.zipCode || body.zip_code,
                care_type: body.careType || body.care_type || 'Home Care Services',
                person_needing_care: body.personNeedingCare || body.person_needing_care,
                heard_about_us: body.heardAboutUs || body.heard_about_us,
                is_cell_phone: body.isCellPhone ?? body.is_cell_phone,
                status: 'new',
            });
        } catch (err) {
            console.error('Failed to save lead to Supabase:', err);
        }
    } else {
        console.log('New Lead Submission:', JSON.stringify(body, null, 2));
    }

    return NextResponse.json({ success: true, message: 'Lead received successfully' });
}
