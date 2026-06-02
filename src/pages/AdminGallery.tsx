import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GallerySubNav from "@/components/gallery/GallerySubNav";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, Images, FolderOpen, Tags, Users, BarChart3, Trash2, Plus, ShieldCheck, Link as LinkIcon, Copy } from "lucide-react";

export default function AdminGallery() {
  const { user, isAdmin, isStaff, loading, roles } = useAuth();
  const nav = useNavigate();
  const [stats, setStats] = useState({ uploads: 0, public: 0, private: 0, projects: 0, categories: 0, previews: 0, downloads: 0 });
  const [galleries, setGalleries] = useState<any[]>([]);
  const [previews, setPreviews] = useState<any[]>([]);
  const [newPreview, setNewPreview] = useState({ galleryId: "", client_name: "", client_email: "" });

  useEffect(() => { if (!loading && !user) nav("/auth?redirect=/admin/gallery"); }, [user, loading, nav]);

  useEffect(() => {
    if (!isStaff) return;
    (async () => {
      const [m, g, p, c, cp, d] = await Promise.all([
        supabase.from("media_items").select("id", { count: "exact", head: true }),
        supabase.from("galleries").select("id, visibility", { count: "exact" }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("client_preview_links").select("*, galleries(title,slug)"),
        supabase.from("downloads").select("id", { count: "exact", head: true }),
      ]);
      const pub = (g.data ?? []).filter(x => x.visibility === "public").length;
      const priv = (g.data ?? []).length - pub;
      setStats({ uploads: m.count ?? 0, public: pub, private: priv, projects: p.count ?? 0, categories: c.count ?? 0, previews: (cp.data ?? []).length, downloads: d.count ?? 0 });
      const { data: gAll } = await supabase.from("galleries").select("*").order("created_at", { ascending: false });
      setGalleries(gAll ?? []);
      setPreviews(cp.data ?? []);
    })();
  }, [isStaff]);

  const grantSelfAdmin = async () => {
    if (!user) return;
    const { count } = await supabase.from("user_roles").select("*", { count: "exact", head: true }).eq("role", "admin");
    if ((count ?? 0) > 0) return toast.error("An admin already exists. Ask them to assign your role.");
    const { error } = await supabase.from("user_roles").insert({ user_id: user.id, role: "admin" });
    if (error) toast.error(error.message);
    else { toast.success("You are now admin. Reloading…"); setTimeout(()=>location.reload(), 800); }
  };

  const deleteGallery = async (id: string) => {
    const { error } = await supabase.from("galleries").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); setGalleries(g => g.filter(x => x.id !== id)); }
  };

  const toggleFeatured = async (g: any) => {
    const { error } = await supabase.from("galleries").update({ featured: !g.featured }).eq("id", g.id);
    if (error) toast.error(error.message); else setGalleries(prev => prev.map(x => x.id===g.id?{...x, featured:!g.featured}:x));
  };

  const setVisibility = async (g: any, v: string) => {
    const status = v === "public" ? "published" : g.status;
    const { error } = await supabase.from("galleries").update({ visibility: v, status }).eq("id", g.id);
    if (error) toast.error(error.message); else setGalleries(prev => prev.map(x => x.id===g.id?{...x, visibility:v, status}:x));
  };

  const createPreview = async () => {
    if (!newPreview.galleryId) return toast.error("Pick a gallery");
    const token = crypto.randomUUID().replace(/-/g,"");
    const { error } = await supabase.from("client_preview_links").insert({
      gallery_id: newPreview.galleryId, client_name: newPreview.client_name, client_email: newPreview.client_email, access_token: token,
      expires_at: new Date(Date.now() + 30*24*3600*1000).toISOString(),
    });
    if (error) toast.error(error.message);
    else { toast.success("Preview link created"); setNewPreview({ galleryId:"", client_name:"", client_email:"" }); const { data } = await supabase.from("client_preview_links").select("*, galleries(title,slug)"); setPreviews(data ?? []); }
  };

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading…</div>;

  if (!isStaff) {
    return (
      <div>
        <GallerySubNav />
        <div className="container mx-auto px-4 py-12 max-w-xl">
          <div className="glass border border-gold/30 rounded-2xl p-8 text-center">
            <ShieldCheck className="h-10 w-10 mx-auto text-gold mb-3"/>
            <h1 className="font-display text-2xl">Admin role required</h1>
            <p className="text-muted-foreground mt-2">Signed in as <b>{user?.email}</b>. Your account currently has roles: {roles.length ? roles.join(", ") : "none"}.</p>
            <p className="text-muted-foreground mt-2 text-sm">If this is the first setup, claim admin access below. Otherwise ask an admin to grant your role.</p>
            <Button onClick={grantSelfAdmin} className="mt-4 bg-gradient-to-r from-primary to-primary-glow">Claim first-admin access</Button>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Total Uploads", value: stats.uploads, icon: Upload },
    { label: "Public Galleries", value: stats.public, icon: Images },
    { label: "Private Galleries", value: stats.private, icon: FolderOpen },
    { label: "Projects", value: stats.projects, icon: BarChart3 },
    { label: "Categories", value: stats.categories, icon: Tags },
    { label: "Client Previews", value: stats.previews, icon: Users },
    { label: "Downloads", value: stats.downloads, icon: BarChart3 },
  ];

  return (
    <div>
      <GallerySubNav />
      <section className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-4xl">Admin Gallery</h1>
            <p className="text-muted-foreground">Manage galleries, projects, categories and client previews.</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-primary-glow"><Link to="/upload"><Upload className="h-4 w-4 mr-2"/>New Upload</Link></Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
          {cards.map(c => (
            <div key={c.label} className="glass border border-border/60 rounded-xl p-4">
              <c.icon className="h-4 w-4 text-gold mb-2"/>
              <div className="text-2xl font-display">{c.value}</div>
              <div className="text-[11px] text-muted-foreground">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="glass border border-border/60 rounded-xl mt-8 overflow-hidden">
          <div className="p-4 border-b border-border/60 flex items-center justify-between">
            <h2 className="font-display text-xl">Galleries</h2>
            <span className="text-xs text-muted-foreground">{galleries.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-muted-foreground text-xs">
                <tr><th className="text-left p-3">Title</th><th className="text-left p-3">Visibility</th><th className="text-left p-3">Status</th><th className="text-left p-3">Featured</th><th className="text-right p-3">Actions</th></tr>
              </thead>
              <tbody>
                {galleries.map(g => (
                  <tr key={g.id} className="border-t border-border/60">
                    <td className="p-3"><Link to={`/gallery/${g.slug}`} className="hover:text-gold">{g.title}</Link></td>
                    <td className="p-3">
                      <Select value={g.visibility} onValueChange={(v)=>setVisibility(g, v)}>
                        <SelectTrigger className="h-8 w-32"><SelectValue/></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="client-only">Client Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3"><Badge>{g.status}</Badge></td>
                    <td className="p-3"><Button size="sm" variant="ghost" onClick={()=>toggleFeatured(g)}>{g.featured ? "★" : "☆"}</Button></td>
                    <td className="p-3 text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild><Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4"/></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader><AlertDialogTitle>Delete gallery?</AlertDialogTitle><AlertDialogDescription>This removes the gallery and all its media references. This cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                          <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={()=>deleteGallery(g.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
                {galleries.length === 0 && <tr><td className="p-6 text-center text-muted-foreground" colSpan={5}>No galleries yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass border border-border/60 rounded-xl mt-8 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Client Preview Links</h2>
            <Dialog>
              <DialogTrigger asChild><Button size="sm"><Plus className="h-4 w-4 mr-1"/>New Link</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create client preview</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div><Label>Gallery</Label>
                    <Select value={newPreview.galleryId} onValueChange={v=>setNewPreview({...newPreview, galleryId:v})}>
                      <SelectTrigger><SelectValue placeholder="Pick"/></SelectTrigger>
                      <SelectContent>{galleries.map(g => <SelectItem key={g.id} value={g.id}>{g.title}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div><Label>Client name</Label><Input value={newPreview.client_name} onChange={e=>setNewPreview({...newPreview, client_name:e.target.value})}/></div>
                  <div><Label>Client email</Label><Input value={newPreview.client_email} onChange={e=>setNewPreview({...newPreview, client_email:e.target.value})}/></div>
                  <Button onClick={createPreview} className="w-full">Create</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {previews.length === 0 ? <p className="text-muted-foreground text-sm">No client previews yet.</p> : (
            <div className="space-y-2">
              {previews.map(p => {
                const url = `${location.origin}/client-preview/${p.access_token}`;
                return (
                  <div key={p.id} className="border border-border/60 rounded-lg p-3 flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <div className="font-medium text-sm">{p.client_name || "Client"} · {p.galleries?.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-md">{url}</div>
                    </div>
                    <Button size="sm" variant="outline" onClick={()=>{ navigator.clipboard.writeText(url); toast.success("Copied"); }}><Copy className="h-4 w-4 mr-1"/>Copy</Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="glass border border-border/60 rounded-xl mt-8 p-6 text-center text-sm text-muted-foreground">
          Media performance analytics — coming soon.
        </div>
      </section>
    </div>
  );
}
