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
            const { error } = await supabase.from('newsletter_subscribers').upsert(
                { email: body.email, subscribed: true },
                { onConflict: 'email' }
            );
            if (error) throw error;
        } catch (err) {
            console.error('Failed to save subscriber to Supabase:', err);
        }
    } else {
        console.log('New Newsletter Subscription:', JSON.stringify(body, null, 2));
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
}
