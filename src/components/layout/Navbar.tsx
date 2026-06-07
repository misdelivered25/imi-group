import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import imiLogo from "@/assets/imi-logo.png.asset.json";


const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/gallery", label: "Gallery" },
  { to: "/projects", label: "Projects" },
  { to: "/pricing", label: "Pricing" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60">
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={imiLogo.url} alt="IMI Technologies logo" className="h-11 w-11 md:h-12 md:w-12 object-contain drop-shadow-[0_0_12px_hsl(var(--primary)/0.5)]" />
          <div className="leading-tight">
            <div className="font-display text-base md:text-lg font-bold tracking-tight">IMI <span className="text-gradient-gold">Technologies</span></div>
            <div className="text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-[0.2em]">Inquire · Motivate · Inspire</div>
          </div>
        </Link>


        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm rounded-md transition-smooth relative",
                  isActive ? "text-gold" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="https://wa.me/263785693657" target="_blank" rel="noreferrer" aria-label="Book a consultation on WhatsApp" className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-medium animate-pulse-glow hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] transition-smooth">
            <Calendar className="h-4 w-4" /> Book Consultation
          </a>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-3 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn("py-2 text-sm", isActive ? "text-gold" : "text-muted-foreground")
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a href="https://wa.me/263785693657" target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="mt-3 text-center px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
