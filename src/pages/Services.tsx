import { SectionHeader } from "@/components/ui-bits/Section";
import { CTALink } from "@/components/ui-bits/CTAButton";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import { services } from "@/data/site";
import * as Icons from "lucide-react";
import { Check, FileText, Calendar, ArrowRight } from "lucide-react";

const Icon = ({ name, className }: any) => { const C = (Icons as any)[name] || Icons.Sparkles; return <C className={className} />; };

export default function Services() {
  return (
    <>
      <section className="section">
        <div className="container-tight text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Services</div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">Everything you need to <span className="text-gradient-gold">build</span>, <span className="text-gradient-blue">brand</span> and <span className="text-gradient-gold">grow</span>.</h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-tight space-y-6">
          {services.map((s) => (
            <div key={s.slug} id={s.slug} className="glass rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 relative overflow-hidden scroll-mt-24">
              <CardGraphic variant="circuit" />
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center glow-blue">
                  <Icon name={s.icon} className="h-6 w-6 text-white" />
                </div>
                <div className="inline-block mt-4 text-[10px] font-medium px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/30 uppercase tracking-wider">{s.division}</div>
                <h2 className="font-display text-2xl md:text-3xl mt-2">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.short}</p>
              </div>
              <div className="relative md:col-span-2 grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gold">What it solves</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{s.solves}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gold">Who it helps</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{s.helps}</p>
                </div>
                <div className="sm:col-span-2">
                  <h4 className="text-xs uppercase tracking-wider text-gold">Deliverables</h4>
                  <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm">
                    {s.deliverables.map(d => <li key={d} className="flex gap-2"><Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />{d}</li>)}
                  </ul>
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
                  <CTALink to="/pricing" variant="outline" size="sm" iconLeft={<FileText className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>View packages</CTALink>
                  <CTALink href="https://wa.me/263785693657" target="_blank" variant="primary" size="sm" iconLeft={<Calendar className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Book a Consultation</CTALink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
