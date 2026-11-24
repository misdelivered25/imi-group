import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Printer, Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WorkspaceLayout from "@/components/invoices/WorkspaceLayout";
import ContactFields from "@/components/invoices/ContactFields";
import InvoicePreview from "@/components/invoices/InvoicePreview";
import { supabase } from "@/integrations/supabase/client";
import { calculateInvoice, invoiceStatuses, money, newInvoice, newItem, validateInvoice, type Contact, type InvoiceDocument } from "@/lib/invoice";
import { documentFromRecord, saveContact, saveInvoice } from "@/lib/invoice-store";
import { downloadInvoicePDF, printInvoicePDF } from "@/lib/invoice-pdf";

const num = (v: string) => (v === "" ? 0 : Number(v));

export default function InvoiceEditor() {
  const { id } = useParams(); const nav = useNavigate(); const qc = useQueryClient();
  const [d, setD] = useState<InvoiceDocument>(newInvoice); const [saving, setSaving] = useState(false);
  const existing = useQuery({ queryKey: ["invoice", id], enabled: !!id, queryFn: async () => { const { data, error } = await supabase.from("invoices").select("*").eq("id", id!).single(); if (error) throw error; return data; } });
  const contacts = useQuery({ queryKey: ["invoice-contacts"], queryFn: async () => { const [b, c] = await Promise.all([supabase.from("invoice_businesses").select("id, name, data").order("name"), supabase.from("invoice_customers").select("id, name, data").order("name")]); return { businesses: b.data || [], customers: c.data || [] }; } });
  useEffect(() => { if (existing.data) setD(documentFromRecord(existing.data)); }, [existing.data]);
  const set = <K extends keyof InvoiceDocument>(k: K, v: InvoiceDocument[K]) => setD(p => ({ ...p, [k]: v }));
  const totals = calculateInvoice(d);

  async function save() {
    const err = validateInvoice(d, d.status === "Draft"); if (err) return toast.error(err);
    setSaving(true);
    try { const row = await saveInvoice(d, id); qc.invalidateQueries({ queryKey: ["invoices"] }); toast.success(`Saved ${row.number}`); if (!id) nav(`/admin/invoices/${row.id}`, { replace: true }); else setD(documentFromRecord(row)); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Could not save"); } finally { setSaving(false); }
  }
  async function keep(kind: "invoice_businesses" | "invoice_customers", c: Contact) { try { await saveContact(kind, c); contacts.refetch(); toast.success("Saved to address book"); } catch (e) { toast.error(e instanceof Error ? e.message : "Could not save"); } }
  const pick = (list: { id: string; data: unknown }[] | undefined, key: "business" | "customer") => (v: string) => { const f = list?.find(x => x.id === v); if (f) set(key, { ...d[key], ...(f.data as Contact) }); };

  if (id && existing.isPending) return <WorkspaceLayout title="Invoice"><p role="status">Loading…</p></WorkspaceLayout>;
  return <WorkspaceLayout title={id ? `Invoice ${d.number}` : "New invoice"}>
    <div className="flex flex-wrap gap-2 mb-6"><Button onClick={save} disabled={saving}><Save className="w-4 h-4 mr-2" />{saving ? "Saving…" : "Save"}</Button><Button variant="outline" onClick={() => downloadInvoicePDF(d)}><Download className="w-4 h-4 mr-2" />Download PDF</Button><Button variant="outline" onClick={() => printInvoicePDF(d)}><Printer className="w-4 h-4 mr-2" />Print</Button></div>
    <div className="grid xl:grid-cols-2 gap-8">
      <div className="space-y-8">
        <section className="space-y-3"><div className="flex justify-between items-center gap-2"><h2 className="font-display text-xl">From</h2><div className="flex gap-2">{!!contacts.data?.businesses.length && <Select onValueChange={pick(contacts.data.businesses, "business")}><SelectTrigger className="w-44"><SelectValue placeholder="Saved profiles" /></SelectTrigger><SelectContent>{contacts.data.businesses.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent></Select>}<Button size="sm" variant="ghost" onClick={() => keep("invoice_businesses", d.business)}>Save profile</Button></div></div><ContactFields business value={d.business} onChange={c => set("business", c)} /></section>
        <section className="space-y-3"><div className="flex justify-between items-center gap-2"><h2 className="font-display text-xl">Bill to</h2><div className="flex gap-2">{!!contacts.data?.customers.length && <Select onValueChange={pick(contacts.data.customers, "customer")}><SelectTrigger className="w-44"><SelectValue placeholder="Saved customers" /></SelectTrigger><SelectContent>{contacts.data.customers.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent></Select>}<Button size="sm" variant="ghost" onClick={() => keep("invoice_customers", d.customer)}>Save customer</Button></div></div><ContactFields value={d.customer} onChange={c => set("customer", c)} /></section>
        <section className="grid sm:grid-cols-3 gap-4"><div><Label htmlFor="prefix">Prefix</Label><Input id="prefix" value={d.prefix} disabled={!!id} onChange={e => set("prefix", e.target.value)} /></div><div><Label htmlFor="issue">Issue date</Label><Input id="issue" type="date" value={d.issueDate} onChange={e => set("issueDate", e.target.value)} /></div><div><Label htmlFor="due">Due date</Label><Input id="due" type="date" value={d.dueDate} onChange={e => set("dueDate", e.target.value)} /></div>
          <div><Label>Status</Label><Select value={d.status} onValueChange={v => set("status", v as InvoiceDocument["status"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{invoiceStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div><div><Label>Currency</Label><Select value={d.currency} onValueChange={v => set("currency", v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["USD", "ZAR", "ZWG"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div></section>
        <section className="space-y-3"><h2 className="font-display text-xl">Items</h2>{d.items.map((it, i) => <div key={it.id} className="grid grid-cols-12 gap-2 items-end"><div className="col-span-12 sm:col-span-6"><Label htmlFor={`desc-${i}`}>Description</Label><Input id={`desc-${i}`} value={it.description} maxLength={500} onChange={e => set("items", d.items.map(x => x.id === it.id ? { ...x, description: e.target.value } : x))} /></div><div className="col-span-4 sm:col-span-2"><Label htmlFor={`qty-${i}`}>Qty</Label><Input id={`qty-${i}`} type="number" min={0} value={it.quantity} onChange={e => set("items", d.items.map(x => x.id === it.id ? { ...x, quantity: num(e.target.value) } : x))} /></div><div className="col-span-5 sm:col-span-3"><Label htmlFor={`rate-${i}`}>Rate</Label><Input id={`rate-${i}`} type="number" min={0} step="0.01" value={it.rate} onChange={e => set("items", d.items.map(x => x.id === it.id ? { ...x, rate: num(e.target.value) } : x))} /></div><Button className="col-span-3 sm:col-span-1" variant="ghost" size="icon" aria-label="Remove item" disabled={d.items.length === 1} onClick={() => set("items", d.items.filter(x => x.id !== it.id))}><Trash2 className="w-4 h-4" /></Button></div>)}<Button variant="outline" size="sm" onClick={() => set("items", [...d.items, newItem()])}><Plus className="w-4 h-4 mr-2" />Add item</Button></section>
        <section className="grid sm:grid-cols-2 gap-4"><div><Label>Discount type</Label><Select value={d.discountType} onValueChange={v => set("discountType", v as "percent" | "fixed")}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="percent">Percent</SelectItem><SelectItem value="fixed">Fixed amount</SelectItem></SelectContent></Select></div>
          {([["discount", "Discount"], ["tax", "Tax %"], ["charges", "Other charges"], ["amountPaid", "Amount received"]] as const).map(([k, l]) => <div key={k}><Label htmlFor={k}>{l}</Label><Input id={k} type="number" min={0} step="0.01" value={d[k]} onChange={e => set(k, num(e.target.value))} /></div>)}
          {([["paymentMethod", "Payment method"], ["paidBy", "Paid by"], ["transaction", "Transaction ID"], ["reference", "Reference"]] as const).map(([k, l]) => <div key={k}><Label htmlFor={k}>{l}</Label><Input id={k} value={d[k]} maxLength={200} onChange={e => set(k, e.target.value)} /></div>)}
          <div><Label htmlFor="paydate">Payment date</Label><Input id="paydate" type="date" value={d.paymentDate} onChange={e => set("paymentDate", e.target.value)} /></div>
          <p className="sm:col-span-2 text-sm">Total <strong>{money(totals.total, d.currency)}</strong> · Balance <strong>{money(totals.balance, d.currency)}</strong></p></section>
        <section className="space-y-3">{([["terms", "Payment terms"], ["instructions", "Payment instructions"], ["notes", "Notes"]] as const).map(([k, l]) => <div key={k}><Label htmlFor={k}>{l}</Label><Textarea id={k} maxLength={2000} value={d[k]} onChange={e => set(k, e.target.value)} /></div>)}</section>
      </div>
      <div className="xl:sticky xl:top-6 self-start overflow-x-auto"><InvoicePreview invoice={d} /></div>
    </div>
  </WorkspaceLayout>;
}
