import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkspaceLayout from "@/components/invoices/WorkspaceLayout";
import { supabase } from "@/integrations/supabase/client";
import { displayDate, effectiveStatus, money, type InvoiceStatus } from "@/lib/invoice";

export default function Invoices() {
  const q = useQuery({ queryKey: ["invoices"], queryFn: async () => { const { data, error } = await supabase.from("invoices").select("id, number, customer_name, issue_date, due_date, status, currency, total, amount_paid").order("created_at", { ascending: false }); if (error) throw error; return data; } });
  return <WorkspaceLayout title="Invoices" subtitle="Create, track and export IMI invoices.">
    <div className="mb-6"><Button asChild><Link to="/admin/invoices/new"><Plus className="w-4 h-4 mr-2" />New invoice</Link></Button></div>
    {q.isPending ? <p role="status">Loading…</p> : q.error ? <p>Could not load invoices.</p> : q.data.length === 0 ? <p className="text-muted-foreground">No invoices yet.</p> :
      <div className="overflow-x-auto rounded-lg border"><table className="w-full text-sm"><thead className="bg-muted text-left"><tr>{["Number", "Customer", "Issued", "Status", "Total", "Balance"].map(h => <th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>
        {q.data.map(i => { const s = effectiveStatus({ status: i.status as InvoiceStatus, dueDate: i.due_date || "" }); return <tr key={i.id} className="border-t hover:bg-muted/50"><td className="p-3"><Link className="text-primary underline" to={`/admin/invoices/${i.id}`}>{i.number}</Link></td><td className="p-3">{i.customer_name || "—"}</td><td className="p-3">{displayDate(i.issue_date)}</td><td className="p-3">{s}</td><td className="p-3">{money(Number(i.total), i.currency)}</td><td className="p-3">{money(Number(i.total) - Number(i.amount_paid), i.currency)}</td></tr>; })}
      </tbody></table></div>}
  </WorkspaceLayout>;
}
