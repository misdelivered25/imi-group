// Generates short-lived signed URLs for client preview media, validated by token.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { token, paths } = await req.json();
    if (!token || !Array.isArray(paths)) {
      return new Response(JSON.stringify({ error: "Missing token or paths" }), { status: 400, headers: { ...corsHeaders, "content-type": "application/json" } });
    }
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Validate token + gallery
    const { data: link } = await admin
      .from("client_preview_links")
      .select("gallery_id, expires_at")
      .eq("access_token", token)
      .maybeSingle();
    if (!link) return new Response(JSON.stringify({ error: "Invalid token" }), { status: 403, headers: { ...corsHeaders, "content-type": "application/json" } });
    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "Expired" }), { status: 403, headers: { ...corsHeaders, "content-type": "application/json" } });
    }

    // Only sign paths that belong to this gallery
    const { data: items } = await admin
      .from("media_items")
      .select("file_url")
      .eq("gallery_id", link.gallery_id)
      .in("file_url", paths);
    const allowed = new Set((items ?? []).map((i: any) => i.file_url));

    const result: Record<string, string | null> = {};
    for (const p of paths) {
      if (!allowed.has(p)) { result[p] = null; continue; }
      const { data } = await admin.storage.from("gallery-media").createSignedUrl(p, 3600);
      result[p] = data?.signedUrl ?? null;
    }
    return new Response(JSON.stringify({ urls: result }), { headers: { ...corsHeaders, "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "content-type": "application/json" } });
  }
});
