import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Contact } from "@/lib/invoice";

export default function ContactFields({ value, onChange, business = false }: { value: Contact; onChange: (c: Contact) => void; business?: boolean }) {
  const fields: [keyof Contact, string][] = business ? [["name", "Business / division name"], ["parent", "Parent company"], ["tagline", "Division description"], ["email", "Business email"], ["phone", "Business phone"], ["website", "Website"]] : [["name", "Customer / company name"], ["contact", "Contact person"], ["email", "Customer email"], ["phone", "Customer phone"], ["identification", "Customer identification"]];
  return <div className="grid sm:grid-cols-2 gap-4">{fields.map(([key, label]) => <div key={key}><Label htmlFor={`${business ? "business" : "customer"}-${key}`}>{label}</Label><Input id={`${business ? "business" : "customer"}-${key}`} type={key === "email" ? "email" : "text"} maxLength={255} value={value[key]} onChange={e => onChange({ ...value, [key]: e.target.value })} /></div>)}<div className="sm:col-span-2"><Label htmlFor={`${business ? "business" : "customer"}-address`}>Physical address</Label><Textarea id={`${business ? "business" : "customer"}-address`} maxLength={1000} value={value.address} onChange={e => onChange({ ...value, address: e.target.value })} /></div></div>;
}