import { useState } from "react";
import { toast } from "sonner";
import { Calendar, CheckCircle2 } from "lucide-react";

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <section className="section">
      <div className="container-tight">
        <div className="glass-gold rounded-3xl p-12 text-center max-w-2xl mx-auto">
          <CheckCircle2 className="h-14 w-14 text-gold mx-auto" />
          <h1 className="mt-4 font-display text-3xl md:text-4xl">Consultation requested</h1>
          <p className="mt-3 text-muted-foreground">Thank you. Our team will reach out within 24 hours to confirm your session.</p>
          <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2.5 rounded-full border border-gold/40 text-gold">Submit another</button>
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
        <form onSubmit={(e)=>{e.preventDefault(); toast.success("Booking received"); setSubmitted(true);}} className="mt-10 glass rounded-3xl p-8 grid sm:grid-cols-2 gap-4">
          <F label="Full name" required />
          <F label="Business / organization" />
          <F label="WhatsApp number" required />
          <F label="Email" type="email" required />
          <S label="Service needed" required options={["Website Development","Branding","Social Media","Photography","Videography","AI Strategy","Automation","App Development","Tech Consulting"]} />
          <S label="Budget range" options={["< $500","$500 - $1,500","$1,500 - $5,000","$5,000+","Not sure yet"]} />
          <div className="sm:col-span-2">
            <L>Project description *</L>
            <textarea required rows={4} className="mt-1 w-full bg-input/60 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-gold" />
          </div>
          <F label="Preferred meeting date" type="date" />
          <S label="Preferred contact method" options={["WhatsApp","Email","Phone call","Video meeting"]} />
          <button type="submit" className="sm:col-span-2 mt-2 inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold animate-pulse-glow">
            <Calendar className="mr-2 h-4 w-4" /> Book my consultation
          </button>
        </form>
      </div>
    </section>
  );
}

function L({ children }: any) { return <label className="text-xs uppercase tracking-wider text-gold">{children}</label>; }
function F({ label, type = "text", required }: any) {
  return (<div><L>{label}{required && " *"}</L><input required={required} type={type} className="mt-1 w-full bg-input/60 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-gold" /></div>);
}
function S({ label, required, options }: any) {
  return (<div><L>{label}{required && " *"}</L>
    <select required={required} className="mt-1 w-full bg-input/60 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-gold">
      <option value="">Select…</option>
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select></div>);
}
