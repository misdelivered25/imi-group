import { Link } from "react-router-dom";
import Hero from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui-bits/Section";
import { services, divisions, projects, portfolio, insights, testimonials, packages } from "@/data/site";
import * as Icons from "lucide-react";
import { ArrowRight, Check } from "lucide-react";

function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as any)[name] || Icons.Sparkles;
  return <C className={className} />;
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Brand promise */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { word: "Inquire", desc: "We listen deeply. Every solution starts with the right questions." },
              { word: "Motivate", desc: "We turn ambition into measurable digital momentum." },
              { word: "Inspire", desc: "We build work clients are proud of and competitors notice." },
            ].map((b, i) => (
              <div key={b.word} className="relative glass rounded-2xl p-8 border-gradient hover-lift">
                <div className="text-7xl font-display text-gold/20 absolute top-2 right-4">{i + 1}</div>
                <div className="font-display text-2xl text-gradient-gold">{b.word}.</div>
                <p className="mt-3 text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divisions */}
      <section className="section bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="The IMI Group" title={<>Three divisions. <span className="text-gradient-gold">One vision.</span></>} subtitle="A complete ecosystem to build, brand and broadcast modern businesses." />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {divisions.map((d) => (
              <div key={d.name} className="glass-gold rounded-2xl p-8 hover-lift">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center glow-blue">
                  <Icon name={d.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 font-display text-2xl">{d.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Services" title={<>Premium services, built for <span className="text-gradient-blue">growth</span>.</>} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link to="/services" key={s.slug} className="group glass rounded-2xl p-6 hover-lift relative overflow-hidden">
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth" style={{ boxShadow: "0 0 40px hsl(var(--primary)/0.4), inset 0 0 0 1px hsl(var(--gold)/0.5)" }} />
                <div className="h-11 w-11 rounded-lg bg-muted grid place-items-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-glow transition-smooth">
                  <Icon name={s.icon} className="h-5 w-5 text-gold group-hover:text-white transition-smooth" />
                </div>
                <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                <p className="text-xs text-gold/80 mt-1">{s.division}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <div className="mt-4 flex items-center text-xs text-gold opacity-0 group-hover:opacity-100 transition-smooth">
                  Learn more <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Featured projects" title={<>Case studies that prove the <span className="text-gradient-gold">work</span>.</>} />
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <Link to={`/projects`} key={p.slug} className="group relative glass rounded-2xl p-8 overflow-hidden hover-lift">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/20 to-transparent transition-smooth" />
                <div className="relative">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold">{p.tag}</span>
                  <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground text-sm">{p.overview}</p>
                  <div className="mt-5 text-sm text-gold flex items-center">View case study <ArrowRight className="ml-1 h-3 w-3" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="section">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Portfolio" title={<>A curated selection of <span className="text-gradient-blue">recent work</span>.</>} />
          <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolio.slice(0, 8).map((p, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-border hover:border-gold/50 transition-smooth">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-card" />
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute inset-0 group-hover:scale-105 transition-smooth flex flex-col justify-end p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">{p.category}</div>
                  <div className="font-display text-lg mt-1">{p.title}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/portfolio" className="text-gold hover:underline">See full portfolio →</Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="section bg-card/30">
        <div className="container-tight">
          <SectionHeader eyebrow="Why IMI" title={<>Investor-ready. <span className="text-gradient-gold">Client-ready.</span></>} />
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {[
              "African-built with global standards",
              "Executive-level strategy meets premium craft",
              "End-to-end: brand, build, market, automate",
              "Transparent pricing and clear deliverables",
              "Trusted by founders, churches, schools, NGOs",
              "AI-native team that ships fast",
            ].map((w) => (
              <div key={w} className="glass rounded-xl p-5 flex items-start gap-3">
                <Check className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="section">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Pricing preview" title={<>Premium packages, <span className="text-gradient-gold">honest pricing.</span></>} />
          <div className="mt-10 grid md:grid-cols-4 gap-5">
            {packages["Website Development"].map((p, i) => (
              <div key={p.tier} className={`glass rounded-2xl p-6 hover-lift ${i === 2 ? "border-gradient glow-gold" : ""}`}>
                <div className="text-xs uppercase tracking-wider text-gold">{p.tier}</div>
                <div className="font-display text-2xl mt-2">{p.price}</div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold shrink-0" />{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-gold hover:underline">See all pricing →</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Testimonials" title={<>Trusted by ambitious <span className="text-gradient-blue">teams</span>.</>} />
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.name} className="glass rounded-2xl p-7">
                <div className="text-gold text-3xl font-display">"</div>
                <p className="text-muted-foreground">{t.quote}</p>
                <div className="mt-5 font-semibold">{t.name}</div>
                <div className="text-xs text-gold">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights preview */}
      <section className="section">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Insights" title={<>Ideas worth <span className="text-gradient-gold">reading</span>.</>} />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {insights.slice(0, 3).map((p) => (
              <Link to="/insights" key={p.title} className="glass rounded-2xl p-6 hover-lift">
                <div className="text-xs text-gold uppercase tracking-wider">{p.category}</div>
                <h3 className="font-display text-xl mt-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>
                <div className="text-xs text-gold mt-4 flex items-center">Read more <ArrowRight className="ml-1 h-3 w-3" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden glass-gold rounded-3xl p-10 md:p-16 text-center">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl">Let's build something <span className="text-gradient-gold">unforgettable</span>.</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Book a free consultation and walk away with a clear next step — whether you work with us or not.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book" className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold animate-pulse-glow">Book a Consultation</Link>
                <a href="https://wa.me/263785693657" className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-smooth">WhatsApp Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
