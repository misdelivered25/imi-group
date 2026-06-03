import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GallerySubNav from "@/components/gallery/GallerySubNav";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { uploadFile, slugify } from "@/lib/gallery";
import { toast } from "sonner";
import { Upload as UploadIcon, X, Plus, ShieldAlert } from "lucide-react";

type Pending = { file: File; preview: string; title: string; caption: string; tags: string; featured: boolean; download: boolean; };

export default function Upload() {
  const { user, isStaff, loading } = useAuth();
  const nav = useNavigate();
  const [files, setFiles] = useState<Pending[]>([]);
  const [galleries, setGalleries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [galleryId, setGalleryId] = useState<string>("");
  const [albumId, setAlbumId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [newGallery, setNewGallery] = useState("");
  const [newAlbum, setNewAlbum] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav("/auth?redirect=/upload");
  }, [user, loading, nav]);

  useEffect(() => {
    supabase.from("galleries").select("*").order("created_at", { ascending: false }).then(({data}) => setGalleries(data ?? []));
    supabase.from("categories").select("*").order("name").then(({data}) => setCategories(data ?? []));
  }, []);

  useEffect(() => {
    if (galleryId) supabase.from("albums").select("*").eq("gallery_id", galleryId).then(({data}) => setAlbums(data ?? []));
    else setAlbums([]);
  }, [galleryId]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const fs = Array.from(e.dataTransfer.files);
    addFiles(fs);
  };
  const addFiles = (fs: File[]) => {
    const next = fs.filter(f => f.type.startsWith("image/") || f.type.startsWith("video/")).map(f => ({
      file: f, preview: URL.createObjectURL(f), title: f.name.replace(/\.[^.]+$/, ""), caption: "", tags: "", featured: false, download: false,
    }));
    setFiles(prev => [...prev, ...next]);
  };

  const submit = async () => {
    if (files.length === 0) return toast.error("Add at least one file");
    setUploading(true); setProgress(0);
    try {
      let gid = galleryId;
      if (newGallery && !gid) {
        const slug = slugify(newGallery) + "-" + Date.now().toString(36);
        const { data, error } = await supabase.from("galleries").insert({ title: newGallery, slug, status: "published", visibility: "public", created_by: (await supabase.auth.getUser()).data.user?.id }).select().single();
        if (error) throw error;
        gid = data.id;
      }
      if (!gid) throw new Error("Select or create a gallery");

      let aid = albumId;
      if (newAlbum) {
        const { data, error } = await supabase.from("albums").insert({ title: newAlbum, gallery_id: gid }).select().single();
        if (error) throw error;
        aid = data.id;
      }

      const uid = (await supabase.auth.getUser()).data.user?.id;
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        const path = await uploadFile(f.file, `gallery/${gid}`);
        await supabase.from("media_items").insert({
          title: f.title, caption: f.caption, file_url: path, file_type: f.file.type.startsWith("video") ? "video" : "image",
          gallery_id: gid, album_id: aid || null, category_id: categoryId || null,
          tags: f.tags ? f.tags.split(",").map(t=>t.trim()) : null, featured: f.featured, download_allowed: f.download, uploaded_by: uid,
        });
        setProgress(Math.round(((i+1)/files.length)*100));
      }
      toast.success(`Uploaded ${files.length} item${files.length>1?"s":""}`);
      setFiles([]); setNewGallery(""); setNewAlbum("");
    } catch (e: any) {
      toast.error(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading…</div>;
  if (!isStaff) return (
    <div>
      <GallerySubNav />
      <div className="container mx-auto px-4 py-16 max-w-xl text-center glass border border-border/60 rounded-2xl mt-8">
        <ShieldAlert className="h-10 w-10 mx-auto text-gold mb-3"/>
        <h1 className="font-display text-2xl">Editor or Admin role required</h1>
        <p className="text-muted-foreground mt-2">Your account needs the <b>admin</b> or <b>editor</b> role to upload. Ask an admin to grant access in the Admin Gallery.</p>
        <Button asChild className="mt-4"><a href="/admin/gallery">Open Admin</a></Button>
      </div>
    </div>
  );

  return (
    <div>
      <GallerySubNav />
      <section className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="font-display text-4xl">Upload Portal</h1>
        <p className="text-muted-foreground">Drag & drop images or videos to add them to a gallery.</p>

        <div onDrop={onDrop} onDragOver={e=>e.preventDefault()} className="mt-6 glass border-2 border-dashed border-gold/30 rounded-2xl p-12 text-center hover:border-gold/60 transition-smooth">
          <UploadIcon className="h-10 w-10 mx-auto text-gold mb-3"/>
          <p className="font-display text-xl">Drop files here</p>
          <p className="text-sm text-muted-foreground">or</p>
          <label className="inline-block mt-3">
            <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={e=>e.target.files && addFiles(Array.from(e.target.files))}/>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground cursor-pointer"><Plus className="h-4 w-4"/>Browse files</span>
          </label>
        </div>

        {files.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="glass border border-border/60 rounded-xl p-4 space-y-3">
                <h3 className="font-display text-lg">Destination</h3>
                <div>
                  <Label>Gallery</Label>
                  <Select value={galleryId} onValueChange={setGalleryId}>
                    <SelectTrigger><SelectValue placeholder="Select a gallery"/></SelectTrigger>
                    <SelectContent>{galleries.map(g => <SelectItem key={g.id} value={g.id}>{g.title}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input value={newGallery} onChange={e=>setNewGallery(e.target.value)} placeholder="…or create new gallery" className="mt-2"/>
                </div>
                <div>
                  <Label>Album (optional)</Label>
                  <Select value={albumId} onValueChange={setAlbumId} disabled={!galleryId}>
                    <SelectTrigger><SelectValue placeholder="Select an album"/></SelectTrigger>
                    <SelectContent>{albums.map(a => <SelectItem key={a.id} value={a.id}>{a.title}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input value={newAlbum} onChange={e=>setNewAlbum(e.target.value)} placeholder="…or create new album" className="mt-2"/>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger><SelectValue placeholder="Select category"/></SelectTrigger>
                    <SelectContent>{categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>

              <div className="glass border border-border/60 rounded-xl p-4">
                <h3 className="font-display text-lg mb-3">Pending ({files.length})</h3>
                <div className="space-y-3 max-h-[400px] overflow-auto pr-2">
                  {files.map((f, i) => (
                    <div key={i} className="border border-border/60 rounded-lg p-3 flex gap-3">
                      <div className="h-16 w-16 rounded overflow-hidden bg-muted flex-shrink-0">
                        {f.file.type.startsWith("video")?<video src={f.preview} className="w-full h-full object-cover"/>:<img src={f.preview} className="w-full h-full object-cover"/>}
                      </div>
                      <div className="flex-1 space-y-1">
                        <Input value={f.title} onChange={e=>setFiles(p=>p.map((x,j)=>j===i?{...x,title:e.target.value}:x))} placeholder="Title"/>
                        <Textarea rows={1} value={f.caption} onChange={e=>setFiles(p=>p.map((x,j)=>j===i?{...x,caption:e.target.value}:x))} placeholder="Caption"/>
                        <Input value={f.tags} onChange={e=>setFiles(p=>p.map((x,j)=>j===i?{...x,tags:e.target.value}:x))} placeholder="tags, comma separated"/>
                        <div className="flex items-center gap-4 text-xs">
                          <label className="flex items-center gap-1"><Switch checked={f.featured} onCheckedChange={v=>setFiles(p=>p.map((x,j)=>j===i?{...x,featured:v}:x))}/>Featured</label>
                          <label className="flex items-center gap-1"><Switch checked={f.download} onCheckedChange={v=>setFiles(p=>p.map((x,j)=>j===i?{...x,download:v}:x))}/>Allow download</label>
                        </div>
                      </div>
                      <button onClick={()=>setFiles(p=>p.filter((_,j)=>j!==i))} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4"/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {uploading && <Progress value={progress} className="mt-4"/>}

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={()=>setFiles([])} disabled={uploading}>Clear</Button>
              <Button onClick={submit} disabled={uploading} className="bg-gradient-to-r from-primary to-primary-glow">{uploading?"Uploading…":`Upload ${files.length} file${files.length>1?"s":""}`}</Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
