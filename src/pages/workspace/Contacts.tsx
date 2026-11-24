import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import WorkspaceLayout from "@/components/invoices/WorkspaceLayout";
import ContactFields from "@/components/invoices/ContactFields";
import { supabase } from "@/integrations/supabase/client";
import { blankContact, type Contact } from "@/lib/invoice";
import { saveContact } from "@/lib/invoice-store";

export default function Contacts({ kind }: { kind: "invoice_businesses" | "invoice_customers" }) {
  const business = kind === "invoice_businesses";
  const [edit, setEdit] = useState<{ id?: string; c: Contact } | null>(null);
  const q = useQuery({ queryKey: [kind], queryFn: async () => { const { data, error } = await supabase.from(kind).select("id, name, data").order("name"); if (error) throw error; return data; } });
  async function save() { if (!edit) return; try { await saveContact(kind, edit.c, edit.id); toast.success("Saved"); setEdit(null); q.refetch(); } catch (e) { toast.error(e instanceof Error ? e.message : "Could not save"); } }
  async function remove(id: string) { if (!confirm("Delete this entry?")) return; const { error } = await supabase.from(kind).delete().eq("id", id); if (error) toast.error(error.message); else q.refetch(); }
  return <WorkspaceLayout title={business ? "Business profiles" : "Customers"} subtitle={business ? "Reusable sender details for each IMI division." : "Your saved invoice customers."}>
    {edit ? <div className="space-y-4 max-w-2xl"><ContactFields business={business} value={edit.c} onChange={c => setEdit({ ...edit, c })} /><div className="flex gap-2"><Button onClick={save}>Save</Button><Button variant="ghost" onClick={() => setEdit(null)}>Cancel</Button></div></div> :
      <><Button className="mb-6" onClick={() => setEdit({ c: blankContact() })}>Add {business ? "profile" : "customer"}</Button>
        {q.isPending ? <p role="status">Loading…</p> : !q.data?.length ? <p className="text-muted-foreground">Nothing saved yet.</p> :
          <ul className="divide-y border rounded-lg">{q.data.map(r => { const c = { ...blankContact(), ...(r.data as Contact) }; return <li key={r.id} className="p-4 flex flex-wrap justify-between gap-3"><div><strong>{r.name}</strong><div className="text-sm text-muted-foreground">{[c.email, c.phone].filter(Boolean).join(" · ")}</div></div><div className="flex gap-2"><Button size="sm" variant="outline" onClick={() => setEdit({ id: r.id, c })}>Edit</Button><Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button></div></li>; })}</ul>}</>}
  </WorkspaceLayout>;
}
