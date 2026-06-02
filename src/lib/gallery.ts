import { supabase } from "@/integrations/supabase/client";

export const BUCKET = "gallery-media";

export async function getSignedUrl(path: string, expiresIn = 3600): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, expiresIn);
  return data?.signedUrl ?? null;
}

export async function uploadFile(file: File, folder = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
