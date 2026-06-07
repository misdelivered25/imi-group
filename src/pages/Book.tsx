import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MessageCircle, ArrowRight, Clock, Zap, ShieldCheck } from "lucide-react";
import { CTALink } from "@/components/ui-bits/CTAButton";

const WHATSAPP_URL = "https://wa.me/263785693657";

export default function Book() {
  const [params] = useSearchParams();
  const presetPackage = params.get("package");
  const presetTier = params.get("tier");
  const presetService = params.get("service");

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = WHATSAPP_URL;
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  let message = "Hi IMI Technologies, I'm interested in booking a consultation.";
  if (presetPackage && presetTier) {
    message = `Hi IMI Technologies, I'm interested in the ${presetTier} tier of ${presetPackage}.`;
  } else if (presetService) {
    message = `Hi IMI Technologies, I'm interested in ${presetService}.`;
  } else if (presetPackage) {
    message = `Hi IMI Technologies, I'm interested in ${presetPackage}.`;
  }
  const waUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

  return (
    <section className="section">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Book a Consultation</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Let's chat on <span className="text-gradient-gold">WhatsApp</span>.</h1>
          <p className="mt-4 text-muted-foreground">Fast, personal, and no forms to fill. We'll reply within hours.</p>
        </div>

        <div className="mt-10 max-w-xl mx-auto glass rounded-3xl p-10 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <MessageCircle className="h-8 w-8 text-green-400" />
          </div>
          <h2 className="font-display text-2xl">Redirecting to WhatsApp…</h2>
          <p className="mt-3 text-sm text-muted-foreground">If nothing happens, tap the button below.</p>
          <div className="mt-6">
            <CTALink href={waUrl} target="_blank" variant="whatsapp" size="lg" iconLeft={<MessageCircle className="h-4 w-4" />} iconRight={<ArrowRight className="h-4 w-4" />}>Open WhatsApp</CTALink>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-2"><Clock className="h-4 w-4 text-gold" />Reply in hours</div>
            <div className="flex flex-col items-center gap-2"><Zap className="h-4 w-4 text-gold" />No forms</div>
            <div className="flex flex-col items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" />Free consultation</div>
          </div>
        </div>
      </div>
    </section>
  );
}
