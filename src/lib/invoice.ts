import { z } from "zod";

export const invoiceStatuses = ["Draft", "Unpaid", "Partially Paid", "Paid", "Overdue", "Cancelled"] as const;
export type InvoiceStatus = typeof invoiceStatuses[number];
export type Contact = { name: string; contact: string; email: string; phone: string; website: string; address: string; identification: string; parent: string; tagline: string; logo: string };
export type InvoiceItem = { id: string; description: string; details: string; quantity: number; rate: number };
export type InvoiceDocument = {
  business: Contact; customer: Contact; items: InvoiceItem[]; prefix: string; number: string;
  issueDate: string; dueDate: string; paymentDate: string; status: InvoiceStatus; currency: string;
  discountType: "percent" | "fixed"; discount: number; tax: number; charges: number; amountPaid: number;
  paymentMethod: string; paidBy: string; transaction: string; reference: string; terms: string; instructions: string; notes: string;
};
export const blankContact = (): Contact => ({ name: "", contact: "", email: "", phone: "", website: "", address: "", identification: "", parent: "", tagline: "", logo: "" });
export const newItem = (): InvoiceItem => ({ id: crypto.randomUUID(), description: "", details: "", quantity: 1, rate: 0 });
export function newInvoice(): InvoiceDocument {
  const date = new Date().toISOString().slice(0, 10);
  return {
    business: { ...blankContact(), name: "IMI Design", parent: "IMI Group", tagline: "Creative & Design Solutions", email: "HGCPrivateLimited@gmail.com", phone: "+263 78 569 3657", website: "www.imi-group.lovable.app", address: "27174 Unit N Extension,\nSeke Chitungwiza, Zimbabwe" },
    customer: blankContact(), items: [newItem()], prefix: "INV-IMID-", number: "Assigned on save", issueDate: date, dueDate: "", paymentDate: "", status: "Draft", currency: "USD",
    discountType: "percent", discount: 0, tax: 0, charges: 0, amountPaid: 0, paymentMethod: "EcoCash", paidBy: "", transaction: "", reference: "", terms: "", instructions: "", notes: "Thank you for choosing IMI Design.",
  };
}
const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
export function calculateInvoice(d: Pick<InvoiceDocument, "items" | "discountType" | "discount" | "tax" | "charges" | "amountPaid">) {
  const subtotal = round(d.items.reduce((sum, i) => sum + round(i.quantity * i.rate), 0));
  const discount = round(Math.min(subtotal, d.discountType === "percent" ? subtotal * d.discount / 100 : d.discount));
  const tax = round((subtotal - discount) * d.tax / 100);
  const total = round(subtotal - discount + tax + d.charges);
  return { subtotal, discount, tax, total, balance: round(total - d.amountPaid) };
}
export function effectiveStatus(d: Pick<InvoiceDocument, "status" | "dueDate">, today = new Date().toISOString().slice(0, 10)): InvoiceStatus {
  return ["Unpaid", "Partially Paid"].includes(d.status) && d.dueDate && d.dueDate < today ? "Overdue" : d.status;
}
export const money = (n: number, currency = "USD") => new Intl.NumberFormat("en", { style: "currency", currency, currencyDisplay: "narrowSymbol" }).format(n);
export const displayDate = (date: string) => date ? new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—";
export function validateInvoice(d: InvoiceDocument, draft = false): string | undefined {
  const item = z.object({ description: z.string().max(500), details: z.string().max(2000), quantity: z.number().positive().max(1000000), rate: z.number().min(0).max(10000000) });
  if (!z.array(item).min(1).max(100).safeParse(d.items).success) return "Add valid items with positive quantities and non-negative rates.";
  if (!/^[A-Za-z0-9-]{1,30}$/.test(d.prefix)) return "Use letters, numbers and hyphens for the invoice prefix.";
  if (![d.discount, d.tax, d.charges, d.amountPaid].every(n => Number.isFinite(n) && n >= 0) || d.tax > 100 || (d.discountType === "percent" && d.discount > 100)) return "Check discounts, tax and payment amounts.";
  const totals = calculateInvoice(d);
  if (d.amountPaid > totals.total) return "Amount received cannot exceed the invoice total.";
  if (!draft && (!d.customer.name.trim() || !d.business.name.trim() || d.items.some(i => !i.description.trim()))) return "Business, customer and item descriptions are required.";
  if (!draft && d.status === "Paid" && totals.balance !== 0) return "A paid invoice must be paid in full.";
  if (d.customer.email && !z.string().email().safeParse(d.customer.email).success) return "Enter a valid customer email address.";
  if (!d.issueDate || (d.dueDate && d.dueDate < d.issueDate)) return "Due date must not precede the issue date.";
}