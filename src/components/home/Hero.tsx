import { ArrowRight, Calendar, Briefcase, ChevronDown } from "lucide-react";
import { CTALink } from "@/components/ui-bits/CTAButton";
import ImageCarousel from "@/components/visual/ImageCarousel";
import { heroSlides } from "@/data/heroSlides";

export default function Hero() {
  const slides = heroSlides.map((slide) => ({
    id: slide.id,
    image: slide.image,
    eyebrow: slide.eyebrow,
    title: slide.title,
    description: slide.description,
  }));

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.24),transparent_32%),radial-gradient(circle_at_80%_0%,hsl(var(--gold)/0.1),transparent_26%)]" />
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-15" />

      <div className="relative container mx-auto px-4 pt-10 md:pt-14 lg:pt-16 pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              Inquire · Motivate · Inspire
            </div>

            <h1 className="mt-6 font-display text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-7xl animate-fade-up">
              Building <span className="text-gradient-gold">digital experiences</span> that move Africa forward.
            </h1>

            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.12s" }}>
              IMI Group combines technology, design and media to help ambitious organizations build credibility, communicate clearly and grow with confidence.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "0.22s" }}>
              <CTALink to="/book" variant="primary" size="lg" iconLeft={<Calendar className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>
                Book a Consultation
              </CTALink>
              <CTALink to="/design" variant="outline" size="lg" iconLeft={<Briefcase className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>
                Explore IMI Design
              </CTALink>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                { value: "3", label: "Divisions" },
                { value: "10+", label: "Services" },
                { value: "01", label: "Ecosystem" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/70 bg-background/45 px-4 py-4 backdrop-blur">
                  <div className="font-display text-2xl text-gradient-gold">{item.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 animate-fade-in">
            <ImageCarousel slides={slides} autoPlayMs={5600} className="mx-auto max-w-2xl" viewportClassName="rounded-[2rem] border border-border/70 shadow-2xl" />
          </div>
        </div>

        <a href="#work" className="mx-auto mt-10 flex w-fit items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-gold transition-smooth" aria-label="Scroll to selected work">
          Explore the work <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
