-- Add clerk_user_id column to business_info table
ALTER TABLE public.business_info ADD COLUMN clerk_user_id TEXT;

-- Update existing records (if any) with a placeholder
UPDATE public.business_info SET clerk_user_id = 'temp' WHERE clerk_user_id IS NULL;

-- Make the column NOT NULL
ALTER TABLE public.business_info ALTER COLUMN clerk_user_id SET NOT NULL;

-- Create index for clerk_user_id
CREATE INDEX idx_business_info_clerk_user_id ON public.business_info(clerk_user_id);

-- Update RLS policies to use clerk_user_id
DROP POLICY IF EXISTS "Users can view their own business info" ON public.business_info;
DROP POLICY IF EXISTS "Users can insert their own business info" ON public.business_info;
DROP POLICY IF EXISTS "Users can update their own business info" ON public.business_info;
DROP POLICY IF EXISTS "Users can delete their own business info" ON public.business_info;

CREATE POLICY "Users can view their own business info" ON public.business_info
  FOR SELECT USING (clerk_user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own business info" ON public.business_info
  FOR INSERT WITH CHECK (clerk_user_id = auth.uid()::text);

CREATE POLICY "Users can update their own business info" ON public.business_info
  FOR UPDATE USING (clerk_user_id = auth.uid()::text);

CREATE POLICY "Users can delete their own business info" ON public.business_info
  FOR DELETE USING (clerk_user_id = auth.uid()::text);
