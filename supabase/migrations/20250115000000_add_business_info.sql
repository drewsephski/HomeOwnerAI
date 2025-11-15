-- Create business_info table
CREATE TABLE public.business_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  raw_info TEXT NOT NULL,
  organized_info TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_business_info_user_id ON public.business_info(user_id);
CREATE INDEX idx_business_info_created_at ON public.business_info(created_at);

-- Enable RLS
ALTER TABLE public.business_info ENABLE ROW LEVEL SECURITY;

-- RLS policies for business_info table
CREATE POLICY "Users can view their own business info" ON public.business_info
  FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can insert their own business info" ON public.business_info
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can update their own business info" ON public.business_info
  FOR UPDATE USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can delete their own business info" ON public.business_info
  FOR DELETE USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

-- Create trigger for updated_at
CREATE TRIGGER handle_business_info_updated_at
  BEFORE UPDATE ON public.business_info
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
