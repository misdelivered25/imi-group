import { SectionHeader } from "@/components/ui-bits/Section";
import { packages } from "@/data/site";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="Pricing" title={<>Transparent <span className="text-gradient-gold">packages</span>.</>} subtitle="Choose a starting point. Every package is customizable." />
        <div className="mt-14 space-y-14">
          {Object.entries(packages).map(([service, tiers]) => (
            <div key={service}>
              <h3 className="font-display text-2xl md:text-3xl">{service}</h3>
              <div className="mt-6 grid md:grid-cols-4 gap-5">
                {tiers.map((t, i) => (
                  <div key={t.tier} className={`glass rounded-2xl p-6 hover-lift ${i === 2 ? "border-gradient glow-gold" : ""}`}>
                    <div className="text-xs uppercase tracking-wider text-gold">{t.tier}</div>
                    <div className="font-display text-2xl mt-2">{t.price}</div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground min-h-[80px]">
                      {t.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />{f}</li>)}
                    </ul>
                    <Link to="/book" className="mt-5 block text-center px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-semibold">Get started</Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
