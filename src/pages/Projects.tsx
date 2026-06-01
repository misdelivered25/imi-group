import { Link } from "react-router-dom";
import { projects } from "@/data/site";
import { SectionHeader } from "@/components/ui-bits/Section";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import { Check, ArrowRight } from "lucide-react";

export default function Projects() {
  return (
    <section className="section">
      <div className="container-tight">
        <SectionHeader eyebrow="Projects" title={<>Featured <span className="text-gradient-gold">case studies</span>.</>} />
        <div className="mt-12 space-y-6">
          {projects.map((p, i) => (
            <Link to={`/projects/${p.slug}`} key={p.slug} aria-label={`Open ${p.title} case study`} className="card-click block">
              <article className="glass-gold rounded-3xl p-8 md:p-10 relative overflow-hidden">
                <CardGraphic variant={i % 2 ? "nodes" : "circuit"} />
                <div className="relative">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h2 className="font-display text-2xl md:text-3xl">{p.title}</h2>
                    <span className="text-xs uppercase tracking-[0.25em] text-gold px-2 py-1 border border-gold/30 rounded-full">{p.tag}</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">{p.overview}</p>
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gold">Problem</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{p.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gold">Solution</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{p.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gold">Features</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        {p.features.map(f => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />{f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gold">Target users</h4>
                      <p className="mt-2 text-sm text-muted-foreground">{p.users}</p>
                    </div>
                  </div>
                  <div className="mt-6 text-sm text-gold inline-flex items-center gap-1">Read full case study <ArrowRight className="h-4 w-4 btn-icon" /></div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
