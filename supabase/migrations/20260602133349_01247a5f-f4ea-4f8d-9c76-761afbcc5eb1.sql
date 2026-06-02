
CREATE POLICY "gm_read" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-media');
CREATE POLICY "gm_staff_insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery-media' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor')));
CREATE POLICY "gm_staff_update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery-media' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor')));
CREATE POLICY "gm_staff_delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'gallery-media' AND (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor')));
