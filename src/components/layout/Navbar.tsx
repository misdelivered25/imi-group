import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Calendar, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import imiLogo from "@/assets/imi-logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/design", label: "IMI Design", accent: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/gallery", label: "Gallery" },
  { to: "/projects", label: "Projects" },
  { to: "/pricing", label: "Pricing" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/60 supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <img src={imiLogo.url} alt="IMI Group logo" className="h-10 w-10 object-contain md:h-11 md:w-11" />
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight md:text-lg">IMI <span className="text-gradient-gold">Group</span></div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:text-[11px]">Inquire · Motivate · Inspire</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => cn(
                "relative rounded-md px-3 py-2 text-sm transition-smooth",
                link.accent ? "text-gold" : isActive ? "text-gold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/book" className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.25)] transition-smooth hover:shadow-[0_0_34px_hsl(var(--primary)/0.45)] md:inline-flex">
            <Calendar className="h-4 w-4" /> Book Consultation
          </Link>
          <button type="button" className="rounded-lg p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="container mx-auto flex flex-col px-4 py-3">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => cn("py-2.5 text-sm", link.accent || isActive ? "text-gold" : "text-muted-foreground")}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/book" onClick={() => setOpen(false)} className="mt-3 rounded-full bg-gradient-to-r from-primary to-primary-glow px-4 py-2.5 text-center text-sm text-primary-foreground">
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
