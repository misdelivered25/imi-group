import { SectionHeader } from "@/components/ui-bits/Section";
import { insights } from "@/data/site";
import { ArrowRight } from "lucide-react";

export default function Insights() {
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="Insights" title={<>Ideas from the IMI <span className="text-gradient-gold">desk</span>.</>} />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {insights.map((p, i) => (
            <article key={p.title} className="glass rounded-2xl overflow-hidden hover-lift">
              <div className="aspect-video relative bg-gradient-to-br from-primary/30 via-background to-card">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="absolute bottom-3 left-4 text-xs uppercase tracking-wider text-gold">{p.category}</div>
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground">May {10 + i}, 2026</div>
                <h3 className="mt-2 font-display text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center text-sm text-gold">Read more <ArrowRight className="ml-1 h-3 w-3" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
