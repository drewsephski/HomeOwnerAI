-- Update RLS policies for users table to use clerk_user_id directly
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (clerk_user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (clerk_user_id = auth.uid()::text);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (clerk_user_id = auth.uid()::text);
