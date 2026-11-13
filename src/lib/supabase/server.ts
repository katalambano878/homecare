import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { isPlainPostgres } from '@/lib/db/mode';
import { createClient as createPgClient } from '@/lib/db/query-builder';

export async function createClient() {
    if (isPlainPostgres()) {
        return createPgClient();
    }

    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // setAll called from Server Component — safe to ignore
                    }
                },
            },
        }
    );
}
