'use client'

import { Calendar, Home } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

import { SidebarItems } from '../types/sidebar-items'
import { SidebarDesktop } from './sidebar-desktop'
import { SidebarMobile } from './sidebar-mobile'

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Home', href: '/admin/dashboard', icon: Home },
    { label: 'Eventos', href: '/admin/events', icon: Calendar },
  ],
}

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  })

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />
  }

  return <SidebarMobile sidebarItems={sidebarItems} />
}
