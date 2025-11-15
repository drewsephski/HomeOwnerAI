'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { upsertUserProfile } from '@/lib/supabase/queries'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { userId, isLoaded } = useAuth()
  const { user } = useUser()
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    if (!isLoaded || !userId || isSyncing || !user) return

    const syncUserWithSupabase = async () => {
      try {
        setIsSyncing(true)
        
        // Get user info from Clerk user object
        const emailAddress = user.primaryEmailAddress?.emailAddress
        const firstName = user.firstName
        const lastName = user.lastName
        const phoneNumber = user.primaryPhoneNumber?.phoneNumber
        
        if (!emailAddress) {
          throw new Error('No email address found')
        }
        
        // Sync user with Supabase
        await upsertUserProfile(userId, emailAddress, {
          first_name: firstName,
          last_name: lastName,
          phone: phoneNumber || null,
        })
      } catch (error) {
        console.error('Error syncing user with Supabase:', error)
      } finally {
        setIsSyncing(false)
      }
    }

    syncUserWithSupabase()
  }, [userId, isLoaded, isSyncing, user])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  return <>{children}</>
}