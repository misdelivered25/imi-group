import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogIn, UserPlus, Sparkles } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(72),
  full_name: z.string().min(1).max(100).optional(),
});

export default function Auth() {
  const nav = useNavigate();
  const loc = useLocation();
  const redirect = new URLSearchParams(loc.search).get("redirect") || "/admin/gallery";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", full_name: "" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav(redirect, { replace: true });
    });
  }, [nav, redirect]);

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("Welcome back"); nav(redirect, { replace: true }); }
  };

  const onSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.full_name }, emailRedirectTo: window.location.origin + "/auth" }
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Check your email to confirm your account");
  };

  const onGoogle = async () => {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + redirect });
    if (r.error) toast.error(r.error.message || "Sign-in failed");
  };

  return (
    <div className="min-h-[80vh] grid place-items-center px-4 py-12">
      <div className="w-full max-w-md glass border border-border/60 rounded-2xl p-8 shadow-[0_0_60px_hsl(var(--primary)/0.15)]">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-xs text-gold uppercase tracking-[0.2em] mb-2"><Sparkles className="h-3 w-3"/> IMI Gallery Studio</div>
          <h1 className="font-display text-3xl">Sign in to continue</h1>
          <p className="text-sm text-muted-foreground mt-1">Upload, organize and showcase IMI's creative work.</p>
        </div>

        <Button onClick={onGoogle} variant="outline" className="w-full mb-4">
          Continue with Google
        </Button>
        <div className="relative my-4 text-center text-xs text-muted-foreground">
          <span className="bg-card px-2">or use email</span>
          <div className="absolute inset-x-0 top-1/2 h-px bg-border -z-10" />
        </div>

        <Tabs defaultValue="signin">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={onSignIn} className="space-y-3 mt-4">
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></div>
              <div><Label>Password</Label><Input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/></div>
              <Button disabled={loading} className="w-full"><LogIn className="h-4 w-4 mr-2"/>Sign In</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={onSignUp} className="space-y-3 mt-4">
              <div><Label>Full name</Label><Input value={form.full_name} onChange={e=>setForm({...form,full_name:e.target.value})}/></div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></div>
              <div><Label>Password</Label><Input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/></div>
              <Button disabled={loading} className="w-full"><UserPlus className="h-4 w-4 mr-2"/>Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-gold">← Back to IMI Technologies</Link>
        </div>
      </div>
    </div>
  );
}
