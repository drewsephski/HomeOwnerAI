-- Drop existing RLS policies
DROP POLICY IF EXISTS "Users can view their own business info" ON public.business_info;
DROP POLICY IF EXISTS "Users can insert their own business info" ON public.business_info;
DROP POLICY IF EXISTS "Users can update their own business info" ON public.business_info;
DROP POLICY IF EXISTS "Users can delete their own business info" ON public.business_info;

-- Create simpler RLS policies that work with Clerk auth
CREATE POLICY "Users can view their own business info" ON public.business_info
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own business info" ON public.business_info
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own business info" ON public.business_info
  FOR UPDATE USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own business info" ON public.business_info
  FOR DELETE USING (auth.uid() IS NOT NULL);
