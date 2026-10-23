import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { packages, individualDesignServices } from "@/data/site";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Rec = {
  summary: string;
  services: { name: string; tier: string; price: string; reason: string }[];
  estimatedTotal: string;
  timelinePlan: string;
  nextStep: string;
};

export default function ProjectAdvisor() {
  const [goals, setGoals] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rec, setRec] = useState<Rec | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(""); setRec(null);
    const catalog = { ...packages, "Individual Design Services": individualDesignServices };
    const { data, error: fnErr } = await supabase.functions.invoke("recommend-package", {
      body: { goals, budget, timeline, catalog },
    });
    setLoading(false);
    if (fnErr || !data?.recommendation) {
      let msg = "Couldn't generate a recommendation. Please try again.";
      try { const b = await (fnErr as any)?.context?.json?.(); if (b?.error) msg = b.error; } catch { /* ignore */ }
      if (data?.error) msg = data.error;
      setError(msg);
      return;
    }
    setRec(data.recommendation);
  };

  const notes = rec
    ? `AI recommendation: ${rec.services.map((s) => `${s.name} (${s.tier}, ${s.price})`).join("; ")}. Goals: ${goals}. Budget: ${budget}. Timeline: ${timeline}`
    : "";

  return (
    <section className="section" id="ai-advisor">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-gold flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> AI Project Advisor
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">
            Find your <span className="text-gradient-gold">perfect package</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Tell us your goals, budget and timeline — our AI-powered advisor suggests the right IMI services.</p>
        </div>

        <form onSubmit={submit} className="mt-8 max-w-2xl mx-auto glass rounded-3xl p-6 md:p-8 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="adv-goals">Project goals</Label>
            <Textarea id="adv-goals" required minLength={10} rows={4} value={goals} onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. Launch my bakery online with a website, logo and Instagram presence" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="adv-budget">Budget</Label>
              <Input id="adv-budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="e.g. $150" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adv-timeline">Timeline</Label>
              <Input id="adv-timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} placeholder="e.g. 3 weeks" />
            </div>
          </div>
          <Button type="submit" size="lg" disabled={loading} className="w-full bg-gradient-to-r from-primary to-primary-glow">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Thinking…</> : <><Sparkles className="h-4 w-4 mr-2" /> Get my recommendation</>}
          </Button>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </form>

        {rec && (
          <div className="mt-8 max-w-2xl mx-auto glass-gold rounded-3xl p-6 md:p-8 space-y-5 animate-fade-up">
            <p>{rec.summary}</p>
            <div className="space-y-3">
              {rec.services.map((s, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-background/40 p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="font-semibold">{s.name} <span className="text-gold">· {s.tier}</span></div>
                    <div className="text-sm text-gold-soft">{s.price}</div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.reason}</p>
                </div>
              ))}
            </div>
            <div className="text-sm"><span className="text-gold">Estimated total:</span> {rec.estimatedTotal}</div>
            <div className="text-sm"><span className="text-gold">Timeline:</span> {rec.timelinePlan}</div>
            <div className="text-sm text-muted-foreground">{rec.nextStep}</div>
            <Button asChild size="lg" className="w-full bg-gradient-to-r from-primary to-primary-glow">
              <Link to={`/book?service=${encodeURIComponent("AI-recommended package")}&notes=${encodeURIComponent(notes)}`}>
                Book this package <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
