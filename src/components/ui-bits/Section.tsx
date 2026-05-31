import { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <div className={center ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && <div className="text-xs uppercase tracking-[0.3em] text-gold mb-3">{eyebrow}</div>}
      <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}

export function GoldButton({ children, href, onClick, type = "button" }: { children: ReactNode; href?: string; onClick?: () => void; type?: "button" | "submit" }) {
  const cls = "inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-gold to-amber-500 text-background font-semibold hover:scale-[1.03] transition-smooth glow-gold";
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

export function BlueButton({ children, href, to, onClick }: { children: ReactNode; href?: string; to?: string; onClick?: () => void }) {
  const cls = "inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold hover:scale-[1.03] transition-smooth animate-pulse-glow";
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export function OutlineButton({ children, href, to }: { children: ReactNode; href?: string; to?: string }) {
  return (
    <a href={href} className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition-smooth">
      {children}
    </a>
  );
}
