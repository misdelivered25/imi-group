import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselSlide = {
  id: string;
  image: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  href?: string;
};

type ImageCarouselProps = {
  slides: CarouselSlide[];
  className?: string;
  viewportClassName?: string;
  autoPlayMs?: number;
  loop?: boolean;
  showProgress?: boolean;
  showPlayPause?: boolean;
  onSlideClick?: (slide: CarouselSlide) => void;
};

export default function ImageCarousel({
  slides,
  className,
  viewportClassName,
  autoPlayMs = 6000,
  loop = true,
  showProgress = true,
  showPlayPause = true,
  onSlideClick,
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: "start", containScroll: "trimSnaps" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !playing || slides.length < 2) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), autoPlayMs);
    return () => window.clearInterval(timer);
  }, [emblaApi, autoPlayMs, playing, slides.length]);

  const progress = useMemo(() => ((selectedIndex + 1) / Math.max(slides.length, 1)) * 100, [selectedIndex, slides.length]);

  if (!slides.length) return null;

  return (
    <div className={cn("relative group", className)}>
      <div className={cn("overflow-hidden rounded-[2rem]", viewportClassName)} ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => onSlideClick?.(slide)}
              className="relative min-w-0 flex-[0_0_100%] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={slide.title ? `View ${slide.title}` : `View slide ${slide.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-card">
                <img
                  src={slide.image}
                  alt={slide.title ?? "IMI visual"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[9000ms] ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--primary)/0.22),transparent_35%)]" />
                <div className="absolute left-0 right-0 bottom-0 p-6 md:p-10">
                  {slide.eyebrow && <div className="text-[10px] uppercase tracking-[0.28em] text-gold">{slide.eyebrow}</div>}
                  {slide.title && <h3 className="mt-2 font-display text-2xl md:text-4xl">{slide.title}</h3>}
                  {slide.description && <p className="mt-2 max-w-xl text-sm md:text-base text-muted-foreground">{slide.description}</p>}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="h-10 w-10 rounded-full border border-border/70 bg-background/60 grid place-items-center hover:border-gold/60 transition-smooth"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="h-10 w-10 rounded-full border border-border/70 bg-background/60 grid place-items-center hover:border-gold/60 transition-smooth"
          aria-label="Next slide"
        >
          <ArrowRight className="h-4 w-4" />
        </button>

        {showProgress && (
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden" aria-hidden="true">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-gold transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        )}

        <span className="min-w-[62px] text-right text-xs tabular-nums text-muted-foreground" aria-live="polite">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        {showPlayPause && slides.length > 1 && (
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            className="h-10 w-10 rounded-full border border-border/70 bg-background/60 grid place-items-center hover:border-gold/60 transition-smooth"
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            aria-pressed={playing}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
