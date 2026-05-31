import { Link } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Calendar, Mail, CreditCard, ImageIcon, MessageSquare, BarChart3, LogOut, Lock } from "lucide-react";

const stats = [
  { label: "Leads", value: "142", icon: Users, trend: "+12%" },
  { label: "Quote requests", value: "38", icon: FileText, trend: "+8%" },
  { label: "Bookings", value: "27", icon: Calendar, trend: "+5%" },
  { label: "Newsletter subs", value: "1,204", icon: Mail, trend: "+22%" },
  { label: "Payments", value: "$18.4k", icon: CreditCard, trend: "+15%" },
  { label: "Portfolio uploads", value: "63", icon: ImageIcon, trend: "+3" },
  { label: "Messages", value: "91", icon: MessageSquare, trend: "+19%" },
  { label: "Analytics events", value: "24.1k", icon: BarChart3, trend: "+34%" },
];

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Leads", icon: Users },
  { label: "Quote requests", icon: FileText },
  { label: "Bookings", icon: Calendar },
  { label: "Newsletter", icon: Mail },
  { label: "Payments", icon: CreditCard },
  { label: "Portfolio", icon: ImageIcon },
  { label: "Messages", icon: MessageSquare },
  { label: "Analytics", icon: BarChart3 },
];

export default function Admin() {
  return (
    <div className="min-h-[80vh] grid md:grid-cols-[240px_1fr] gap-6 container mx-auto px-4 py-10">
      <aside className="glass rounded-2xl p-4 h-fit md:sticky md:top-24">
        <div className="px-3 py-2 mb-2">
          <div className="font-display text-lg">IMI <span className="text-gradient-gold">Admin</span></div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1 mt-1"><Lock className="h-3 w-3" /> Protected</div>
        </div>
        <nav className="space-y-1">
          {nav.map(n => (
            <button key={n.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-smooth ${n.active ? "bg-gradient-to-r from-primary/30 to-transparent text-gold border-l-2 border-gold" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>
              <n.icon className="h-4 w-4" /> {n.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border/60 mt-4 pt-3">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground"><LogOut className="h-4 w-4" /> Sign out</Link>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl">Welcome back, <span className="text-gradient-gold">Miguel</span></h1>
            <p className="text-sm text-muted-foreground">Here's what's happening across IMI this week.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Link to="/payments" className="px-4 py-2 rounded-full border border-gold/40 text-gold text-sm">Payments</Link>
            <Link to="/book" className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm">New booking</Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="glass rounded-2xl p-5 hover-lift">
              <div className="flex items-center justify-between">
                <s.icon className="h-5 w-5 text-gold" />
                <span className="text-xs text-emerald-400">{s.trend}</span>
              </div>
              <div className="mt-4 font-display text-3xl">{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg">Recent leads</h3>
            <ul className="mt-4 divide-y divide-border/60 text-sm">
              {["T. Moyo — Atlas Co.","R. Sibanda — Grace Assembly","K. Dube — OpsFlow","L. Mhlanga — Student Founder"].map(l => (
                <li key={l} className="py-3 flex justify-between"><span>{l}</span><span className="text-xs text-gold">New</span></li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-lg">Pipeline value</h3>
            <div className="mt-4 h-40 rounded-xl bg-gradient-to-tr from-primary/20 via-transparent to-gold/10 grid-pattern relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">Demo visualization — connect Lovable Cloud to enable real analytics.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
