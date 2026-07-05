import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { MessageCircle, ArrowRight, CheckCircle2, User, Mail, Building2, Phone, Briefcase, CalendarDays, StickyNote, Package, Edit3 } from "lucide-react";
import { CTALink } from "@/components/ui-bits/CTAButton";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "263785693657";

function useBookingData() {
  const [params] = useSearchParams();
  return {
    name: params.get("name") || "",
    email: params.get("email") || "",
    company: params.get("company") || "",
    phone: params.get("phone") || "",
    interest: params.get("interest") || "",
    package: params.get("package") || "",
    tier: params.get("tier") || "",
    service: params.get("service") || "",
    date: params.get("date") || "",
    notes: params.get("notes") || "",
  };
}

function buildWhatsAppMessage(data: ReturnType<typeof useBookingData>) {
  const lines = ["Hi IMI Group,"];
  const context = [] as string[];

  if (data.name) context.push(`My name is ${data.name}.`);
  if (data.company) context.push(`I'm with ${data.company}.`);
  if (data.interest || data.service || data.package) {
    const subject = data.service || data.package || data.interest;
    const tier = data.tier ? ` (${data.tier} tier)` : "";
    context.push(`I'm interested in ${subject}${tier}.`);
  }
  if (data.email) context.push(`Email: ${data.email}`);
  if (data.phone) context.push(`WhatsApp: ${data.phone}`);
  if (data.date) context.push(`Preferred date: ${data.date}`);
  if (data.notes) context.push(`Notes: ${data.notes}`);

  if (context.length === 0) {
    return "Hi IMI Group, I'd like to book a consultation.";
  }

  return [...lines, "", ...context].join("\n");
}

function Field({
  icon: Icon,
  label,
  value,
  empty,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  empty?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/40 last:border-0">
      <div className="mt-0.5 p-2 rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm md:text-base font-medium break-words">{value || <span className="text-muted-foreground/60 italic">{empty || "Not provided"}</span>}</p>
      </div>
    </div>
  );
}

export default function BookingConfirmation() {
  const data = useBookingData();
  const message = useMemo(() => buildWhatsAppMessage(data), [data]);
  const waUrl = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    [message]
  );

  const [countdown, setCountdown] = useState(6);
  const [autoOpen, setAutoOpen] = useState(true);

  useEffect(() => {
    if (!autoOpen || countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [autoOpen, countdown]);

  useEffect(() => {
    if (autoOpen && countdown === 0) {
      window.location.href = waUrl;
    }
  }, [autoOpen, countdown, waUrl]);

  const hasAnyDetail =
    data.name ||
    data.email ||
    data.company ||
    data.phone ||
    data.interest ||
    data.package ||
    data.service ||
    data.date ||
    data.notes;

  return (
    <section className="section">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Booking Confirmation</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            Review your <span className="text-gradient-gold">request</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Confirm your details below, then open WhatsApp to send them directly to our team.
          </p>
        </div>

        <div className="mt-10 max-w-2xl mx-auto glass rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h2 className="font-display text-xl">Your consultation request</h2>
              <p className="text-sm text-muted-foreground">We will reply on WhatsApp within hours.</p>
            </div>
          </div>

          {!hasAnyDetail ? (
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 text-center">
              <p className="text-muted-foreground">
                No booking details were submitted.{" "}
                <Link to="/book" className="text-gold hover:underline">
                  Start a booking
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <Field icon={User} label="Name" value={data.name} />
              <Field icon={Mail} label="Email" value={data.email} />
              <Field icon={Building2} label="Organization" value={data.company} />
              <Field icon={Phone} label="WhatsApp number" value={data.phone} />
              <Field
                icon={Briefcase}
                label="Interest"
                value={data.interest || data.service || data.package}
                empty="Not specified"
              />
              {(data.package || data.tier || data.service) && (
                <Field
                  icon={Package}
                  label="Package / Tier"
                  value={data.tier ? `${data.tier} tier of ${data.package || data.service}` : data.package || data.service}
                />
              )}
              <Field icon={CalendarDays} label="Preferred date" value={data.date} />
              <Field icon={StickyNote} label="Project notes" value={data.notes} />
            </div>
          )}

          {hasAnyDetail && (
            <>
              <div className="mt-8 rounded-2xl border border-border/60 bg-muted/30 p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Message preview</p>
                <pre className="text-sm whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed">{message}</pre>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                <Button variant="outline" asChild className="border-gold/40 text-gold hover:bg-gold/10">
                  <Link to={`/book?${new URLSearchParams({
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    phone: data.phone,
                    interest: data.interest,
                    package: data.package,
                    tier: data.tier,
                    service: data.service,
                    date: data.date,
                    notes: data.notes,
                  }).toString()}`}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit details
                  </Link>
                </Button>

                <CTALink
                  href={waUrl}
                  target="_blank"
                  variant="whatsapp"
                  size="lg"
                  iconLeft={<MessageCircle className="h-4 w-4" />}
                  iconRight={<ArrowRight className="h-4 w-4" />}
                >
                  Send on WhatsApp
                </CTALink>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoOpen}
                    onChange={(e) => setAutoOpen(e.target.checked)}
                    className="rounded border-input bg-background text-primary focus:ring-ring"
                  />
                  Auto-open WhatsApp
                </label>
                <span className="font-mono">{autoOpen ? `Opening in ${countdown}s` : "Paused"}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
