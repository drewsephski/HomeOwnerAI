'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import Navigation from '@/components/Navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription, EmptyHeader } from '@/components/ui/empty'
import { Phone, CheckCircle2, Clock, DollarSign, BarChart3, Users, TrendingUp, Activity } from 'lucide-react'
import { getDashboardStats, getRecentCalls, subscribeToCalls, subscribeToBookings } from '@/lib/supabase/queries'
import { RealtimeChannel } from '@supabase/supabase-js'

interface DashboardStats {
  calls_handled: number
  jobs_booked: number
  avg_response_time: number
  revenue: number
}

interface RecentCall {
  id: string
  caller_name: string
  service_type: string
  status: string
  scheduled_at: string | null
  created_at: string
}

const Dashboard = () => {
  const { userId, isLoaded } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    calls_handled: 0,
    jobs_booked: 0,
    avg_response_time: 0,
    revenue: 0
  })
  const [recentCalls, setRecentCalls] = useState<RecentCall[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !userId) return

    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch dashboard stats
        const statsData = await getDashboardStats(userId)
        setStats(statsData)
        
        // Fetch recent calls
        const callsData = await getRecentCalls(userId, 10)
        setRecentCalls(callsData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Set up real-time subscriptions
    let callsChannel: RealtimeChannel, bookingsChannel: RealtimeChannel

    subscribeToCalls(userId, (payload) => {
      console.log('Calls update:', payload)
      // Refresh data when changes occur
      getDashboardStats(userId).then(setStats)
      getRecentCalls(userId, 10).then(setRecentCalls)
    }).then(channel => {
      callsChannel = channel
    })

    subscribeToBookings(userId, (payload) => {
      console.log('Bookings update:', payload)
      // Refresh data when changes occur
      getDashboardStats(userId).then(setStats)
    }).then(channel => {
      bookingsChannel = channel
    })

    return () => {
      if (callsChannel) callsChannel.unsubscribe()
      if (bookingsChannel) bookingsChannel.unsubscribe()
    }
  }, [userId, isLoaded])

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hr ago`
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="animate-pulse">
                <div className="h-10 bg-muted rounded mb-3 w-48"></div>
                <div className="h-4 bg-muted rounded w-32"></div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6 border border-border">
                  <div className="animate-pulse">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <div className="w-5 h-5 bg-muted rounded"></div>
                      </div>
                      <div className="h-5 bg-muted rounded w-16"></div>
                    </div>
                    <div className="h-8 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="border border-border">
              <CardHeader className="pb-4">
                <div className="animate-pulse">
                  <div className="h-6 bg-muted rounded w-40"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-muted rounded-full"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-muted rounded w-32"></div>
                          <div className="h-3 bg-muted rounded w-24"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="h-6 bg-muted rounded-full w-20"></div>
                        <div className="h-4 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  const statsData = [
    { 
      label: "Calls Handled", 
      value: stats.calls_handled.toString(), 
      change: "+18%",
      icon: Phone,
      color: "text-foreground"
    },
    { 
      label: "Jobs Booked", 
      value: stats.jobs_booked.toString(), 
      change: "+23%",
      icon: CheckCircle2,
      color: "text-success"
    },
    { 
      label: "Avg Response Time", 
      value: `${stats.avg_response_time}s`, 
      change: "-0.4s",
      icon: Clock,
      color: "text-info"
    },
    { 
      label: "Revenue Captured", 
      value: formatCurrency(stats.revenue), 
      change: "+31%",
      icon: DollarSign,
      color: "text-success"
    },
  ];

  const hasData = stats.calls_handled > 0 || stats.jobs_booked > 0 || stats.revenue > 0 || recentCalls.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 lg:pb-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 lg:mb-16">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
              <div>
                <h1 className="font-heading text-3xl lg:text-4xl mb-2">Dashboard</h1>
                <p className="text-muted-foreground font-light">
                  Last 30 days
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span>Live updates</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10 lg:mb-16">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className="p-5 lg:p-6 border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20 hover:scale-[1.02] group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-success font-light bg-success/10 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl lg:text-3xl font-heading mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-light">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-4 px-5 lg:px-6 pt-5 lg:pt-6">
                  <CardTitle className="font-heading text-xl lg:text-2xl">Recent Calls</CardTitle>
                </CardHeader>
                <CardContent className="px-5 lg:px-6 pb-5 lg:pb-6">
                  {recentCalls.length > 0 ? (
                    <div className="space-y-0">
                      {recentCalls.map((call) => (
                        <div
                          key={call.id}
                          className="p-4 lg:p-5 border-b border-border last:border-b-0 transition-all duration-200 hover:bg-muted/50"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium mb-1 truncate">{call.caller_name}</div>
                                  <div className="text-sm text-muted-foreground font-light">
                                    {call.service_type}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
                                    {call.status}
                                  </span>
                                  <span className="text-xs text-muted-foreground font-light whitespace-nowrap">
                                    {formatTimeAgo(call.created_at)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Empty className="py-10 lg:py-12">
                      <EmptyMedia variant="icon">
                        <Activity className="w-10 h-10 text-muted-foreground" />
                      </EmptyMedia>
                      <EmptyHeader>
                        <EmptyTitle>No recent activity</EmptyTitle>
                        <EmptyDescription>
                          {stats.calls_handled === 0 && stats.jobs_booked === 0 && stats.revenue === 0
                            ? "Get started by adding your business information and you'll see your calls and bookings appear here."
                            : "No recent calls to display. Your recent calls will appear here as they come in."
                          }
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with additional info */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-3 px-5 lg:px-6 pt-5 lg:pt-6">
                  <CardTitle className="font-heading text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="px-5 lg:px-6 pb-5 lg:pb-6 space-y-3">
                  <div className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">View All Calls</div>
                        <div className="text-xs text-muted-foreground">See your call history</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">Manage Bookings</div>
                        <div className="text-xs text-muted-foreground">Handle scheduled jobs</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-info" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">View Reports</div>
                        <div className="text-xs text-muted-foreground">Analytics & insights</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Stats */}
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-3 px-5 lg:px-6 pt-5 lg:pt-6">
                  <CardTitle className="font-heading text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent className="px-5 lg:px-6 pb-5 lg:pb-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Calls</span>
                    <span className="text-sm font-medium">{stats.calls_handled}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Jobs Booked</span>
                    <span className="text-sm font-medium">{stats.jobs_booked}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Response</span>
                    <span className="text-sm font-medium">{stats.avg_response_time}s</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="text-sm font-medium">{formatCurrency(stats.revenue)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Empty State for No Data */}
          {!hasData && (
            <Card className="border border-border shadow-sm mt-8 lg:mt-12">
              <CardContent className="p-8 lg:p-12">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl lg:text-3xl mb-3">Welcome to your dashboard</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto text-base">
                    Your business activity will appear here once you start receiving calls and bookings.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow">
                      <Users className="w-8 h-8 text-muted-foreground mb-3 mx-auto" />
                      <div className="text-sm font-medium mb-1">Track Customers</div>
                      <div className="text-xs text-muted-foreground">Monitor incoming calls and customer interactions</div>
                    </div>
                    <div className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow">
                      <TrendingUp className="w-8 h-8 text-muted-foreground mb-3 mx-auto" />
                      <div className="text-sm font-medium mb-1">View Analytics</div>
                      <div className="text-xs text-muted-foreground">See performance metrics and business insights</div>
                    </div>
                    <div className="p-5 border border-border rounded-lg hover:shadow-md transition-shadow">
                      <CheckCircle2 className="w-8 h-8 text-muted-foreground mb-3 mx-auto" />
                      <div className="text-sm font-medium mb-1">Manage Bookings</div>
                      <div className="text-xs text-muted-foreground">Handle job scheduling and customer appointments</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
