import { useEffect } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, X } from "lucide-react";
import type { DesignPortfolioItem } from "@/data/imiDesign";

export type LightboxItem = DesignPortfolioItem;

type PortfolioLightboxProps = {
  item: LightboxItem | null;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function PortfolioLightbox({ item, index, total, onClose, onNext, onPrevious }: PortfolioLightboxProps) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, onClose, onNext, onPrevious]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-background/90 backdrop-blur-xl p-4 md:p-8" role="dialog" aria-modal="true" aria-label={`${item.title} preview`}>
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 h-11 w-11 rounded-full border border-border/70 bg-background/70 grid place-items-center hover:border-gold/60 transition-smooth"
        aria-label="Close preview"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/20 bg-card shadow-2xl">
          <img src={item.image} alt={item.title} className="max-h-[72vh] w-full object-contain bg-background" />
        </div>

        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{item.category} · {item.year}</div>
            <h2 className="mt-1 font-display text-2xl md:text-3xl">{item.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{item.description}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={onPrevious} className="h-10 w-10 rounded-full border border-border grid place-items-center" aria-label="Previous portfolio item">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={onNext} className="h-10 w-10 rounded-full border border-border grid place-items-center" aria-label="Next portfolio item">
              <ArrowRight className="h-4 w-4" />
            </button>
            <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-medium text-background">
              View portfolio <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">{index + 1} / {total}</div>
      </div>
    </div>
  );
}
