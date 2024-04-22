'use client'

import { GlobalLoad } from '@/components/global-load'
import { useAuth } from '@/contexts/auth-context'
import { ReactNode, useEffect, useState } from 'react'

import { App, AppContent, AppNavbar, AppWrapper } from '@/components/app'
import { Nav } from '@/components/navigation'
import { UserNav } from '@/components/user-nav'

export default function LayoutBase({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)

  const { getMe } = useAuth()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  useEffect(() => {
    getMe()
  }, [])

  return (
    <>
      {loading && <GlobalLoad />}
      <App>
        <AppWrapper>
          <AppNavbar>
            <div className="flex w-full justify-between">
              <div className="flex gap-4 items-center">
                <div className="py-2 flex">
                  <Nav />
                </div>
              </div>
              <div className="p-4">
                <UserNav />
              </div>
            </div>
          </AppNavbar>

          <AppContent>
            <div className="bg-gray-100 px-8 py-10">{children}</div>
          </AppContent>
        </AppWrapper>
      </App>
    </>
  )
}
