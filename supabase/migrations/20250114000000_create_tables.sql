-- Create users table
CREATE TABLE public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  business_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create calls table
CREATE TABLE public.calls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  caller_name TEXT NOT NULL,
  caller_phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'booked', 'scheduled', 'completed', 'cancelled')),
  call_duration INTEGER,
  call_recording_url TEXT,
  notes TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  call_id UUID REFERENCES public.calls(id) ON DELETE CASCADE NOT NULL,
  service_type TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('confirmed', 'pending', 'completed', 'cancelled')),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE public.analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('calls_handled', 'jobs_booked', 'avg_response_time', 'revenue')),
  value DECIMAL(15,2) NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly')),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_calls_user_id ON public.calls(user_id);
CREATE INDEX idx_calls_created_at ON public.calls(created_at);
CREATE INDEX idx_calls_status ON public.calls(status);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_created_at ON public.bookings(created_at);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_analytics_user_id ON public.analytics(user_id);
CREATE INDEX idx_analytics_metric_type ON public.analytics(metric_type);
CREATE INDEX idx_analytics_date ON public.analytics(date);

-- Create RLS (Row Level Security) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (clerk_user_id = auth.uid()::text);

CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (clerk_user_id = auth.uid()::text);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (clerk_user_id = auth.uid()::text);

-- RLS policies for calls table
CREATE POLICY "Users can view their own calls" ON public.calls
  FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can insert their own calls" ON public.calls
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can update their own calls" ON public.calls
  FOR UPDATE USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can delete their own calls" ON public.calls
  FOR DELETE USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

-- RLS policies for bookings table
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can insert their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can delete their own bookings" ON public.bookings
  FOR DELETE USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

-- RLS policies for analytics table
CREATE POLICY "Users can view their own analytics" ON public.analytics
  FOR SELECT USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can insert their own analytics" ON public.analytics
  FOR INSERT WITH CHECK (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can update their own analytics" ON public.analytics
  FOR UPDATE USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

CREATE POLICY "Users can delete their own analytics" ON public.analytics
  FOR DELETE USING (user_id = (SELECT id FROM public.users WHERE clerk_user_id = auth.uid()::text));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_calls_updated_at
  BEFORE UPDATE ON public.calls
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_analytics_updated_at
  BEFORE UPDATE ON public.analytics
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();