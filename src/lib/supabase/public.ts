import { createClient } from '@supabase/supabase-js';
import { isPlainPostgres } from '@/lib/db/mode';
import { createClient as createPgClient } from '@/lib/db/query-builder';

function getPublicClient() {
    if (isPlainPostgres()) return createPgClient();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

export async function fetchArticles(limit?: number) {
    const supabase = getPublicClient();
    if (!supabase) return null;
    try {
        let query = supabase
            .from('articles')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });
        if (limit) query = query.limit(limit);
        const { data } = await query;
        return data;
    } catch {
        return null;
    }
}

export async function fetchFaqs(category?: string) {
    const supabase = getPublicClient();
    if (!supabase) return null;
    try {
        let query = supabase
            .from('faqs')
            .select('*')
            .eq('published', true)
            .order('sort_order', { ascending: true });
        if (category) query = query.eq('category', category);
        const { data } = await query;
        return data;
    } catch {
        return null;
    }
}

export async function fetchReviews(limit?: number) {
    const supabase = getPublicClient();
    if (!supabase) return null;
    try {
        let query = supabase
            .from('reviews')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });
        if (limit) query = query.limit(limit);
        const { data } = await query;
        return data;
    } catch {
        return null;
    }
}

export async function fetchServices() {
    const supabase = getPublicClient();
    if (!supabase) return null;
    try {
        const { data } = await supabase
            .from('services')
            .select('*')
            .eq('published', true)
            .order('sort_order', { ascending: true });
        return data;
    } catch {
        return null;
    }
}

export async function fetchSettings() {
    const supabase = getPublicClient();
    if (!supabase) return null;
    try {
        const { data } = await supabase.from('site_settings').select('*');
        if (!data) return null;
        const map: Record<string, string> = {};
        data.forEach((s: { key?: string | null; value?: string | null }) => {
            if (s.key && s.value) map[s.key] = s.value;
        });
        return map;
    } catch {
        return null;
    }
}

export async function fetchNavigation(menuGroup: string) {
    const supabase = getPublicClient();
    if (!supabase) return null;
    try {
        const { data } = await supabase
            .from('navigation_items')
            .select('*')
            .eq('menu_group', menuGroup)
            .eq('published', true)
            .order('sort_order', { ascending: true });
        return data;
    } catch {
        return null;
    }
}
