import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/ui-bits/Section";
import { CTALink } from "@/components/ui-bits/CTAButton";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import { packages } from "@/data/site";
import { Check, Calendar, ArrowRight, MessageCircle } from "lucide-react";

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
                  <Link
                    to={`/book?package=${encodeURIComponent(service)}&tier=${encodeURIComponent(t.tier)}`}
                    key={t.tier}
                    aria-label={`Book ${t.tier} ${service}`}
                    className={`card-click glass rounded-2xl p-6 block relative overflow-hidden ${i === 2 ? "border-gradient glow-gold" : ""}`}
                  >
                    <CardGraphic variant={i === 2 ? "nodes" : "grid"} />
                    {i === 2 && <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-1 rounded-full bg-gold text-background uppercase tracking-wider z-10">Popular</span>}
                    <div className="relative">
                      <div className="text-xs uppercase tracking-wider text-gold">{t.tier}</div>
                      <div className="font-display text-2xl mt-2">{t.price}</div>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground min-h-[80px]">
                        {t.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />{f}</li>)}
                      </ul>
                      <div className="mt-5 inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm font-semibold">
                        <Calendar className="h-4 w-4" /> Get started <ArrowRight className="h-3 w-3 btn-icon" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center flex flex-wrap gap-3 justify-center">
          <CTALink to="/contact" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>Request custom quote</CTALink>
          <CTALink href="https://wa.me/263785693657" target="_blank" variant="whatsapp" iconLeft={<MessageCircle className="h-4 w-4" />}>Ask on WhatsApp</CTALink>
        </div>
      </div>
    </section>
  );
}
