'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { upsertUserProfile } from '@/lib/supabase/queries'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userId, isLoaded } = useAuth()
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    if (!isLoaded || !userId || isSyncing) return

    const syncUserWithSupabase = async () => {
      try {
        setIsSyncing(true)
        
        // Get user info from Clerk
        const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user from Clerk')
        }

        const clerkUser = await response.json()
        
        // Sync user with Supabase
        await upsertUserProfile(userId, clerkUser.email_addresses[0].email_address, {
          first_name: clerkUser.first_name,
          last_name: clerkUser.last_name,
          phone: clerkUser.phone_numbers?.[0]?.phone_number || null,
        })
      } catch (error) {
        console.error('Error syncing user with Supabase:', error)
      } finally {
        setIsSyncing(false)
      }
    }

    syncUserWithSupabase()
  }, [userId, isLoaded, isSyncing])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  return <>{children}</>
}