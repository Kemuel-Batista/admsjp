'use client'

import { setCookie } from 'cookies-next'
import { RefreshCcwIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/auth-context'
import { api } from '@/lib/axios'

export default function EventCheckout({
  params,
}: {
  params: { token: string }
}) {
  const router = useRouter()
  const { getMe } = useAuth()

  useEffect(() => {
    setCookie('nextauth_token', params.token, {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hora em milissegundos
      secure: true, // HTTPS
      sameSite: 'strict',
      path: '/',
    })

    api.defaults.headers.Authorization = `Bearer ${params.token}`

    const timer = setTimeout(() => {
      getMe()

      router.push('/')
    }, 2500)

    return () => clearTimeout(timer)
  }, [params.token])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <RefreshCcwIcon className="text-primary">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="4s"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="5s"
          from="0 0 0"
          to="360 0 0"
          repeatCount="indefinite"
        ></animateTransform>
      </RefreshCcwIcon>
      <Label className="text-xl">Estamos lhe autenticando...</Label>
    </div>
  )
}
