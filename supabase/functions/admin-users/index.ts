import { createClient } from "npm:@supabase/supabase-js@2";
const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });
const ROLES = ["admin", "editor", "client_viewer", "super_admin", "standard_user"];
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const token = (req.headers.get("Authorization") || "").replace("Bearer ", "");
    const { data: u, error: ue } = await admin.auth.getUser(token);
    if (ue || !u.user) return json({ error: "Unauthorized" }, 401);
    const me = u.user.id;
    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: me, _role: "admin" });
    if (!isAdmin) return json({ error: "Forbidden" }, 403);
    const body = await req.json().catch(() => ({}));
    if (body.action === "list") {
      const { data, error } = await admin.auth.admin.listUsers({ perPage: 200 });
      if (error) throw error;
      const [{ data: roles }, { data: access }] = await Promise.all([admin.from("user_roles").select("user_id, role"), admin.from("account_access").select("user_id, active")]);
      return json({ users: data.users.map(x => ({ id: x.id, email: x.email, created_at: x.created_at, last_sign_in_at: x.last_sign_in_at, roles: (roles || []).filter(r => r.user_id === x.id).map(r => r.role), active: (access || []).find(a => a.user_id === x.id)?.active ?? true })) });
    }
    const target = String(body.userId || "");
    if (!/^[0-9a-f-]{36}$/.test(target)) return json({ error: "Invalid user" }, 400);
    if (body.action === "setRole") {
      if (!ROLES.includes(body.role)) return json({ error: "Invalid role" }, 400);
      if (target === me && !body.enabled && ["admin", "super_admin"].includes(body.role)) return json({ error: "You cannot remove your own admin access." }, 400);
      const r = body.enabled ? await admin.from("user_roles").upsert({ user_id: target, role: body.role }, { onConflict: "user_id,role", ignoreDuplicates: true }) : await admin.from("user_roles").delete().eq("user_id", target).eq("role", body.role);
      if (r.error) throw r.error;
      return json({ ok: true });
    }
    if (body.action === "setActive") {
      if (target === me) return json({ error: "You cannot deactivate your own account." }, 400);
      const active = !!body.active;
      const r = await admin.from("account_access").upsert({ user_id: target, active }, { onConflict: "user_id" });
      if (r.error) throw r.error;
      const b = await admin.auth.admin.updateUserById(target, { ban_duration: active ? "none" : "876000h" });
      if (b.error) throw b.error;
      return json({ ok: true });
    }
    return json({ error: "Unknown action" }, 400);
  } catch (e) { console.error(e); return json({ error: e instanceof Error ? e.message : "Server error" }, 500); }
});
