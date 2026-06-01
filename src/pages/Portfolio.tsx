import { useState } from "react";
import { portfolio } from "@/data/site";
import { SectionHeader } from "@/components/ui-bits/Section";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import InfoModal from "@/components/ui-bits/InfoModal";
import { ExternalLink, Calendar } from "lucide-react";
import { CTALink } from "@/components/ui-bits/CTAButton";

const tabs = ["All", "Websites", "Branding", "Posters", "Social Media", "Photography", "Videography", "AI Systems"];

export default function Portfolio() {
  const [tab, setTab] = useState("All");
  const [active, setActive] = useState<{ title: string; category: string } | null>(null);
  const items = tab === "All" ? portfolio : portfolio.filter(p => p.category === tab);
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="Portfolio" title={<>Selected <span className="text-gradient-gold">work</span>.</>} subtitle="Real projects from IMI Technologies, IMI Designs and IMI Media." />
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t} className={`px-4 py-2 text-sm rounded-full border transition-smooth ${tab === t ? "bg-gold text-background border-gold" : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p, i) => (
            <button key={i} onClick={() => setActive(p)} aria-label={`Open ${p.title} preview`} className="card-click group relative aspect-square rounded-2xl overflow-hidden border border-border hover:border-gold/60 text-left">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-card" />
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <CardGraphic variant={["circuit","nodes","wave","grid"][i % 4] as any} />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="self-start text-[10px] uppercase tracking-[0.2em] text-gold px-2 py-1 border border-gold/30 rounded-full bg-background/40 backdrop-blur">{p.category}</span>
                <div className="font-display text-lg mt-2">{p.title}</div>
                <div className="reveal-panel mt-2 text-xs text-gold inline-flex items-center gap-1">Open preview <ExternalLink className="h-3 w-3" /></div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <InfoModal open={!!active} onOpenChange={(v) => !v && setActive(null)} eyebrow={active?.category} title={active?.title || ""}>
        <p>Detailed case study for <strong className="text-foreground">{active?.title}</strong> is coming soon. Meanwhile, you can request the full project brief or book a consultation to discuss similar work.</p>
        <div className="flex gap-3 pt-3">
          <CTALink to={`/book?ref=${encodeURIComponent(active?.title || "")}`} variant="primary" size="sm" iconLeft={<Calendar className="h-4 w-4" />}>Book consultation</CTALink>
          <CTALink to="/contact" variant="outline" size="sm">Request brief</CTALink>
        </div>
      </InfoModal>
    </section>
  );
}
