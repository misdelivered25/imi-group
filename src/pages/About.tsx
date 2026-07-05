import { SectionHeader } from "@/components/ui-bits/Section";
import miguelPhoto from "@/assets/miguel-hore.png.asset.json";
import { CTALink } from "@/components/ui-bits/CTAButton";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import { divisions } from "@/data/site";
import * as Icons from "lucide-react";
import { ArrowRight, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const Icon = ({ name, className }: any) => { const C = (Icons as any)[name] || Icons.Sparkles; return <C className={className} />; };

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container-tight text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">About IMI Group</div>
          <h1 className="mt-4 font-display text-4xl md:text-6xl">A new generation of <span className="text-gradient-gold">African technology</span>.</h1>
          <p className="mt-6 text-muted-foreground md:text-lg">We build the digital backbone of African businesses, organizations and ideas — from first idea to investor-ready execution.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid md:grid-cols-3 gap-6">
          {[
            { t: "Our Mission", d: "To equip African businesses and organizations with premium digital tools that unlock real growth.", g: "circuit" as const },
            { t: "Our Vision", d: "To be the most trusted technology partner for the next generation of African enterprise.", g: "nodes" as const },
            { t: "Our Values", d: "Excellence. Integrity. Curiosity. Velocity. Ownership.", g: "wave" as const },
          ].map((b) => (
            <div key={b.t} className="glass-gold rounded-2xl p-7 relative overflow-hidden">
              <CardGraphic variant={b.g} />
              <div className="relative">
                <h2 className="font-display text-2xl text-gradient-gold">{b.t}</h2>
                <p className="mt-3 text-muted-foreground">{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-card/30">
        <div className="container-tight grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold">Our Story</div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">From a single idea to a <span className="text-gradient-blue">multi-division group</span>.</h2>
            <p className="mt-5 text-muted-foreground">IMI Group was founded with a clear belief: that African businesses deserve the same caliber of design, technology and strategy as the best companies in the world. We started by helping student founders and small businesses go digital — and grew into a three-division group serving brands across the continent.</p>
            <p className="mt-4 text-muted-foreground">Today, IMI ships websites, apps, AI strategies, branding, and media for clients ranging from churches and NGOs to startups and corporate teams.</p>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] glass-gold rounded-3xl p-8 grid-pattern relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-gold/10" />
              <CardGraphic variant="circuit" />
              <div className="relative h-full flex flex-col justify-end">
                <div className="text-xs uppercase tracking-[0.3em] text-gold">Founder</div>
                <div className="font-display text-3xl mt-2">Miguel Hore</div>
                <div className="text-sm text-muted-foreground mt-1">Founder & Chief Executive · IMI Group</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <SectionHeader eyebrow="The Group" title={<>Three divisions, one <span className="text-gradient-gold">standard</span>.</>} />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {divisions.map((d, i) => (
              <Link to="/services" key={d.name} aria-label={d.name} className="card-click glass rounded-2xl p-7 block relative overflow-hidden">
                <CardGraphic variant={i === 0 ? "circuit" : i === 1 ? "nodes" : "grid"} />
                <div className="relative">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center">
                    <Icon name={d.icon} className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl">{d.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.tagline}</p>
                  <div className="reveal-panel mt-3 text-xs text-gold inline-flex items-center gap-1">Explore <ArrowRight className="h-3 w-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-tight text-center glass-gold rounded-3xl p-12 relative overflow-hidden">
          <CardGraphic variant="nodes" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl">Where we're <span className="text-gradient-gold">headed</span>.</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">A pan-African footprint, deeper AI products for local industries, and a partner ecosystem that helps African founders compete globally.</p>
            <div className="mt-8">
              <CTALink href="https://wa.me/263785693657" target="_blank" variant="primary" size="lg" iconLeft={<Handshake className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Partner with us</CTALink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
