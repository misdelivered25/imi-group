DROP POLICY IF EXISTS com_read ON public.comments;
CREATE POLICY com_staff_read ON public.comments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role) OR public.has_role(auth.uid(), 'editor'::public.app_role));
DROP POLICY IF EXISTS gm_public_read ON storage.objects;