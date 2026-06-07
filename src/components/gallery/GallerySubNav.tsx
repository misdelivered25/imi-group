import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Images, FolderOpen, Tags, Library, Upload, Shield, Home, Briefcase, Calendar } from "lucide-react";

const items = [
  { to: "/gallery", label: "Public Gallery", icon: Images },
  { to: "/albums", label: "Albums", icon: FolderOpen },
  { to: "/categories", label: "Categories", icon: Tags },
  { to: "/media-library", label: "Media Library", icon: Library },
  { to: "/upload", label: "Upload Portal", icon: Upload },
  { to: "/admin/gallery", label: "Admin Gallery", icon: Shield },
];

const returnLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/services", label: "Services", icon: Briefcase },
  { href: "https://wa.me/263785693657", label: "Book Consultation", icon: Calendar, external: true },
];

export default function GallerySubNav() {
  return (
    <div className="border-b border-border/60 bg-card/40 backdrop-blur">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-2 justify-between">
        <div className="flex flex-wrap gap-1">
          {items.map((i) => (
            <NavLink
              key={i.to}
              to={i.to}
              end
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-smooth",
                  isActive
                    ? "border-gold/60 text-gold bg-gold/10 shadow-[0_0_20px_hsl(var(--gold)/0.2)]"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                )
              }
            >
              <i.icon className="h-3.5 w-3.5" /> {i.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex gap-1">
          {returnLinks.map((l) =>
            l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-muted-foreground hover:text-gold">
                <l.icon className="h-3 w-3" /> {l.label}
              </a>
            ) : (
              <NavLink key={l.to} to={l.to} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] text-muted-foreground hover:text-gold">
                <l.icon className="h-3 w-3" /> {l.label}
              </NavLink>
            )
          )}
        </div>
      </div>
    </div>
  );
}
