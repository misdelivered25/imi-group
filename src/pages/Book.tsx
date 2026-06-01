import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Calendar, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { CTAButton, CTALink } from "@/components/ui-bits/CTAButton";

export default function Book() {
  const [params] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");
  const presetPackage = params.get("package");
  const presetTier = params.get("tier");
  const presetService = params.get("service");

  useEffect(() => {
    if (presetService) setService(presetService);
    else if (presetPackage) setService(presetPackage);
  }, [presetService, presetPackage]);

  if (submitted) return (
    <section className="section">
      <div className="container-tight">
        <div className="glass-gold rounded-3xl p-12 text-center max-w-2xl mx-auto">
          <CheckCircle2 className="h-14 w-14 text-gold mx-auto" />
          <h1 className="mt-4 font-display text-3xl md:text-4xl">Consultation requested</h1>
          <p className="mt-3 text-muted-foreground">Thank you. Our team will reach out within 24 hours to confirm your session.</p>
          <CTAButton onClick={() => setSubmitted(false)} variant="outline" className="mt-6">Submit another</CTAButton>
        </div>
      </div>
    </section>
  );

  return (
    <section className="section">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Book a Consultation</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Tell us about your <span className="text-gradient-gold">project</span>.</h1>
          <p className="mt-4 text-muted-foreground">Free, no obligation. We'll respond within 24 hours.</p>
        </div>

        {(presetPackage || presetService) && (
          <div className="mt-8 max-w-2xl mx-auto glass-gold rounded-2xl p-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-xs uppercase tracking-wider text-gold">Pre-selected</span>
            {presetPackage && <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40">{presetPackage}{presetTier ? ` · ${presetTier}` : ""}</span>}
            {presetService && <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold">{presetService}</span>}
          </div>
        )}

        <form onSubmit={(e)=>{e.preventDefault(); toast.success("Booking received"); setSubmitted(true);}} className="mt-10 glass rounded-3xl p-8 grid sm:grid-cols-2 gap-4">
          <F label="Full name" required />
          <F label="Business / organization" />
          <F label="WhatsApp number" required />
          <F label="Email" type="email" required />
          <S label="Service needed" required value={service} onChange={setService} options={["Website Development","Branding","Social Media","Photography","Videography","AI Strategy","Automation","App Development","Tech Consulting"]} />
          <S label="Budget range" options={["< $500","$500 - $1,500","$1,500 - $5,000","$5,000+","Not sure yet"]} />
          <div className="sm:col-span-2">
            <L>Project description *</L>
            <textarea required rows={4} defaultValue={presetTier ? `Interested in the ${presetTier} tier of ${presetPackage}.` : ""} className="mt-1 w-full bg-input/60 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-gold" />
          </div>
          <F label="Preferred meeting date" type="date" />
          <S label="Preferred contact method" options={["WhatsApp","Email","Phone call","Video meeting"]} />
          <div className="sm:col-span-2 mt-2 flex flex-wrap gap-3">
            <CTAButton type="submit" variant="primary" size="lg" iconLeft={<Calendar className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Book my consultation</CTAButton>
            <CTALink href="https://wa.me/263785693657" target="_blank" variant="whatsapp" size="lg" iconLeft={<MessageCircle className="h-4 w-4" />}>WhatsApp instead</CTALink>
          </div>
        </form>
      </div>
    </section>
  );
}

function L({ children }: any) { return <label className="text-xs uppercase tracking-wider text-gold">{children}</label>; }
function F({ label, type = "text", required }: any) {
  return (<div><L>{label}{required && " *"}</L><input required={required} type={type} className="mt-1 w-full bg-input/60 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-gold" /></div>);
}
function S({ label, required, options, value, onChange }: any) {
  return (<div><L>{label}{required && " *"}</L>
    <select required={required} value={value ?? undefined} onChange={onChange ? (e) => onChange(e.target.value) : undefined} className="mt-1 w-full bg-input/60 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-gold">
      <option value="">Select…</option>
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select></div>);
}
