import { useState } from "react";
import { CreditCard, FileText, Upload, CheckCircle2, ArrowRight } from "lucide-react";
import InfoModal from "@/components/ui-bits/InfoModal";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import { CTAButton, CTALink } from "@/components/ui-bits/CTAButton";

type Key = "pay" | "invoice" | "upload" | "status" | null;

const cards = [
  { key: "pay", icon: CreditCard, title: "Package Payment", desc: "Pay for a selected service package securely. Card and mobile money supported.", cta: "Pay now", variant: "primary" as const, graphic: "circuit" as const },
  { key: "invoice", icon: FileText, title: "Invoice Request", desc: "Need an invoice for your finance team? Request one and we'll dispatch within 24 hours.", cta: "Request invoice", variant: "outline" as const, graphic: "grid" as const },
  { key: "upload", icon: Upload, title: "Proof of Payment", desc: "Upload your receipt and our team will reconcile and confirm.", cta: "Upload proof", variant: "gold" as const, graphic: "nodes" as const },
  { key: "status", icon: CheckCircle2, title: "Payment Status", desc: "Track the status of your active and recent payments.", cta: "View status", variant: "outline" as const, graphic: "wave" as const },
];

const modalContent: Record<Exclude<Key, null>, { eyebrow: string; title: string; body: React.ReactNode }> = {
  pay: { eyebrow: "Secure checkout", title: "Package Payment", body: <p>Secure payment checkout is coming soon. Card, mobile money and bank transfer will be supported. Meanwhile, contact us to receive an invoice or pay-link.</p> },
  invoice: { eyebrow: "Finance", title: "Invoice Request", body: <p>Send us your billing details on the contact page and we'll dispatch a formal invoice within 24 hours.</p> },
  upload: { eyebrow: "Reconciliation", title: "Proof of Payment", body: <p>Upload your receipt via the drop zone. Our finance team reviews and confirms within one business day.</p> },
  status: { eyebrow: "Tracking", title: "Payment Status", body: <p>Live status tracking will activate once Lovable Cloud is connected. For now, contact us for any invoice status updates.</p> },
};

export default function Payments() {
  const [active, setActive] = useState<Key>(null);
  return (
    <section className="section">
      <div className="container-tight">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">Payments</div>
        <h1 className="mt-3 font-display text-4xl">Secure, transparent <span className="text-gradient-gold">payments</span>.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Pay for packages, request invoices, upload proof of payment and track confirmation status.</p>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {cards.map(c => (
            <button key={c.key} onClick={() => setActive(c.key as Key)} aria-label={c.title} className="card-click glass-gold rounded-2xl p-7 text-left block relative overflow-hidden">
              <CardGraphic variant={c.graphic} />
              <div className="relative">
                <c.icon className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-xl">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm text-gold">{c.cta} <ArrowRight className="h-3 w-3 btn-icon" /></div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-7">
          <h3 className="font-display text-lg">Recent invoices</h3>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between border-b border-border/60 pb-2"><span>INV-2025-018</span><span className="text-emerald-400">Confirmed</span></div>
            <div className="flex justify-between border-b border-border/60 pb-2"><span>INV-2025-019</span><span className="text-gold">Pending</span></div>
            <div className="flex justify-between"><span>INV-2025-020</span><span className="text-muted-foreground">Draft</span></div>
          </div>
        </div>
      </div>

      <InfoModal open={!!active} onOpenChange={(v) => !v && setActive(null)} eyebrow={active ? modalContent[active].eyebrow : ""} title={active ? modalContent[active].title : ""}>
        {active && modalContent[active].body}
        <div className="flex gap-3 pt-3">
          <CTALink to="/contact" variant="primary" size="sm" iconRight={<ArrowRight className="h-4 w-4" />}>Contact finance</CTALink>
          <CTAButton onClick={() => setActive(null)} variant="outline" size="sm">Close</CTAButton>
        </div>
      </InfoModal>
    </section>
  );
}
