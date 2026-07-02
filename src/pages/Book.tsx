import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MessageCircle, ArrowRight, CalendarDays, Building2, User, Mail, Phone, Briefcase, StickyNote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CTALink } from "@/components/ui-bits/CTAButton";

const interests = [
  "Website / Web app",
  "Mobile app",
  "Branding & Design",
  "Photography / Videography",
  "AI / Automation",
  "Media / Gallery",
  "Partnership / Investment",
  "Other",
];

export default function Book() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const presetPackage = params.get("package") || "";
  const presetTier = params.get("tier") || "";
  const presetService = params.get("service") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    interest: "",
    package: presetPackage,
    tier: presetTier,
    service: presetService,
    date: "",
    notes: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (value.trim()) query.set(key, value.trim());
    });
    navigate(`/booking-confirmation?${query.toString()}`);
  };

  const defaultInterest = interests.includes(form.interest) ? form.interest : "";

  return (
    <section className="section">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-gold">Book a Consultation</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">
            Book your <span className="text-gradient-gold">free</span> consultation
          </h1>
          <p className="mt-4 text-muted-foreground">
            Tell us a little about your project. We will confirm on WhatsApp within hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto glass rounded-3xl p-8 md:p-10 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-gold" /> Full name
              </Label>
              <Input
                id="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-gold" /> Organization (optional)
              </Label>
              <Input
                id="company"
                placeholder="Company or organization"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold" /> WhatsApp number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+263 7xx xxx xxx"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="interest" className="flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5 text-gold" /> What do you need?
              </Label>
              <Select value={defaultInterest} onValueChange={(v) => handleChange("interest", v)}>
                <SelectTrigger id="interest">
                  <SelectValue placeholder="Select an area" />
                </SelectTrigger>
                <SelectContent>
                  {interests.map((i) => (
                    <SelectItem key={i} value={i}>
                      {i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <CalendarDays className="h-3.5 w-3.5 text-gold" /> Preferred date (optional)
              </Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
              />
            </div>
          </div>

          {(presetPackage || presetService) && (
            <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4">
              <p className="text-sm text-gold-soft font-medium">
                Selected package: {presetTier && `${presetTier} tier of `}{presetPackage || presetService}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <StickyNote className="h-3.5 w-3.5 text-gold" /> Project notes (optional)
            </Label>
            <Textarea
              id="notes"
              rows={4}
              placeholder="Tell us about your goals, timeline, budget, or any questions..."
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <CTALink
              href="https://wa.me/263785693657"
              target="_blank"
              variant="whatsapp"
              size="lg"
              iconLeft={<MessageCircle className="h-4 w-4" />}
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Skip form & chat now
            </CTALink>
            <Button type="submit" size="lg" className="bg-gradient-to-r from-primary to-primary-glow w-full sm:w-auto">
              Review & send
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
