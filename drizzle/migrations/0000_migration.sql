CREATE TABLE public.consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source text NOT NULL DEFAULT 'booking_form' CHECK (source IN ('booking_form','project_advisor')),
  name text NOT NULL CHECK (length(name) BETWEEN 1 AND 200),
  email text NOT NULL CHECK (length(email) BETWEEN 3 AND 320),
  company text CHECK (length(company) <= 200),
  phone text CHECK (length(phone) <= 50),
  interest text CHECK (length(interest) <= 200),
  package text CHECK (length(package) <= 200),
  tier text CHECK (length(tier) <= 100),
  service text CHECK (length(service) <= 200),
  preferred_date text CHECK (length(preferred_date) <= 50),
  notes text CHECK (length(notes) <= 5000),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.consultation_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.consultation_requests TO authenticated;
GRANT ALL ON public.consultation_requests TO service_role;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY cr_public_insert ON public.consultation_requests FOR INSERT TO anon, authenticated WITH CHECK (status = 'new');
CREATE POLICY cr_admin_read ON public.consultation_requests FOR SELECT TO authenticated USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY cr_admin_update ON public.consultation_requests FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY cr_admin_delete ON public.consultation_requests FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'::app_role));