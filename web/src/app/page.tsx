'use client'

import { useEffect, useState } from 'react'

import { useAuth } from '@/contexts/auth-context'
import { HomeView } from '@/modules/public/views/home-view'

export default function Home() {
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

  return <HomeView />
}
