'use client'

import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useAuth } from '@/contexts/auth-context'
import { Bolt } from 'lucide-react'

export const UserNav = () => {
  const { user, signOut } = useAuth()
  const router = useRouter()

  return (
    <div className="flex gap-3 items-center ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Bolt />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex flex-col">
        <span className="font-semibold">{user?.name}</span>
        <span className="font-normal text-xs -mt-1">@{user?.username}</span>
      </div>
    </div>
  )
}
