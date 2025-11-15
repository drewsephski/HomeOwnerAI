-- Fix RLS policies for Clerk authentication
-- The issue is that Clerk user IDs are not being properly recognized in RLS policies

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

-- Create new policies that properly handle Clerk authentication
-- These policies will allow users to manage their own profiles based on clerk_user_id

CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (
    clerk_user_id = (
      CASE 
        WHEN auth.uid() IS NOT NULL THEN auth.uid()::text
        WHEN auth.jwt()->>'sub' IS NOT NULL THEN auth.jwt()->>'sub'
        ELSE NULL
      END
    )
  );

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (
    clerk_user_id = (
      CASE 
        WHEN auth.uid() IS NOT NULL THEN auth.uid()::text
        WHEN auth.jwt()->>'sub' IS NOT NULL THEN auth.jwt()->>'sub'
        ELSE NULL
      END
    )
  );

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (
    clerk_user_id = (
      CASE 
        WHEN auth.uid() IS NOT NULL THEN auth.uid()::text
        WHEN auth.jwt()->>'sub' IS NOT NULL THEN auth.jwt()->>'sub'
        ELSE NULL
      END
    )
  );

-- Also enable RLS on the users table if not already enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
