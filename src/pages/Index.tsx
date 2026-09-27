import { ArrowRight, Calendar, Check, ExternalLink, MessageCircle, Quote, Sparkles } from "lucide-react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/home/Hero";
import { SectionHeader } from "@/components/ui-bits/Section";
import { CTALink } from "@/components/ui-bits/CTAButton";
import ScrollReveal from "@/components/visual/ScrollReveal";
import ImageCarousel from "@/components/visual/ImageCarousel";
import DesignShowcase from "@/components/visual/DesignShowcase";
import Marquee from "@/components/visual/Marquee";
import { services, divisions, testimonials, packages } from "@/data/site";
import { visualProjects, mediaFeatureImages, PIXIESET_PORTFOLIO } from "@/data/imiDesign";
import * as Icons from "lucide-react";

function Icon({ name, className }: { name: string; className?: string }) {
  const Component = (Icons as unknown as Record<string, ElementType>)[name] ?? Sparkles;
  return <Component className={className} />;
}

export default function Home() {
  const projectSlides = visualProjects.map((project) => ({
    id: project.slug,
    image: project.image,
    eyebrow: project.tag,
    title: project.title,
    description: project.description,
  }));

  const mediaSlides = mediaFeatureImages.map((image, index) => ({
    id: `media-${index + 1}`,
    image,
    eyebrow: "IMI Media",
    title: ["Brand worlds", "Portrait stories", "Campaign moments", "Digital experiences"][index],
  }));

  return (
    <>
      <Hero />

      <section className="section" id="promise">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeader eyebrow="The IMI promise" title={<>Inquire. <span className="text-gradient-gold">Motivate.</span> Inspire.</>} subtitle="Three principles behind every website, identity, campaign and system we build." />
          </ScrollReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { word: "Inquire", desc: "We start with questions, context and the people your solution needs to serve.", icon: "Search" },
              { word: "Motivate", desc: "We turn ideas into clear digital experiences that create momentum.", icon: "Rocket" },
              { word: "Inspire", desc: "We craft work that earns attention, builds confidence and stays memorable.", icon: "Sparkles" },
            ].map((item, index) => (
              <ScrollReveal key={item.word} delayMs={index * 80}>
                <div className="group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/70 p-7 h-full hover:border-gold/40 transition-smooth">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />
                  <div className="relative">
                    <Icon name={item.icon} className="h-7 w-7 text-gold" />
                    <div className="mt-5 font-display text-2xl text-gradient-gold">{item.word}.</div>
                    <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card/20" id="divisions">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeader eyebrow="The IMI Group" title={<>Three divisions. <span className="text-gradient-gold">One vision.</span></>} subtitle="Technology, design and media brought together under one premium ecosystem." />
          </ScrollReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {divisions.map((division, index) => {
              const hrefs = ["/services", "/design", "/gallery"];
              const images = [visualProjects[0].image, PIXIESET_PORTFOLIO, mediaFeatureImages[0]];
              return (
                <ScrollReveal key={division.name} delayMs={index * 70}>
                  <Link to={hrefs[index]} className="group block overflow-hidden rounded-[1.5rem] border border-border/70 bg-card">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {index === 1 ? (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--gold)/0.22),transparent_30%),linear-gradient(135deg,hsl(var(--primary)/0.26),hsl(var(--background)))]" />
                      ) : (
                        <img src={images[index]} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-3">
                        <div>
                          <div className="font-display text-2xl">{division.name}</div>
                          <p className="mt-1 text-sm text-muted-foreground">{division.tagline}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gold transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeader eyebrow="Capabilities" title={<>Built around how you <span className="text-gradient-blue">grow.</span></>} subtitle="From first concept to final launch, the IMI ecosystem gives ambitious organizations one place to build, brand and broadcast." />
          </ScrollReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delayMs={Math.min(index * 35, 160)}>
                <Link to={`/services#${service.slug}`} className="group block rounded-2xl border border-border/70 bg-card/65 p-6 hover:border-gold/40 transition-smooth h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center shadow-[0_0_28px_hsl(var(--primary)/0.25)]">
                      <Icon name={service.icon} className="h-5 w-5 text-white" />
                    </div>
                    <span className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-gold">{service.division.replace("IMI ", "")}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{service.short}</p>
                  <div className="mt-5 inline-flex items-center text-xs text-gold">Explore <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" /></div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-card/20" id="work">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeader eyebrow="Selected work" title={<>Work that deserves a <span className="text-gradient-gold">closer look.</span></>} subtitle="A visual view of the products, systems and platforms currently shaping the IMI portfolio." />
          </ScrollReveal>
          <ScrollReveal className="mt-10" delayMs={90}>
            <ImageCarousel slides={projectSlides} autoPlayMs={6200} />
          </ScrollReveal>
          <div className="mt-7 text-center">
            <CTALink to="/projects" variant="outline" iconRight={<ArrowRight className="h-4 w-4" />}>Explore case studies</CTALink>
          </div>
        </div>
      </section>

      <Marquee items={["Technology", "Design", "Media", "AI", "Automation", "Digital Experiences"]} className="mb-2" />

      <DesignShowcase />

      <section className="section" id="media">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeader eyebrow="IMI Media" title={<>Give the story a <span className="text-gradient-blue">visual language.</span></>} subtitle="Photography, videography and content production designed to make the brand feel as strong in motion as it does on paper." />
          </ScrollReveal>
          <ScrollReveal className="mt-10" delayMs={80}>
            <ImageCarousel slides={mediaSlides} autoPlayMs={5000} />
          </ScrollReveal>
        </div>
      </section>

      <section className="section bg-card/20">
        <div className="container-tight">
          <ScrollReveal>
            <SectionHeader eyebrow="Why IMI" title={<>Premium thinking. <span className="text-gradient-gold">Practical delivery.</span></>} />
          </ScrollReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              "African-built with global standards",
              "Technology, design and media under one ecosystem",
              "Clear scope, deliverables and communication",
              "Built for real organizations, not template demos",
              "Mobile-first experiences",
              "A long-term partner for growth and digital maturity",
            ].map((point, index) => (
              <ScrollReveal key={point} delayMs={index * 40}>
                <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-5">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm md:text-base">{point}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <SectionHeader eyebrow="Testimonials" title={<>Let the work <span className="text-gradient-gold">speak.</span></>} subtitle="Use this section for verified client statements as you replace development-stage placeholders with approved testimonials." />
          </ScrollReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <ScrollReveal key={testimonial.name} delayMs={index * 70}>
                <div className="rounded-[1.5rem] border border-border/70 bg-card p-7 h-full">
                  <Quote className="h-7 w-7 text-gold" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{testimonial.quote}</p>
                  <div className="mt-5 font-semibold">{testimonial.name}</div>
                  <div className="text-xs text-gold">{testimonial.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.26),transparent_35%),linear-gradient(135deg,hsl(var(--background)),hsl(var(--card)))] p-8 text-center md:p-14">
              <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
              <div className="relative">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="mt-5 font-display text-3xl md:text-5xl">Your next idea deserves a <span className="text-gradient-gold">stronger stage.</span></h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Bring us the problem, the idea or the ambition. We will help turn it into something clear, credible and built to move.</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <CTALink to="/book" variant="primary" size="lg" iconLeft={<Calendar className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Book a Consultation</CTALink>
                  <CTALink href="https://wa.me/263785693657" target="_blank" variant="whatsapp" size="lg" iconLeft={<MessageCircle className="h-4 w-4" />}>WhatsApp Us</CTALink>
                  <a href={PIXIESET_PORTFOLIO} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                    View design portfolio <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-10 text-center">
        <div className="font-display text-xl text-gradient-gold">INQUIRE · MOTIVATE · INSPIRE</div>
        <div className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">Technology · Design · Media</div>
      </section>
    </>
  );
}
