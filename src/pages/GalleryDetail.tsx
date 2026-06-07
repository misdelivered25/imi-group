import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GallerySubNav from "@/components/gallery/GallerySubNav";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getSignedUrl } from "@/lib/gallery";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

export default function GalleryDetail() {
  const { slug } = useParams();
  const [gallery, setGallery] = useState<any>(null);
  const [media, setMedia] = useState<any[]>([]);
  const [urls, setUrls] = useState<Record<string,string>>({});
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data: g } = await supabase.from("galleries").select("*").eq("slug", slug).maybeSingle();
      setGallery(g);
      if (g) {
        const { data: m } = await supabase.from("media_items").select("*").eq("gallery_id", g.id).order("created_at", { ascending: false });
        setMedia(m ?? []);
        const map: Record<string,string> = {};
        for (const item of m ?? []) {
          const u = await getSignedUrl(item.file_url);
          if (u) map[item.id] = u;
        }
        setUrls(map);
      }
    })();
  }, [slug]);

  if (!gallery) return (
    <div>
      <GallerySubNav />
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Gallery not found</h1>
        <p className="text-muted-foreground mt-2">More details are coming soon.</p>
        <Button asChild className="mt-6"><Link to="/gallery">Back to Gallery</Link></Button>
      </div>
    </div>
  );

  const cur = openIdx !== null ? media[openIdx] : null;

  return (
    <div>
      <GallerySubNav />
      <section className="container mx-auto px-4 py-12">
        <Link to="/gallery" className="text-xs text-muted-foreground hover:text-gold">← All galleries</Link>
        <h1 className="font-display text-4xl mt-3">{gallery.title}</h1>
        {gallery.description && <p className="text-muted-foreground mt-3 max-w-2xl">{gallery.description}</p>}
        <div className="text-xs text-muted-foreground mt-2">{media.length} items</div>

        {media.length === 0 ? (
          <div className="mt-10 glass border border-border/60 rounded-2xl p-16 text-center">
            <p className="text-muted-foreground">No uploads yet for this gallery.</p>
          </div>
        ) : (
          <div className="mt-8 columns-2 md:columns-3 lg:columns-4 gap-4">
            {media.map((m, i) => (
              <button key={m.id} onClick={() => setOpenIdx(i)} className="mb-4 block w-full rounded-xl overflow-hidden border border-border/60 hover:border-gold/50 transition-smooth group">
                {m.file_type === "video" ? (
                  <video src={urls[m.id]} className="w-full" />
                ) : (
                  <img src={urls[m.id]} alt={m.title ?? ""} className="w-full group-hover:scale-105 transition-transform duration-500" />
                )}
              </button>
            ))}
          </div>
        )}

        <div className="mt-12 glass border border-gold/30 rounded-2xl p-8 text-center">
          <h3 className="font-display text-2xl">Want similar work?</h3>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Button asChild className="bg-gradient-to-r from-primary to-primary-glow"><a href="https://wa.me/263785693657" target="_blank" rel="noreferrer">Book Similar Work</a></Button>
            <Button asChild variant="outline" className="border-gold/60 text-gold"><Link to="/contact">Request Quote</Link></Button>
          </div>
        </div>
      </section>

      <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent className="max-w-5xl bg-background border-border/60 p-2">
          {cur && (
            <div className="relative">
              {cur.file_type === "video" ? (
                <video src={urls[cur.id]} controls className="w-full max-h-[80vh]" />
              ) : (
                <img src={urls[cur.id]} alt={cur.title ?? ""} className="w-full max-h-[80vh] object-contain" />
              )}
              <button onClick={() => setOpenIdx(o => o === null ? null : Math.max(0, o-1))} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-card/80 rounded-full"><ChevronLeft/></button>
              <button onClick={() => setOpenIdx(o => o === null ? null : Math.min(media.length-1, o+1))} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-card/80 rounded-full"><ChevronRight/></button>
              <div className="flex items-center justify-between mt-3 px-3 pb-2">
                <div>
                  <div className="font-medium">{cur.title}</div>
                  <div className="text-xs text-muted-foreground">{cur.caption}</div>
                </div>
                {cur.download_allowed && (
                  <a href={urls[cur.id]} download className="text-sm inline-flex items-center gap-1 text-gold"><Download className="h-4 w-4"/>Download</a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
