import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Calendar, Mail, CreditCard, ImageIcon, MessageSquare, BarChart3, LogOut, Lock, ArrowRight } from "lucide-react";
import { CTALink } from "@/components/ui-bits/CTAButton";
import CardGraphic from "@/components/ui-bits/CardGraphic";

type PanelKey = "Overview" | "Leads" | "Quote requests" | "Bookings" | "Newsletter" | "Payments" | "Portfolio" | "Messages" | "Analytics";

const stats: { label: string; key: PanelKey; value: string; icon: any; trend: string }[] = [
  { label: "Leads", key: "Leads", value: "142", icon: Users, trend: "+12%" },
  { label: "Quote requests", key: "Quote requests", value: "38", icon: FileText, trend: "+8%" },
  { label: "Bookings", key: "Bookings", value: "27", icon: Calendar, trend: "+5%" },
  { label: "Newsletter subs", key: "Newsletter", value: "1,204", icon: Mail, trend: "+22%" },
  { label: "Payments", key: "Payments", value: "$18.4k", icon: CreditCard, trend: "+15%" },
  { label: "Portfolio uploads", key: "Portfolio", value: "63", icon: ImageIcon, trend: "+3" },
  { label: "Messages", key: "Messages", value: "91", icon: MessageSquare, trend: "+19%" },
  { label: "Analytics events", key: "Analytics", value: "24.1k", icon: BarChart3, trend: "+34%" },
];

const nav: { label: PanelKey; icon: any }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Leads", icon: Users },
  { label: "Quote requests", icon: FileText },
  { label: "Bookings", icon: Calendar },
  { label: "Newsletter", icon: Mail },
  { label: "Payments", icon: CreditCard },
  { label: "Portfolio", icon: ImageIcon },
  { label: "Messages", icon: MessageSquare },
  { label: "Analytics", icon: BarChart3 },
];

const placeholderRows: Record<PanelKey, string[]> = {
  Overview: [],
  Leads: ["T. Moyo — Atlas Co.", "R. Sibanda — Grace Assembly", "K. Dube — OpsFlow", "L. Mhlanga — Student Founder"],
  "Quote requests": ["Q-2026-018 — Website Premium", "Q-2026-019 — Branding Growth", "Q-2026-020 — App MVP"],
  Bookings: ["June 3 · 10:00 — T. Moyo", "June 4 · 14:00 — Hararé Capital", "June 5 · 09:30 — Mosi Studios"],
  Newsletter: ["1,204 active subscribers", "Last campaign open rate: 38%", "New this week: 62"],
  Payments: ["INV-2025-018 — $1,800 — Confirmed", "INV-2025-019 — $950 — Pending", "INV-2025-020 — $2,400 — Draft"],
  Portfolio: ["63 uploaded assets", "12 awaiting review", "New: Brand film — Mosi Studios"],
  Messages: ["3 unread from contact form", "1 WhatsApp inquiry", "5 partnership requests"],
  Analytics: ["24.1k events this week", "Top page: /pricing", "Conversion rate: 4.8%"],
};

export default function Admin() {
  const [panel, setPanel] = useState<PanelKey>("Overview");
  return (
    <div className="min-h-[80vh] grid md:grid-cols-[240px_1fr] gap-6 container mx-auto px-4 py-10">
      <aside className="glass rounded-2xl p-4 h-fit md:sticky md:top-24">
        <div className="px-3 py-2 mb-2">
          <div className="font-display text-lg">IMI <span className="text-gradient-gold">Admin</span></div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1 mt-1"><Lock className="h-3 w-3" /> Protected</div>
        </div>
        <nav className="space-y-1">
          {nav.map(n => (
            <button key={n.label} onClick={() => setPanel(n.label)} aria-current={panel === n.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-smooth ${panel === n.label ? "bg-gradient-to-r from-primary/30 to-transparent text-gold border-l-2 border-gold" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border/60 mt-4 pt-3">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-gold transition-smooth"><LogOut className="h-4 w-4" /> Sign out</Link>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl">{panel === "Overview" ? <>Welcome back, <span className="text-gradient-gold">Miguel</span></> : <span className="text-gradient-gold">{panel}</span>}</h1>
            <p className="text-sm text-muted-foreground">{panel === "Overview" ? "Here's what's happening across IMI this week." : `Manage and review ${panel.toLowerCase()}.`}</p>
          </div>
          <div className="hidden md:flex gap-2">
            <CTALink to="/payments" variant="outline" size="sm" iconLeft={<CreditCard className="h-4 w-4" />}>Payments</CTALink>
            <CTALink to="/book" variant="primary" size="sm" iconLeft={<Calendar className="h-4 w-4" />}>New booking</CTALink>
          </div>
        </div>

        {panel === "Overview" ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map(s => (
                <button key={s.label} onClick={() => setPanel(s.key)} aria-label={`Open ${s.label}`} className="card-click glass rounded-2xl p-5 text-left relative overflow-hidden block">
                  <CardGraphic variant="grid" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <s.icon className="h-5 w-5 text-gold" />
                      <span className="text-xs text-emerald-400">{s.trend}</span>
                    </div>
                    <div className="mt-4 font-display text-3xl">{s.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
                    <div className="reveal-panel mt-2 text-xs text-gold inline-flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></div>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-6 relative overflow-hidden">
                <CardGraphic variant="circuit" />
                <div className="relative">
                  <h3 className="font-display text-lg">Recent leads</h3>
                  <ul className="mt-4 divide-y divide-border/60 text-sm">
                    {placeholderRows.Leads.map(l => (
                      <li key={l} className="py-3 flex justify-between"><span>{l}</span><span className="text-xs text-gold">New</span></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 relative overflow-hidden">
                <CardGraphic variant="wave" />
                <div className="relative">
                  <h3 className="font-display text-lg">Pipeline value</h3>
                  <div className="mt-4 h-40 rounded-xl bg-gradient-to-tr from-primary/20 via-transparent to-gold/10 grid-pattern relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-primary/30 to-transparent" />
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">Demo visualization — connect Lovable Cloud to enable real analytics.</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="glass-gold rounded-2xl p-7 relative overflow-hidden">
            <CardGraphic variant="circuit" />
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Placeholder data</div>
              <h2 className="mt-1 font-display text-2xl">{panel}</h2>
              <ul className="mt-5 divide-y divide-border/60 text-sm">
                {placeholderRows[panel].map(r => (
                  <li key={r} className="py-3 flex justify-between gap-3"><span>{r}</span><span className="text-xs text-gold">View</span></li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted-foreground">Connect Lovable Cloud to populate this panel with live data from your forms, payments and analytics.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
