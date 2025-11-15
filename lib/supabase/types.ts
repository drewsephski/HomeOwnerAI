export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          clerk_user_id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          business_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_user_id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          business_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_user_id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          business_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      calls: {
        Row: {
          id: string
          user_id: string
          caller_name: string
          caller_phone: string
          service_type: string
          status: 'pending' | 'booked' | 'scheduled' | 'completed' | 'cancelled'
          call_duration: number | null
          call_recording_url: string | null
          notes: string | null
          scheduled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          caller_name: string
          caller_phone: string
          service_type: string
          status?: 'pending' | 'booked' | 'scheduled' | 'completed' | 'cancelled'
          call_duration?: number | null
          call_recording_url?: string | null
          notes?: string | null
          scheduled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          caller_name?: string
          caller_phone?: string
          service_type?: string
          status?: 'pending' | 'booked' | 'scheduled' | 'completed' | 'cancelled'
          call_duration?: number | null
          call_recording_url?: string | null
          notes?: string | null
          scheduled_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          call_id: string
          service_type: string
          scheduled_at: string
          duration: number
          price: number
          status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
          customer_name: string
          customer_phone: string
          customer_email: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          call_id: string
          service_type: string
          scheduled_at: string
          duration: number
          price: number
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled'
          customer_name: string
          customer_phone: string
          customer_email?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          call_id?: string
          service_type?: string
          scheduled_at?: string
          duration?: number
          price?: number
          status?: 'confirmed' | 'pending' | 'completed' | 'cancelled'
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          user_id: string
          metric_type: 'calls_handled' | 'jobs_booked' | 'avg_response_time' | 'revenue'
          value: number
          period: 'daily' | 'weekly' | 'monthly'
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          metric_type: 'calls_handled' | 'jobs_booked' | 'avg_response_time' | 'revenue'
          value: number
          period: 'daily' | 'weekly' | 'monthly'
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          metric_type?: 'calls_handled' | 'jobs_booked' | 'avg_response_time' | 'revenue'
          value?: number
          period?: 'daily' | 'weekly' | 'monthly'
          date?: string
          created_at?: string
        }
      }
    }
  }
}