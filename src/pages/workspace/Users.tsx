import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import WorkspaceLayout from "@/components/invoices/WorkspaceLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ROLES = ["super_admin", "admin", "editor", "standard_user", "client_viewer"] as const;
type U = { id: string; email: string; created_at: string; last_sign_in_at: string | null; roles: string[]; active: boolean };
const call = async (body: object) => { const { data, error } = await supabase.functions.invoke("admin-users", { body }); if (error || data?.error) throw new Error(data?.error || error?.message); return data; };

export default function Users() {
  const auth = useAuth();
  const q = useQuery({ queryKey: ["admin-users"], enabled: auth.isAdmin, queryFn: async () => (await call({ action: "list" })).users as U[] });
  const run = async (body: object) => { try { await call(body); q.refetch(); } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); } };
  return <WorkspaceLayout title="Users" subtitle="Manage roles and account access.">
    {!auth.isAdmin ? <p>Only administrators can manage users.</p> : q.isPending ? <p role="status">Loading…</p> : q.error ? <p>{(q.error as Error).message}</p> :
      <div className="overflow-x-auto border rounded-lg"><table className="w-full text-sm"><thead className="bg-muted text-left"><tr><th className="p-3">Email</th>{ROLES.map(r => <th key={r} className="p-3 capitalize">{r.replace("_", " ")}</th>)}<th className="p-3">Access</th></tr></thead><tbody>
        {q.data.map(u => <tr key={u.id} className="border-t"><td className="p-3">{u.email}{u.id === auth.user?.id && " (you)"}</td>{ROLES.map(r => <td key={r} className="p-3"><Checkbox aria-label={`${r} for ${u.email}`} checked={u.roles.includes(r)} onCheckedChange={v => run({ action: "setRole", userId: u.id, role: r, enabled: !!v })} /></td>)}<td className="p-3">{u.id === auth.user?.id ? "Active" : <Button size="sm" variant={u.active ? "outline" : "default"} onClick={() => run({ action: "setActive", userId: u.id, active: !u.active })}>{u.active ? "Deactivate" : "Reactivate"}</Button>}</td></tr>)}
      </tbody></table></div>}
  </WorkspaceLayout>;
}
