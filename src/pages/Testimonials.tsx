import { useState } from "react";
import { SectionHeader } from "@/components/ui-bits/Section";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import InfoModal from "@/components/ui-bits/InfoModal";
import { testimonials } from "@/data/site";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [active, setActive] = useState<typeof testimonials[number] | null>(null);
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="Testimonials" title={<>Clients we are <span className="text-gradient-gold">honored</span> to serve.</>} />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <button key={t.name} onClick={() => setActive(t)} aria-label={`Expand testimonial from ${t.name}`} className="card-click glass-gold rounded-2xl p-7 text-left block relative overflow-hidden">
              <CardGraphic variant={["wave","nodes","circuit"][i % 3] as any} />
              <div className="relative">
                <Quote className="h-7 w-7 text-gold" />
                <p className="mt-4 text-muted-foreground line-clamp-4">{t.quote}</p>
                <div className="mt-6 pt-5 border-t border-border/60">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-gold">{t.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16">
          <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Trusted by</div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
            {["Atlas Co.","Grace Assembly","OpsFlow","Hararé Capital","Mosi Studios","Lumen Café"].map(c => (
              <div key={c} className="glass rounded-xl py-6 text-center text-sm text-muted-foreground hover:text-gold transition-smooth">{c}</div>
            ))}
          </div>
        </div>
      </div>
      <InfoModal open={!!active} onOpenChange={(v) => !v && setActive(null)} eyebrow={active?.role} title={active?.name || ""}>
        <Quote className="h-8 w-8 text-gold" />
        <p className="text-lg italic text-foreground">"{active?.quote}"</p>
        <p className="text-sm">— {active?.name}, <span className="text-gold">{active?.role}</span></p>
      </InfoModal>
    </section>
  );
}
