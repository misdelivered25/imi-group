import { Link, useParams } from "react-router-dom";
import { projects } from "@/data/site";
import { ArrowLeft, ArrowRight, Check, Calendar, MessageCircle } from "lucide-react";
import { CTALink } from "@/components/ui-bits/CTAButton";
import CardGraphic from "@/components/ui-bits/CardGraphic";

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = projects.find(x => x.slug === slug);
  if (!p) return (
    <section className="section"><div className="container-tight text-center">
      <h1 className="font-display text-3xl">Project not found</h1>
      <CTALink to="/projects" variant="outline" className="mt-6" iconLeft={<ArrowLeft className="h-4 w-4" />}>Back to projects</CTALink>
    </div></section>
  );
  return (
    <section className="section">
      <div className="container-tight">
        <Link to="/projects" className="text-sm text-gold inline-flex items-center gap-1 hover:underline"><ArrowLeft className="h-4 w-4" /> All projects</Link>
        <div className="relative glass-gold rounded-3xl p-8 md:p-12 mt-6 overflow-hidden">
          <CardGraphic variant="circuit" />
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] text-gold">{p.tag}</div>
            <h1 className="mt-3 font-display text-4xl md:text-6xl">{p.title}</h1>
            <p className="mt-5 text-muted-foreground md:text-lg max-w-3xl">{p.overview}</p>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {[
            { t: "Problem", d: p.problem },
            { t: "Solution", d: p.solution },
            { t: "Target users", d: p.users },
            { t: "Future potential", d: p.future },
          ].map(b => (
            <div key={b.t} className="glass rounded-2xl p-7 relative overflow-hidden">
              <CardGraphic variant="grid" />
              <div className="relative">
                <h3 className="text-xs uppercase tracking-wider text-gold">{b.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{b.d}</p>
              </div>
            </div>
          ))}
          <div className="glass-gold rounded-2xl p-7 md:col-span-2 relative overflow-hidden">
            <CardGraphic variant="nodes" />
            <div className="relative">
              <h3 className="text-xs uppercase tracking-wider text-gold">Features</h3>
              <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
                {p.features.map(f => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />{f}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <CTALink href="https://wa.me/263785693657" target="_blank" variant="primary" iconLeft={<Calendar className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Discuss a similar project</CTALink>
          <CTALink href="https://wa.me/263785693657" target="_blank" variant="whatsapp" iconLeft={<MessageCircle className="h-4 w-4" />}>Chat on WhatsApp</CTALink>
        </div>
      </div>
    </section>
  );
}
