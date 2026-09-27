import { useMemo, useState } from "react";
import { ExternalLink, Maximize2, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui-bits/Section";
import { CTALink } from "@/components/ui-bits/CTAButton";
import ScrollReveal from "@/components/visual/ScrollReveal";
import PortfolioLightbox from "@/components/visual/PortfolioLightbox";
import { designPortfolio, type DesignCategory, PIXIESET_PORTFOLIO } from "@/data/imiDesign";

const filters: Array<"All" | DesignCategory> = ["All", "Branding", "Posters", "Social Media", "Campaigns", "Logos", "Print"];

export default function DesignPortfolio() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return designPortfolio;
    return designPortfolio.filter((item) => item.category === filter);
  }, [filter]);

  const selectedItem = selectedIndex === null ? null : filtered[selectedIndex] ?? null;

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.2),transparent_32%),radial-gradient(circle_at_15%_30%,hsl(var(--gold)/0.08),transparent_35%)]" />
        <div className="relative container mx-auto px-4">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-gold">
                IMI Design · Portfolio
              </div>
              <h1 className="mt-6 font-display text-4xl leading-tight sm:text-5xl md:text-7xl">
                Visual work built to <span className="text-gradient-gold">command attention.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
                Explore selected IMI Design work across branding, campaign graphics, posters, social media, logos and print.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href={PIXIESET_PORTFOLIO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-background">
                  Open full Pixieset portfolio <ExternalLink className="h-4 w-4" />
                </a>
                <CTALink to="/contact" variant="outline" iconRight={<ArrowUpRight className="h-4 w-4" />}>
                  Start a design project
                </CTALink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={`rounded-full border px-4 py-2 text-sm transition-smooth ${filter === item ? "border-gold bg-gold text-background" : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filtered.map((item, index) => (
              <ScrollReveal key={item.id} className="mb-5 break-inside-avoid" delayMs={Math.min(index * 30, 180)}>
                <article className="group overflow-hidden rounded-[1.5rem] border border-border/70 bg-card">
                  <button type="button" onClick={() => setSelectedIndex(index)} className="relative block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                    <img src={item.image} alt={item.title} className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading={index < 3 ? "eager" : "lazy"} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-70" />
                    <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.24em] text-gold">{item.category} · {item.year}</div>
                        <div className="mt-1 font-display text-lg md:text-xl">{item.title}</div>
                      </div>
                      <div className="h-9 w-9 shrink-0 rounded-full border border-white/20 bg-black/30 backdrop-blur grid place-items-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <Maximize2 className="h-4 w-4" />
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center justify-between gap-4 p-4">
                    <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                    <a href={item.href} target="_blank" rel="noreferrer" className="shrink-0 text-gold" aria-label={`Open ${item.title} portfolio source`}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <SectionHeader
              eyebrow="More work"
              title={<>See the <span className="text-gradient-blue">complete archive.</span></>}
              subtitle="The live Pixieset portfolio is the source of truth for the full IMI Design presentation."
            />
            <div className="mt-7">
              <a href={PIXIESET_PORTFOLIO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm text-gold hover:bg-gold/10 transition-smooth">
                Open full portfolio <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <PortfolioLightbox
        item={selectedItem}
        index={selectedIndex ?? 0}
        total={filtered.length}
        onClose={() => setSelectedIndex(null)}
        onNext={() => setSelectedIndex((current) => current === null ? null : (current + 1) % filtered.length)}
        onPrevious={() => setSelectedIndex((current) => current === null ? null : (current - 1 + filtered.length) % filtered.length)}
      />
    </>
  );
}
