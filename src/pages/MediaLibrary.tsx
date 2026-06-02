import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GallerySubNav from "@/components/gallery/GallerySubNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSignedUrl } from "@/lib/gallery";
import { Search, LayoutGrid, List, Star, Filter } from "lucide-react";

export default function MediaLibrary() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<any[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  const [urls, setUrls] = useState<Record<string,string>>({});
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const cat = params.get("category");
  const type = params.get("type");
  const featured = params.get("featured");

  useEffect(() => { supabase.from("categories").select("*").then(({data}) => setCats(data ?? [])); }, []);

  useEffect(() => {
    (async () => {
      let q = supabase.from("media_items").select("*, categories(name,slug), galleries(title,slug)").order("created_at", { ascending: false }).limit(120);
      if (cat) {
        const c = (cats ?? []).find(x => x.slug === cat);
        if (c) q = q.eq("category_id", c.id);
      }
      if (type) q = q.eq("file_type", type);
      if (featured === "1") q = q.eq("featured", true);
      const { data } = await q;
      setItems(data ?? []);
      const map: Record<string,string> = {};
      for (const it of data ?? []) { const u = await getSignedUrl(it.file_url); if (u) map[it.id] = u; }
      setUrls(map);
    })();
  }, [cat, type, featured, cats]);

  const filtered = useMemo(() => items.filter(i => !query || (i.title??"").toLowerCase().includes(query.toLowerCase()) || (i.caption??"").toLowerCase().includes(query.toLowerCase())), [items, query]);

  const setFilter = (k: string, v: string | null) => {
    const np = new URLSearchParams(params);
    if (v) np.set(k, v); else np.delete(k);
    setParams(np);
  };

  return (
    <div>
      <GallerySubNav />
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="font-display text-4xl">Media Library</h1>
            <p className="text-muted-foreground">Search and filter every uploaded image and video.</p>
          </div>
          <div className="flex gap-2">
            <Button variant={view==="grid"?"default":"outline"} size="icon" onClick={()=>setView("grid")}><LayoutGrid className="h-4 w-4"/></Button>
            <Button variant={view==="list"?"default":"outline"} size="icon" onClick={()=>setView("list")}><List className="h-4 w-4"/></Button>
          </div>
        </div>

        <div className="glass border border-border/60 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search media…" className="pl-9"/>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge onClick={()=>setFilter("category",null)} className={`cursor-pointer ${!cat?"bg-gold/20 text-gold border-gold/40":"bg-muted text-muted-foreground"} border`}>All</Badge>
            {cats.map(c => (
              <Badge key={c.id} onClick={()=>setFilter("category", c.slug)} className={`cursor-pointer ${cat===c.slug?"bg-gold/20 text-gold border-gold/40":"bg-muted text-muted-foreground"} border`}>{c.name}</Badge>
            ))}
          </div>
          <div className="flex gap-1">
            <Badge onClick={()=>setFilter("type", type==="image"?null:"image")} className={`cursor-pointer border ${type==="image"?"bg-primary/20 text-primary":"bg-muted text-muted-foreground"}`}>Images</Badge>
            <Badge onClick={()=>setFilter("type", type==="video"?null:"video")} className={`cursor-pointer border ${type==="video"?"bg-primary/20 text-primary":"bg-muted text-muted-foreground"}`}>Videos</Badge>
            <Badge onClick={()=>setFilter("featured", featured==="1"?null:"1")} className={`cursor-pointer border ${featured==="1"?"bg-gold/20 text-gold":"bg-muted text-muted-foreground"}`}><Star className="h-3 w-3 mr-1"/>Featured</Badge>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass border border-border/60 rounded-2xl p-16 text-center">
            <Filter className="h-10 w-10 mx-auto text-gold mb-3" />
            <p className="text-muted-foreground">No media matches your filters.</p>
            <Button asChild className="mt-4"><Link to="/upload">Upload Media</Link></Button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map(it => (
              <Link key={it.id} to={`/gallery/${it.galleries?.slug ?? ""}`} className="group relative aspect-square rounded-xl overflow-hidden border border-border/60 hover:border-gold/50 bg-card">
                {it.file_type === "video" ? <video src={urls[it.id]} className="absolute inset-0 w-full h-full object-cover"/> :
                <img src={urls[it.id]} alt={it.title??""} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-xs font-medium truncate">{it.title || "Untitled"}</div>
                  <div className="text-[10px] text-muted-foreground">{it.categories?.name}</div>
                </div>
                {it.featured && <Star className="absolute top-2 right-2 h-4 w-4 text-gold fill-gold"/>}
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(it => (
              <div key={it.id} className="glass border border-border/60 rounded-lg p-3 flex items-center gap-3">
                <div className="h-14 w-14 rounded overflow-hidden bg-muted flex-shrink-0">
                  {it.file_type==="video"?<video src={urls[it.id]} className="w-full h-full object-cover"/>:<img src={urls[it.id]} className="w-full h-full object-cover"/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{it.title || "Untitled"}</div>
                  <div className="text-xs text-muted-foreground">{it.categories?.name} · {it.galleries?.title}</div>
                </div>
                {it.featured && <Star className="h-4 w-4 text-gold fill-gold"/>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
