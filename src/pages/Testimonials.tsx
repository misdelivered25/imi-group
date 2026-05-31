import { SectionHeader } from "@/components/ui-bits/Section";
import { testimonials } from "@/data/site";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="Testimonials" title={<>Clients we are <span className="text-gradient-gold">honored</span> to serve.</>} />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-gold rounded-2xl p-7 hover-lift">
              <Quote className="h-7 w-7 text-gold" />
              <p className="mt-4 text-muted-foreground">{t.quote}</p>
              <div className="mt-6 pt-5 border-t border-border/60">
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-gold">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Trusted by</div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
            {["Atlas Co.","Grace Assembly","OpsFlow","Hararé Capital","Mosi Studios","Lumen Café"].map(c => (
              <div key={c} className="glass rounded-xl py-6 text-center text-sm text-muted-foreground">{c}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
