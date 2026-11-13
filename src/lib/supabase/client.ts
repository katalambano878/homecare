import { createBrowserClient } from '@supabase/ssr';

function apiUrl(): string {
    if (process.env.NEXT_PUBLIC_USE_PLAIN_PG === 'true') {
        return (
            process.env.NEXT_PUBLIC_APP_URL ||
            process.env.NEXT_PUBLIC_SUPABASE_URL ||
            ''
        );
    }
    return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

export function createClient() {
    return createBrowserClient(apiUrl(), process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
