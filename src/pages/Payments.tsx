import { CreditCard, FileText, Upload, CheckCircle2 } from "lucide-react";

export default function Payments() {
  return (
    <section className="section">
      <div className="container-tight">
        <div className="text-xs uppercase tracking-[0.3em] text-gold">Payments</div>
        <h1 className="mt-3 font-display text-4xl">Secure, transparent <span className="text-gradient-gold">payments</span>.</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Pay for packages, request invoices, upload proof of payment and track confirmation status.</p>

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          <div className="glass-gold rounded-2xl p-7">
            <CreditCard className="h-7 w-7 text-gold" />
            <h3 className="mt-4 font-display text-xl">Package Payment</h3>
            <p className="mt-2 text-sm text-muted-foreground">Pay for a selected service package securely. Card and mobile money supported.</p>
            <button className="mt-5 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-semibold">Pay now</button>
          </div>
          <div className="glass rounded-2xl p-7">
            <FileText className="h-7 w-7 text-gold" />
            <h3 className="mt-4 font-display text-xl">Invoice Request</h3>
            <p className="mt-2 text-sm text-muted-foreground">Need an invoice for your finance team? Request one and we'll dispatch within 24 hours.</p>
            <button className="mt-5 px-5 py-2.5 rounded-full border border-gold/40 text-gold text-sm">Request invoice</button>
          </div>
          <div className="glass rounded-2xl p-7">
            <Upload className="h-7 w-7 text-gold" />
            <h3 className="mt-4 font-display text-xl">Proof of Payment</h3>
            <p className="mt-2 text-sm text-muted-foreground">Upload your receipt and our team will reconcile and confirm.</p>
            <div className="mt-5 border-2 border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
              Drag a file here or <span className="text-gold underline cursor-pointer">browse</span>
            </div>
          </div>
          <div className="glass-gold rounded-2xl p-7">
            <CheckCircle2 className="h-7 w-7 text-gold" />
            <h3 className="mt-4 font-display text-xl">Payment Status</h3>
            <p className="mt-2 text-sm text-muted-foreground">Track the status of your active and recent payments.</p>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between border-b border-border/60 pb-2"><span>INV-2025-018</span><span className="text-emerald-400">Confirmed</span></div>
              <div className="flex justify-between border-b border-border/60 pb-2"><span>INV-2025-019</span><span className="text-gold">Pending</span></div>
              <div className="flex justify-between"><span>INV-2025-020</span><span className="text-muted-foreground">Draft</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
