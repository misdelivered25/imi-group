import heroBg from "@/assets/hero-bg.jpg";
import { ArrowRight, Calendar, Briefcase, Play } from "lucide-react";
import { CTALink } from "@/components/ui-bits/CTAButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/70"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              ['--dx' as any]: `${((i % 5) - 2) * 40}px`,
              ['--dy' as any]: `${-(80 + (i % 7) * 30)}px`,
              animation: `particle-drift ${8 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-44">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-xs uppercase tracking-[0.25em] text-gold animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Inquire · Motivate · Inspire
          </div>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-7xl leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Building <span className="text-gradient-gold">Digital Solutions</span> for Africa's<br className="hidden md:block" /> <span className="text-gradient-blue">Next Generation</span> of Businesses
          </h1>
          <p className="mt-6 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            IMI Technologies builds websites, brands, media systems, AI strategies, apps and business automation tools for African businesses and organizations ready to grow.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <CTALink href="https://wa.me/263785693657" target="_blank" variant="primary" size="lg" iconLeft={<Calendar className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Book a Consultation</CTALink>
            <CTALink to="/portfolio" variant="outline" size="lg" iconLeft={<Briefcase className="h-4 w-4" />} iconRight={<Play className="h-3 w-3" />}>View Portfolio</CTALink>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { k: "50+", v: "Projects" },
              { k: "3", v: "Divisions" },
              { k: "10+", v: "Services" },
              { k: "100%", v: "African-built" },
            ].map((s) => (
              <div key={s.v} className="glass rounded-xl p-4">
                <div className="font-display text-2xl text-gradient-gold">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
