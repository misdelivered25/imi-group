import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShieldCheck, Download, ArrowLeft } from "lucide-react";

export default function ClientPreview() {
  const { token } = useParams();
  const [state, setState] = useState<"loading" | "invalid" | "expired" | "ok">("loading");
  const [link, setLink] = useState<any>(null);
  const [gallery, setGallery] = useState<any>(null);
  const [media, setMedia] = useState<any[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [name, setName] = useState(""); const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      if (!token) { setState("invalid"); return; }
      const { data, error } = await supabase.rpc("get_client_preview", { p_token: token });
      if (error || !data) { setState("invalid"); return; }
      if ((data as any).expired) { setState("expired"); return; }
      const payload = data as any;
      setLink(payload.link);
      setGallery(payload.gallery);
      setMedia(payload.media ?? []);
      setState("ok");

      const paths = (payload.media ?? []).map((m: any) => m.file_url).filter(Boolean);
      if (paths.length) {
        const { data: signed } = await supabase.functions.invoke("client-preview-url", {
          body: { token, paths },
        });
        if (signed?.urls) {
          const map: Record<string, string> = {};
          for (const m of payload.media) if (signed.urls[m.file_url]) map[m.id] = signed.urls[m.file_url];
          setUrls(map);
        }
      }
    })();
  }, [token]);

  if (state === "loading") return <div className="container mx-auto px-4 py-24 text-center text-muted-foreground">Loading…</div>;
  if (state === "invalid") return <div className="container mx-auto px-4 py-24 text-center"><h1 className="font-display text-3xl">Invalid or expired preview link</h1><Button asChild className="mt-4"><Link to="/">Return to IMI</Link></Button></div>;
  if (state === "expired") return <div className="container mx-auto px-4 py-24 text-center"><h1 className="font-display text-3xl">This preview has expired</h1></div>;

  const submitComment = async () => {
    if (!text.trim() || !media[0]) return;
    const { error } = await supabase.rpc("insert_client_comment", {
      p_token: token!,
      p_media_item_id: media[0].id,
      p_user_name: name || link.client_name,
      p_comment: text,
    });
    if (error) toast.error(error.message); else { toast.success("Comment sent"); setText(""); }
  };

  return (
    <div className="min-h-screen">
      <div className="border-b border-gold/30 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs"><ShieldCheck className="h-4 w-4 text-gold"/><span className="text-muted-foreground">Private client preview for</span> <b>{link.client_name || "client"}</b></div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-gold inline-flex items-center gap-1"><ArrowLeft className="h-3 w-3"/>Return to IMI Technologies</Link>
        </div>
      </div>
      <section className="container mx-auto px-4 py-10">
        <h1 className="font-display text-4xl">{gallery?.title}</h1>
        <p className="text-muted-foreground mt-2">{gallery?.description}</p>

        {media.length === 0 ? <p className="text-muted-foreground mt-8">No approved files yet.</p> : (
          <div className="columns-2 md:columns-3 gap-4 mt-8">
            {media.map(m => (
              <div key={m.id} className="mb-4 rounded-xl overflow-hidden border border-border/60">
                {m.file_type === "video" ? <video src={urls[m.id]} controls className="w-full"/> : <img src={urls[m.id]} alt={m.title ?? ""} className="w-full"/>}
                {link.download_allowed && m.download_allowed && urls[m.id] && (
                  <a href={urls[m.id]} download className="block text-center py-2 text-xs text-gold hover:bg-gold/10"><Download className="h-3 w-3 inline mr-1"/>Download</a>
                )}
              </div>
            ))}
          </div>
        )}

        {link.comment_allowed && media[0] && (
          <div className="mt-10 glass border border-border/60 rounded-2xl p-6 max-w-xl">
            <h3 className="font-display text-lg mb-3">Leave a comment</h3>
            <Input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="mb-2"/>
            <Textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Your feedback…"/>
            <Button onClick={submitComment} className="mt-3">Send</Button>
          </div>
        )}

        <div className="mt-10 text-center">
          <Button asChild className="bg-gradient-to-r from-primary to-primary-glow"><Link to="/contact">Contact IMI</Link></Button>
        </div>
      </section>
    </div>
  );
}
