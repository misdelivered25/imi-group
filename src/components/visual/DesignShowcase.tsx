import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/visual/ScrollReveal";
import ImageCarousel from "@/components/visual/ImageCarousel";
import { SectionHeader } from "@/components/ui-bits/Section";
import { CTALink } from "@/components/ui-bits/CTAButton";
import { designPortfolio, PIXIESET_PORTFOLIO, PIXIESET_CUT_CEOS, PIXIESET_REBRANDS, PIXIESET_STANDALONE } from "@/data/imiDesign";

export default function DesignShowcase() {
  const slides = designPortfolio.filter((item) => item.featured).map((item) => ({
    id: item.id,
    image: item.image,
    eyebrow: `${item.category} · ${item.year}`,
    title: item.title,
    description: item.description,
    href: item.href,
  }));

  return (
    <section className="section bg-card/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <SectionHeader
            eyebrow="IMI Design"
            title={<>Designed to <span className="text-gradient-gold">lead.</span></>}
            subtitle="A visual portfolio of brand systems, campaign graphics, posters and digital creative produced through IMI Design."
          />
        </ScrollReveal>

        <ScrollReveal className="mt-10 md:mt-14" delayMs={80}>
          <ImageCarousel slides={slides} autoPlayMs={5200} />
        </ScrollReveal>

        <ScrollReveal className="mt-7" delayMs={120}>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { title: "CUT CEOs Graphics", href: PIXIESET_CUT_CEOS },
              { title: "Graphic Rebrands", href: PIXIESET_REBRANDS },
              { title: "Standalone Designs", href: PIXIESET_STANDALONE },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border/70 bg-background/50 px-5 py-4 hover:border-gold/50 transition-smooth"
              >
                <span className="text-sm">{item.title}</span>
                <ArrowUpRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CTALink to="/design" variant="primary" iconRight={<ArrowUpRight className="h-4 w-4" />}>
            Explore IMI Design
          </CTALink>
          <a href={PIXIESET_PORTFOLIO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm text-gold hover:bg-gold/10 transition-smooth">
            Open Pixieset portfolio <ExternalLink className="h-4 w-4" />
          </a>
          <Link to="/contact" className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Commission a project
          </Link>
        </div>
      </div>
    </section>
  );
}
