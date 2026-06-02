import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GallerySubNav from "@/components/gallery/GallerySubNav";
import { FolderOpen } from "lucide-react";

export default function Albums() {
  const [albums, setAlbums] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("albums").select("*, galleries(slug,title)").order("created_at", { ascending: false })
      .then(({ data }) => setAlbums(data ?? []));
  }, []);
  return (
    <div>
      <GallerySubNav />
      <section className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl">Albums</h1>
        <p className="text-muted-foreground mt-2">Curated collections inside each gallery.</p>
        {albums.length === 0 ? (
          <div className="mt-10 glass border border-border/60 rounded-2xl p-16 text-center">
            <FolderOpen className="h-10 w-10 mx-auto text-gold mb-3" />
            <p className="text-muted-foreground">No albums yet. Create one from the Upload Portal.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {albums.map((a) => (
              <Link key={a.id} to={`/gallery/${a.galleries?.slug ?? ""}`} className="glass border border-border/60 hover:border-gold/40 rounded-xl p-5 transition-smooth">
                <FolderOpen className="h-6 w-6 text-gold mb-3" />
                <div className="font-display text-lg">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-1">In {a.galleries?.title}</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
