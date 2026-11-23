import { Link, Navigate, NavLink } from "react-router-dom";
import { FileText, Users, BookUser, Building2, Image, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function WorkspaceLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const auth = useAuth();
  const access = useQuery({ queryKey: ["workspace-access", auth.user?.id], enabled: !!auth.user, queryFn: async () => { const { data, error } = await supabase.from("account_access").select("active").eq("user_id", auth.user?.id || "").maybeSingle(); if (error) throw error; return data?.active ?? true; } });
  if (auth.loading || (auth.user && access.isPending)) return <div className="section container-tight" role="status">Loading workspace…</div>;
  if (!auth.user) return <Navigate to={`/auth?redirect=${encodeURIComponent(window.location.pathname)}`} replace />;
  if (access.error) return <div className="section container-tight">Unable to check account access. <Button onClick={() => access.refetch()}>Retry</Button></div>;
  if (access.data === false) return <div className="section container-tight"><h1>Account inactive</h1><p className="mt-3">Contact your administrator to restore access.</p></div>;
  const links = [{ to: "/admin", label: "Overview", icon: LayoutDashboard }, { to: "/admin/invoices", label: "Invoices", icon: FileText }, { to: "/admin/customers", label: "Customers", icon: BookUser }, { to: "/admin/businesses", label: "Business profiles", icon: Building2 }, ...(auth.isStaff ? [{ to: "/admin/gallery", label: "Media studio", icon: Image }] : []), ...(auth.isAdmin ? [{ to: "/admin/users", label: "Users", icon: Users }] : [])];
  return <div className="workspace"><aside className="workspace-sidebar"><Link to="/admin" className="font-display text-xl px-3 py-4 block">IMI <span className="text-gold">Workspace</span></Link><nav className="space-y-1">{links.map(l => <NavLink end={l.to === "/admin" || l.to === "/admin/invoices"} to={l.to} key={l.to} className={({ isActive }) => `flex gap-3 items-center px-3 py-3 rounded-md text-sm ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}><l.icon className="w-4 h-4" />{l.label}</NavLink>)}</nav><Button variant="ghost" className="mt-6" onClick={async () => { const { error } = await supabase.auth.signOut(); if (error) toast.error(error.message); }}><LogOut className="w-4 h-4 mr-2" />Sign out</Button></aside><div className="workspace-content"><header className="mb-8"><p className="text-xs uppercase text-gold mb-3">IMI GROUP / BUSINESS WORKSPACE</p><h1 className="font-display text-3xl">{title}</h1>{subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}</header>{children}</div></div>;
}