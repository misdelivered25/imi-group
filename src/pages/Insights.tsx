import { useState } from "react";
import { SectionHeader } from "@/components/ui-bits/Section";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import InfoModal from "@/components/ui-bits/InfoModal";
import { insights } from "@/data/site";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Insights() {
  const [active, setActive] = useState<typeof insights[number] | null>(null);
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="Insights" title={<>Ideas from the IMI <span className="text-gradient-gold">desk</span>.</>} />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {insights.map((p, i) => (
            <button key={p.title} onClick={() => setActive(p)} aria-label={`Read ${p.title}`} className="card-click glass rounded-2xl overflow-hidden text-left block">
              <div className="aspect-video relative bg-gradient-to-br from-primary/30 via-background to-card overflow-hidden">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <CardGraphic variant={["circuit","nodes","wave","grid"][i % 4] as any} />
                <BookOpen className="absolute top-3 right-3 h-5 w-5 text-gold/70" />
                <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-gold px-2 py-1 border border-gold/30 rounded-full bg-background/40 backdrop-blur">{p.category}</div>
              </div>
              <div className="p-6">
                <div className="text-xs text-muted-foreground">May {10 + i}, 2026 · 5 min read</div>
                <h3 className="mt-2 font-display text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="reveal-panel mt-4 inline-flex items-center text-sm text-gold">Read article <ArrowRight className="ml-1 h-3 w-3" /></div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <InfoModal open={!!active} onOpenChange={(v) => !v && setActive(null)} eyebrow={active?.category} title={active?.title || ""}>
        <p>{active?.excerpt}</p>
        <p className="text-sm">The full article is coming soon. Subscribe to our newsletter at the footer to be notified when it publishes.</p>
      </InfoModal>
    </section>
  );
}
