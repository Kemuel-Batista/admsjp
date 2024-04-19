'use client'

import { AppProvider } from '@/contexts/app-context'
import { AuthProvider } from '@/contexts/auth-context'
import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>{children}</AppProvider>
        <Toaster
          richColors
          duration={2000}
          position="bottom-center"
          closeButton={false}
        />
      </AuthProvider>
    </QueryClientProvider>
  )
}
