import { supabase } from './client'
import { Database } from './types'

export interface DashboardStats {
  calls_handled: number
  jobs_booked: number
  avg_response_time: number
  revenue: number
}

export interface RecentCall {
  id: string
  caller_name: string
  service_type: string
  status: string
  scheduled_at: string | null
  created_at: string
}

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Get calls handled in last 30 days
  const { count: callsCount } = await supabase
    .from('calls')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', thirtyDaysAgo.toISOString())

  // Get jobs booked in last 30 days
  const { count: jobsCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', thirtyDaysAgo.toISOString())

  // Get average response time (call duration)
  const { data: responseTimes } = await supabase
    .from('calls')
    .select('call_duration')
    .eq('user_id', userId)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .not('call_duration', 'is', null)

  const avgResponseTime = responseTimes && responseTimes.length > 0
    ? responseTimes.reduce((sum, call) => sum + (call.call_duration || 0), 0) / responseTimes.length
    : 0

  // Get revenue from bookings in last 30 days
  const { data: revenueData } = await supabase
    .from('bookings')
    .select('price')
    .eq('user_id', userId)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .eq('status', 'confirmed')

  const revenue = revenueData?.reduce((sum, booking) => sum + booking.price, 0) || 0

  return {
    calls_handled: callsCount || 0,
    jobs_booked: jobsCount || 0,
    avg_response_time: parseFloat(avgResponseTime.toFixed(1)),
    revenue: parseFloat(revenue.toFixed(2))
  }
}

export async function getRecentCalls(userId: string, limit: number = 10): Promise<RecentCall[]> {
  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching recent calls:', error)
    return []
  }

  return data.map(call => ({
    id: call.id,
    caller_name: call.caller_name,
    service_type: call.service_type,
    status: call.status,
    scheduled_at: call.scheduled_at,
    created_at: call.created_at
  }))
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data
}

export async function upsertUserProfile(userId: string, email: string, profile: {
  first_name?: string | null
  last_name?: string | null
  phone?: string | null
  business_name?: string | null
}) {
  console.log('Upserting user profile:', { userId, email, profile });
  
  const { data, error } = await supabase
    .from('users')
    .upsert({
      clerk_user_id: userId,
      email,
      ...profile,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) {
    console.error('Error upserting user profile:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return null
  }

  return data
}

export async function subscribeToCalls(userId: string, callback: (payload: { eventType: string; new: Database['public']['Tables']['calls']['Row']; old: Database['public']['Tables']['calls']['Row'] | null }) => void) {
  const channel = supabase
    .channel('calls-changes')
    .on(
      'postgres_changes' as any,
      {
        event: '*',
        schema: 'public',
        table: 'calls',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()

  return channel
}

export async function subscribeToBookings(userId: string, callback: (payload: { eventType: string; new: Database['public']['Tables']['bookings']['Row']; old: Database['public']['Tables']['bookings']['Row'] | null }) => void) {
  const channel = supabase
    .channel('bookings-changes')
    .on(
      'postgres_changes' as any,
      {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `user_id=eq.${userId}`
      },
      callback
    )
    .subscribe()

  return channel
}