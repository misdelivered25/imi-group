
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Tighten always-true write policies
DROP POLICY IF EXISTS "com_insert" ON public.comments;
CREATE POLICY "com_insert" ON public.comments FOR INSERT
  WITH CHECK (length(comment) > 0 AND length(comment) <= 2000);

DROP POLICY IF EXISTS "dl_insert" ON public.downloads;
CREATE POLICY "dl_insert" ON public.downloads FOR INSERT
  WITH CHECK (media_item_id IS NOT NULL);
