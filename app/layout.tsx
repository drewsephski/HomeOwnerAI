import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth-provider'
import { ThemeProvider } from '@/components/theme-provider'
import Navigation from '@/components/Navigation'

// Make function globally available
declare global {
  interface Window {
    openChatWidget: () => void;
  }
}

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Relay - AI Receptionist',
  description: 'Never miss a call. Never lose a job.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <AuthProvider>
              {children}
            </AuthProvider>
            <Toaster />
            <script dangerouslySetInnerHTML={{
              __html: `
                window.openChatWidget = function() {
                  window.dispatchEvent(new CustomEvent('openChatWidget'));
                }
              `
            }} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
