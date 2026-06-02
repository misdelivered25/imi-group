import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GallerySubNav from "@/components/gallery/GallerySubNav";
import { Tags } from "lucide-react";

export default function Categories() {
  const [cats, setCats] = useState<any[]>([]);
  useEffect(() => { supabase.from("categories").select("*").order("name").then(({ data }) => setCats(data ?? [])); }, []);
  return (
    <div>
      <GallerySubNav />
      <section className="container mx-auto px-4 py-12">
        <h1 className="font-display text-4xl">Categories</h1>
        <p className="text-muted-foreground mt-2">Browse IMI's creative work by category.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {cats.map((c) => (
            <Link key={c.id} to={`/media-library?category=${c.slug}`} className="glass border border-border/60 hover:border-gold/40 rounded-xl p-5 transition-smooth">
              <Tags className="h-5 w-5 text-gold mb-2" />
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-1">Explore →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
