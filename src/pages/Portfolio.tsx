import { useState } from "react";
import { portfolio } from "@/data/site";
import { SectionHeader } from "@/components/ui-bits/Section";

const tabs = ["All", "Websites", "Branding", "Posters", "Social Media", "Photography", "Videography", "AI Systems"];

export default function Portfolio() {
  const [tab, setTab] = useState("All");
  const items = tab === "All" ? portfolio : portfolio.filter(p => p.category === tab);
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="Portfolio" title={<>Selected <span className="text-gradient-gold">work</span>.</>} subtitle="Real projects from IMI Technologies, IMI Designs and IMI Media." />
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 text-sm rounded-full border transition-smooth ${tab === t ? "bg-gold text-background border-gold" : "border-border text-muted-foreground hover:border-gold/40"}`}>{t}</button>
          ))}
        </div>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((p, i) => (
            <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-border hover:border-gold/60 transition-smooth glow-blue hover:scale-[1.03]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-card" />
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="text-[10px] uppercase tracking-[0.2em] text-gold">{p.category}</div>
                <div className="font-display text-lg mt-1">{p.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
