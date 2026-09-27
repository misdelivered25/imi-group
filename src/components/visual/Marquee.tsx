import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className }: MarqueeProps) {
  const loop = [...items, ...items];
  return (
    <div className={cn("imi-marquee overflow-hidden border-y border-border/50 py-3", className)} aria-hidden="true">
      <div className="imi-marquee-track gap-8 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-8 whitespace-nowrap">
            <span>{item}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
