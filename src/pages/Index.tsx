import { Link } from "react-router-dom";
import Hero from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui-bits/Section";
import { CTALink } from "@/components/ui-bits/CTAButton";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import { services, divisions, projects, portfolio, insights, testimonials, packages } from "@/data/site";
import * as Icons from "lucide-react";
import { ArrowRight, Check, Calendar, MessageCircle, Briefcase, FileText, Quote } from "lucide-react";

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
              { word: "Inquire", desc: "We listen deeply. Every solution starts with the right questions.", icon: "Search" },
              { word: "Motivate", desc: "We turn ambition into measurable digital momentum.", icon: "Rocket" },
              { word: "Inspire", desc: "We build work clients are proud of and competitors notice.", icon: "Sparkles" },
            ].map((b, i) => (
              <div key={b.word} className="relative glass rounded-2xl p-8 border-gradient hover-lift overflow-hidden">
                <CardGraphic variant="wave" />
                <div className="relative">
                  <Icon name={b.icon} className="h-7 w-7 text-gold" />
                  <div className="text-7xl font-display text-gold/15 absolute top-0 right-0">{i + 1}</div>
                  <div className="font-display text-2xl text-gradient-gold mt-4">{b.word}.</div>
                  <p className="mt-3 text-muted-foreground">{b.desc}</p>
                </div>
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
            {divisions.map((d, i) => {
              const links = ["/services", "/services#branding", "/services#photography"];
              return (
                <Link to={links[i] || "/services"} key={d.name} aria-label={`${d.name} division`} className="card-click glass-gold rounded-2xl p-8 relative overflow-hidden block">
                  <CardGraphic variant={i === 0 ? "circuit" : i === 1 ? "nodes" : "grid"} />
                  <div className="relative">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center glow-blue">
                      <Icon name={d.icon} className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl">{d.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{d.tagline}</p>
                    <div className="reveal-panel mt-4 text-xs text-gold inline-flex items-center gap-1">Explore division <ArrowRight className="h-3 w-3" /></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Services" title={<>Premium services, built for <span className="text-gradient-blue">growth</span>.</>} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link to={`/services#${s.slug}`} key={s.slug} aria-label={s.title} className="card-click group glass rounded-2xl p-6 relative overflow-hidden block">
                <CardGraphic variant="circuit" className="opacity-40" />
                <div className="relative">
                  <div className="h-11 w-11 rounded-lg bg-muted grid place-items-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-glow transition-smooth">
                    <Icon name={s.icon} className="h-5 w-5 text-gold group-hover:text-white transition-smooth" />
                  </div>
                  <span className="absolute top-0 right-0 text-[10px] font-medium px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/30 uppercase tracking-wider">{s.division.replace("IMI ", "")}</span>
                  <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  <div className="reveal-panel mt-4 flex items-center text-xs text-gold">
                    Explore {s.title} <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
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
            {projects.map((p, i) => (
              <Link to={`/projects/${p.slug}`} key={p.slug} aria-label={`Case study: ${p.title}`} className="card-click group relative glass rounded-2xl p-8 overflow-hidden block">
                <CardGraphic variant={i % 2 ? "nodes" : "circuit"} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/15 to-transparent transition-smooth" />
                <div className="relative">
                  <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-gold px-2 py-1 border border-gold/30 rounded-full">{p.tag}</span>
                  <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground text-sm">{p.overview}</p>
                  <div className="mt-5 text-sm text-gold flex items-center">View case study <ArrowRight className="ml-1 h-3 w-3 btn-icon" /></div>
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
              <Link to="/portfolio" key={i} aria-label={p.title} className="card-click group relative aspect-square rounded-2xl overflow-hidden border border-border hover:border-gold/60 block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-card" />
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <CardGraphic variant="nodes" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">{p.category}</div>
                  <div className="font-display text-lg mt-1">{p.title}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <CTALink to="/portfolio" variant="outline" iconLeft={<Briefcase className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>See full portfolio</CTALink>
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
              <a href={`https://wa.me/263785693657?text=${encodeURIComponent(`Hi IMI Technologies, I'm interested in the ${p.tier} tier of Website Development.`)}`} target="_blank" rel="noreferrer" key={p.tier} aria-label={`${p.tier} package`} className={`card-click glass rounded-2xl p-6 block relative overflow-hidden ${i === 2 ? "border-gradient glow-gold" : ""}`}>
                {i === 2 && <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-1 rounded-full bg-gold text-background uppercase tracking-wider">Popular</span>}
                <div className="text-xs uppercase tracking-wider text-gold">{p.tier}</div>
                <div className="font-display text-2xl mt-2">{p.price}</div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold shrink-0" />{f}</li>)}
                </ul>
                <div className="reveal-panel mt-4 text-xs text-gold inline-flex items-center gap-1">Book this <ArrowRight className="h-3 w-3" /></div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <CTALink to="/pricing" variant="outline" iconLeft={<FileText className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>See all pricing</CTALink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader eyebrow="Testimonials" title={<>Trusted by ambitious <span className="text-gradient-blue">teams</span>.</>} />
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {testimonials.slice(0, 3).map((t) => (
              <Link to="/testimonials" key={t.name} aria-label={`Testimonial: ${t.name}`} className="card-click glass rounded-2xl p-7 block relative overflow-hidden">
                <CardGraphic variant="wave" />
                <div className="relative">
                  <Quote className="h-7 w-7 text-gold" />
                  <p className="text-muted-foreground mt-4">{t.quote}</p>
                  <div className="mt-5 font-semibold">{t.name}</div>
                  <div className="text-xs text-gold">{t.role}</div>
                </div>
              </Link>
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
              <Link to="/insights" key={p.title} className="card-click glass rounded-2xl p-6 block relative overflow-hidden">
                <CardGraphic variant="grid" />
                <div className="relative">
                  <div className="text-xs text-gold uppercase tracking-wider">{p.category}</div>
                  <h3 className="font-display text-xl mt-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{p.excerpt}</p>
                  <div className="text-xs text-gold mt-4 flex items-center">Read {p.title} insights <ArrowRight className="ml-1 h-3 w-3 btn-icon" /></div>
                </div>
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
            <CardGraphic variant="circuit" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl">Let's build something <span className="text-gradient-gold">unforgettable</span>.</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Book a free consultation and walk away with a clear next step — whether you work with us or not.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <CTALink href="https://wa.me/263785693657" target="_blank" variant="primary" size="lg" iconLeft={<Calendar className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Book a Consultation</CTALink>
                <CTALink href="https://wa.me/263785693657" target="_blank" variant="whatsapp" size="lg" iconLeft={<MessageCircle className="h-4 w-4" />}>WhatsApp Us</CTALink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
