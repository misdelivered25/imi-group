import { supabase } from "@/integrations/supabase/client";
import type { Database, Json } from "@/integrations/supabase/types";
import { newInvoice, type Contact, type InvoiceDocument } from "./invoice";

export type InvoiceRecord = Database["public"]["Tables"]["invoices"]["Row"];
export type SavedContact = { id: string; name: string; data: Json };
export function documentFromRecord(row: InvoiceRecord): InvoiceDocument {
  return { ...newInvoice(), ...(row.data as unknown as InvoiceDocument), number: row.number, status: row.status as InvoiceDocument["status"], issueDate: row.issue_date, dueDate: row.due_date || "", currency: row.currency, amountPaid: Number(row.amount_paid) };
}
export async function saveInvoice(d: InvoiceDocument, id?: string) {
  const payload = { prefix: d.prefix, customer_name: d.customer.name, issue_date: d.issueDate, due_date: d.dueDate || null, status: d.status, currency: d.currency, amount_paid: d.amountPaid, data: d as unknown as Json };
  const response = id ? await supabase.from("invoices").update(payload).eq("id", id).select().single() : await supabase.from("invoices").insert(payload).select().single();
  if (response.error) throw response.error;
  return response.data;
}
export async function saveContact(kind: "invoice_businesses" | "invoice_customers", contact: Contact, id?: string) {
  if (!contact.name.trim()) throw new Error("A name is required.");
  const payload = { name: contact.name, data: contact as unknown as Json };
  const result = id ? await supabase.from(kind).update(payload).eq("id", id).select().single() : await supabase.from(kind).insert(payload).select().single();
  if (result.error) throw result.error;
  return result.data;
}