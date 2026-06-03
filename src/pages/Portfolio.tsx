import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SectionHeader } from "@/components/ui-bits/Section";
import CardGraphic from "@/components/ui-bits/CardGraphic";
import { useAuth } from "@/hooks/useAuth";
import { getSignedUrl } from "@/lib/gallery";
import { Folder, Upload, Images, ArrowRight } from "lucide-react";

type Gallery = { id: string; title: string; slug: string; description: string | null; category_id: string | null; cover_image_url: string | null; featured: boolean };
type Category = { id: string; name: string; slug: string };

export default function Portfolio() {
  const { isStaff } = useAuth();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [covers, setCovers] = useState<Record<string, string>>({});
  const [tab, setTab] = useState("All");

  useEffect(() => {
    (async () => {
      const [{ data: g }, { data: c }, { data: m }] = await Promise.all([
        supabase.from("galleries").select("*").order("title"),
        supabase.from("categories").select("*").order("name"),
        supabase.from("media_items").select("gallery_id"),
      ]);
      setGalleries((g ?? []) as any);
      setCategories((c ?? []) as any);
      const cmap: Record<string, number> = {};
      (m ?? []).forEach((row: any) => { if (row.gallery_id) cmap[row.gallery_id] = (cmap[row.gallery_id] ?? 0) + 1; });
      setCounts(cmap);
      const cov: Record<string, string> = {};
      for (const gal of g ?? []) {
        if (gal.cover_image_url) {
          const u = await getSignedUrl(gal.cover_image_url);
          if (u) cov[gal.id] = u;
        }
      }
      setCovers(cov);
    })();
  }, []);

  const tabs = useMemo(() => ["All", ...categories.map(c => c.name)], [categories]);
  const filtered = useMemo(() => {
    if (tab === "All") return galleries;
    const cat = categories.find(c => c.name === tab);
    return galleries.filter(g => g.category_id === cat?.id);
  }, [tab, galleries, categories]);

  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Portfolio · Folders"
          title={<>Selected <span className="text-gradient-gold">folders</span>.</>}
          subtitle="Each folder is a live gallery. Open one to view the work, or upload media into it from the backend."
        />

        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t}
              className={`px-4 py-2 text-sm rounded-full border transition-smooth ${tab === t ? "bg-gold text-background border-gold" : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((g, i) => {
            const count = counts[g.id] ?? 0;
            const catName = categories.find(c => c.id === g.category_id)?.name ?? "Folder";
            return (
              <div key={g.id} className="card-click group relative aspect-square rounded-2xl overflow-hidden border border-border hover:border-gold/60">
                <Link to={`/gallery/${g.slug}`} aria-label={`Open ${g.title} folder`} className="absolute inset-0">
                  {covers[g.id] ? (
                    <img src={covers[g.id]} alt={g.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-card" />
                      <div className="absolute inset-0 grid-pattern opacity-30" />
                      <CardGraphic variant={["circuit","nodes","wave","grid"][i % 4] as any} />
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-xl bg-background/60 backdrop-blur border border-gold/30 grid place-items-center">
                    <Folder className="h-5 w-5 text-gold" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <span className="self-start text-[10px] uppercase tracking-[0.2em] text-gold px-2 py-1 border border-gold/30 rounded-full bg-background/40 backdrop-blur">{catName}</span>
                    <div className="font-display text-lg mt-2">{g.title}</div>
                    <div className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">
                      <Images className="h-3 w-3" /> {count} item{count === 1 ? "" : "s"}
                    </div>
                  </div>
                </Link>
                {isStaff && (
                  <Link
                    to={`/upload?gallery=${g.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1 text-[11px] font-medium px-3 py-1.5 rounded-full bg-gold text-background hover:bg-gold/90 shadow-lg"
                  >
                    <Upload className="h-3 w-3" /> Upload
                  </Link>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12">No folders in this category yet.</div>
          )}
        </div>

        <div className="mt-12 glass border border-gold/30 rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-display text-xl">Manage folders in the backend</div>
            <p className="text-sm text-muted-foreground">Sign in as admin or editor to upload, organize and publish media for each folder.</p>
          </div>
          <div className="flex gap-2">
            <Link to="/upload" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground text-sm"><Upload className="h-4 w-4"/>Upload media</Link>
            <Link to="/admin/gallery" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/60 text-gold text-sm">Admin <ArrowRight className="h-4 w-4"/></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
