
-- 1. Profiles: restrict select to owner
DROP POLICY IF EXISTS profiles_select_all ON public.profiles;
CREATE POLICY profiles_select_own ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- 2. Albums: restrict to public + published galleries (staff already covered by alb_staff_write ALL)
DROP POLICY IF EXISTS alb_read ON public.albums;
CREATE POLICY alb_public_read ON public.albums
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.galleries g
      WHERE g.id = albums.gallery_id
        AND g.visibility = 'public'
        AND g.status = 'published'
    )
  );
CREATE POLICY alb_staff_read ON public.albums
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role));

-- 3. Downloads: only authenticated, must be self
DROP POLICY IF EXISTS dl_insert ON public.downloads;
CREATE POLICY dl_insert_self ON public.downloads
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND media_item_id IS NOT NULL);

-- 4. Client preview links: remove public read; will be accessed via SECURITY DEFINER RPC
DROP POLICY IF EXISTS cpl_token_read ON public.client_preview_links;

-- 5. Storage: restrict gallery-media bucket reads
DROP POLICY IF EXISTS gm_read ON storage.objects;
CREATE POLICY gm_staff_read ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'gallery-media'
    AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role))
  );
CREATE POLICY gm_public_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (
    bucket_id = 'gallery-media'
    AND EXISTS (
      SELECT 1 FROM public.media_items mi
      JOIN public.galleries g ON g.id = mi.gallery_id
      WHERE mi.file_url = storage.objects.name
        AND g.visibility = 'public'
        AND g.status = 'published'
    )
  );

-- 6. SECURITY DEFINER RPC: get client preview by token
CREATE OR REPLACE FUNCTION public.get_client_preview(p_token text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_link public.client_preview_links;
  v_gallery public.galleries;
  v_media jsonb;
BEGIN
  SELECT * INTO v_link FROM public.client_preview_links WHERE access_token = p_token;
  IF NOT FOUND THEN RETURN NULL; END IF;
  IF v_link.expires_at IS NOT NULL AND v_link.expires_at < now() THEN
    RETURN jsonb_build_object('expired', true);
  END IF;
  SELECT * INTO v_gallery FROM public.galleries WHERE id = v_link.gallery_id;
  SELECT COALESCE(jsonb_agg(to_jsonb(m.*) ORDER BY m.created_at DESC), '[]'::jsonb)
    INTO v_media FROM public.media_items m WHERE m.gallery_id = v_link.gallery_id;
  RETURN jsonb_build_object(
    'link', jsonb_build_object(
      'id', v_link.id,
      'gallery_id', v_link.gallery_id,
      'client_name', v_link.client_name,
      'comment_allowed', v_link.comment_allowed,
      'download_allowed', v_link.download_allowed,
      'expires_at', v_link.expires_at
    ),
    'gallery', to_jsonb(v_gallery),
    'media', v_media
  );
END;
$$;
REVOKE ALL ON FUNCTION public.get_client_preview(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_client_preview(text) TO anon, authenticated;

-- 7. SECURITY DEFINER RPC: get signed url for a preview media item
CREATE OR REPLACE FUNCTION public.client_preview_can_access(p_token text, p_media_item_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.client_preview_links cpl
    JOIN public.media_items mi ON mi.gallery_id = cpl.gallery_id
    WHERE cpl.access_token = p_token
      AND mi.id = p_media_item_id
      AND (cpl.expires_at IS NULL OR cpl.expires_at > now())
  );
$$;
REVOKE ALL ON FUNCTION public.client_preview_can_access(text, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.client_preview_can_access(text, uuid) TO anon, authenticated;

-- 8. SECURITY DEFINER RPC: insert client comment (enforces comment_allowed + token validity)
CREATE OR REPLACE FUNCTION public.insert_client_comment(
  p_token text,
  p_media_item_id uuid,
  p_user_name text,
  p_comment text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_link public.client_preview_links;
  v_id uuid;
BEGIN
  IF p_comment IS NULL OR length(p_comment) = 0 OR length(p_comment) > 2000 THEN
    RAISE EXCEPTION 'Invalid comment length';
  END IF;
  SELECT * INTO v_link FROM public.client_preview_links WHERE access_token = p_token;
  IF NOT FOUND THEN RAISE EXCEPTION 'Invalid token'; END IF;
  IF v_link.expires_at IS NOT NULL AND v_link.expires_at < now() THEN
    RAISE EXCEPTION 'Token expired';
  END IF;
  IF NOT v_link.comment_allowed THEN
    RAISE EXCEPTION 'Comments not allowed for this preview';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.media_items WHERE id = p_media_item_id AND gallery_id = v_link.gallery_id) THEN
    RAISE EXCEPTION 'Media item not in this gallery';
  END IF;
  INSERT INTO public.comments (media_item_id, user_name, comment)
  VALUES (p_media_item_id, COALESCE(p_user_name, v_link.client_name), p_comment)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;
REVOKE ALL ON FUNCTION public.insert_client_comment(text, uuid, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.insert_client_comment(text, uuid, text, text) TO anon, authenticated;

-- 9. Restrict EXECUTE on internal SECURITY DEFINER helpers
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
