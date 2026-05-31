import { useState } from "react";
import { Mail, MessageCircle, Instagram, Facebook, Globe, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [tab, setTab] = useState<"contact" | "quote">("contact");
  return (
    <section className="section">
      <div className="container mx-auto px-4 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Contact</div>
          <h1 className="font-display text-4xl md:text-5xl">Let's <span className="text-gradient-gold">talk</span>.</h1>
          <p className="text-muted-foreground">Whether you're scoping a project or exploring a partnership, we'd love to hear from you.</p>
          <div className="glass-gold rounded-2xl p-6 space-y-3 text-sm">
            <div className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-gold" /> WhatsApp: 078 569 3657</div>
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /> HGCPrivateLimited@gmail.com</div>
            <div className="flex items-center gap-3"><Globe className="h-4 w-4 text-gold" /> www.imitechnologies.co.zw</div>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://instagram.com" className="hover:text-gold"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com" className="hover:text-gold"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
          <a href="https://wa.me/263785693657" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-600 text-white"><MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp</a>
        </div>

        <div className="lg:col-span-3">
          <div className="glass rounded-3xl p-8">
            <div className="flex gap-2 mb-6">
              <button onClick={()=>setTab("contact")} className={`px-4 py-2 rounded-full text-sm ${tab==="contact"?"bg-gold text-background":"border border-border text-muted-foreground"}`}>Contact</button>
              <button onClick={()=>setTab("quote")} className={`px-4 py-2 rounded-full text-sm ${tab==="quote"?"bg-gold text-background":"border border-border text-muted-foreground"}`}>Request Quote</button>
            </div>
            <form onSubmit={(e)=>{e.preventDefault(); toast.success("Message sent. We'll respond within 24 hours.");}} className="grid sm:grid-cols-2 gap-4">
              <Input label="Full name" required />
              <Input label="Email" type="email" required />
              <Input label="Phone / WhatsApp" />
              <Input label="Organization" />
              {tab === "quote" && <>
                <Input label="Service needed" required />
                <Input label="Budget range" />
              </>}
              <div className="sm:col-span-2">
                <Label>Message</Label>
                <textarea required rows={5} className="mt-1 w-full bg-input/60 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-gold" />
              </div>
              <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold animate-pulse-glow">
                <Send className="mr-2 h-4 w-4" /> Send {tab === "quote" ? "quote request" : "message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ children }: any) { return <label className="text-xs uppercase tracking-wider text-gold">{children}</label>; }
function Input({ label, type = "text", required }: any) {
  return (
    <div>
      <Label>{label}{required && " *"}</Label>
      <input required={required} type={type} className="mt-1 w-full bg-input/60 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-gold" />
    </div>
  );
}
