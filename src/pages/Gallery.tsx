import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GallerySubNav from "@/components/gallery/GallerySubNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Upload, Images, Sparkles, Camera, Video, Globe, Calendar, Cpu, Briefcase } from "lucide-react";
import { getSignedUrl } from "@/lib/gallery";

const SAMPLE = [
  { title: "IMI Designs Portfolio", tag: "Branding" },
  { title: "IMI Media Photography", tag: "Photography" },
  { title: "CUT CEOs Event Media", tag: "Events" },
  { title: "Zim Youth & Varsity CEOs Designs", tag: "Posters" },
  { title: "Business Website Projects", tag: "Websites" },
  { title: "AI Systems and Concepts", tag: "AI Systems" },
  { title: "Branding and Poster Designs", tag: "Branding" },
];

const ICONS: Record<string, any> = { Posters: Images, Branding: Sparkles, Websites: Globe, Photography: Camera, Videography: Video, Events: Calendar, "AI Systems": Cpu, "Business Projects": Briefcase, "Social Media": Sparkles, "Student Leadership Work": Briefcase };

export default function Gallery() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const [g, c] = await Promise.all([
        supabase.from("galleries").select("*").eq("visibility","public").eq("status","published").order("created_at", { ascending: false }),
        supabase.from("categories").select("*").order("name"),
      ]);
      setGalleries(g.data ?? []);
      setCategories(c.data ?? []);
      const map: Record<string,string> = {};
      for (const gal of g.data ?? []) {
        if (gal.cover_image_url) {
          const u = await getSignedUrl(gal.cover_image_url);
          if (u) map[gal.id] = u;
        }
      }
      setUrls(map);
    })();
  }, []);

  return (
    <div>
      <GallerySubNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <Badge className="bg-gold/10 text-gold border border-gold/30 mb-4">IMI Gallery Studio · Upload. Organize. Showcase.</Badge>
          <h1 className="font-display text-4xl md:text-6xl max-w-4xl">Manage and Showcase IMI's Creative Work in One <span className="text-gradient-gold">Premium Gallery</span> System</h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg">Upload designs, media, event photos, videos, branding projects and portfolio work into organized galleries built for clients, teams, and public showcases.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary-glow"><Link to="/media-library"><Images className="h-4 w-4 mr-2"/>Open Gallery</Link></Button>
            <Button asChild size="lg" variant="outline" className="border-gold/60 text-gold hover:bg-gold/10"><Link to="/upload"><Upload className="h-4 w-4 mr-2"/>Upload Media</Link></Button>
            <Button asChild size="lg" variant="ghost"><Link to="/"><ArrowRight className="h-4 w-4 mr-2 rotate-180"/>Back to IMI Technologies</Link></Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs text-gold uppercase tracking-[0.2em]">Categories</div>
            <h2 className="font-display text-3xl">Browse by category</h2>
          </div>
          <Link to="/categories" className="text-sm text-muted-foreground hover:text-gold">All categories →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((c) => {
            const Icon = ICONS[c.name] ?? Images;
            return (
              <Link key={c.id} to={`/media-library?category=${c.slug}`} className="glass border border-border/60 hover:border-gold/40 rounded-xl p-4 transition-smooth group">
                <Icon className="h-6 w-6 text-gold mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-medium text-sm">{c.name}</div>
                <div className="text-[11px] text-muted-foreground mt-1">Explore →</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured / Galleries */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-xs text-gold uppercase tracking-[0.2em]">Featured</div>
        <h2 className="font-display text-3xl mb-6">Featured galleries</h2>
        {galleries.length === 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {SAMPLE.map((s, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-2xl border border-border/60 bg-card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-gold/10 grid-pattern" />
                <div className="absolute inset-0 grid place-items-center text-center p-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gold mb-2">{s.tag} · Sample</div>
                    <div className="font-display text-xl">{s.title}</div>
                    <div className="text-xs text-muted-foreground mt-2">No uploads yet</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {galleries.map((g) => (
              <Link key={g.id} to={`/gallery/${g.slug}`} className="group relative aspect-[4/3] rounded-2xl border border-border/60 overflow-hidden bg-card card-click">
                {urls[g.id] ? (
                  <img src={urls[g.id]} alt={g.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-gold/10" />}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  {g.featured && <Badge className="bg-gold/20 text-gold border border-gold/40 mb-2">Featured</Badge>}
                  <div className="font-display text-xl">{g.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">View gallery →</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass border border-gold/30 rounded-3xl p-10 text-center">
          <h3 className="font-display text-3xl">Like this work? Book IMI Technologies for your next project.</h3>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">From branding to AI systems, our team helps you Inquire, Motivate, and Inspire.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Button asChild className="bg-gradient-to-r from-primary to-primary-glow"><a href="https://wa.me/263785693657" target="_blank" rel="noreferrer">Book a Consultation</a></Button>
            <Button asChild variant="outline" className="border-gold/60 text-gold"><Link to="/contact">Contact IMI</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
