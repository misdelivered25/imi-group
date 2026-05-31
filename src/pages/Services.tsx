import { SectionHeader } from "@/components/ui-bits/Section";
import { services } from "@/data/site";
import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const Icon = ({ name, className }: any) => { const C = (Icons as any)[name] || Icons.Sparkles; return <C className={className} />; };

export default function Services() {
  return (
    <>
      <section className="section">
        <div className="container-tight text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Services</div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold">Everything you need to <span className="text-gradient-gold">build</span>, <span className="text-gradient-blue">brand</span> and <span className="text-gradient-gold">grow</span>.</h1>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-tight space-y-6">
          {services.map((s, i) => (
            <div key={s.slug} id={s.slug} className="glass rounded-3xl p-8 md:p-10 grid md:grid-cols-3 gap-8 hover-lift">
              <div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center glow-blue">
                  <Icon name={s.icon} className="h-6 w-6 text-white" />
                </div>
                <div className="text-xs text-gold uppercase tracking-wider mt-4">{s.division}</div>
                <h2 className="font-display text-2xl md:text-3xl mt-1">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.short}</p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
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
                    {s.deliverables.map(d=> <li key={d} className="flex gap-2"><Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />{d}</li>)}
                  </ul>
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
                  <Link to="/pricing" className="px-5 py-2.5 rounded-full border border-gold/40 text-gold text-sm hover:bg-gold/10 transition-smooth">View packages</Link>
                  <Link to="/book" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-semibold">Book a Consultation</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
