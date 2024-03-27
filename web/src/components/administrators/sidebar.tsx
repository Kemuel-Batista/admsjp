import { Church, Component, Home, Menu } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { NavLink } from '../nav-link'

export function AdministratorSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="font-medium">
        <Menu size={20} />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="min-h-screen w-1/3 gap-5 p-5 mobile:w-1/2 flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl mobile:text-xl">
            Visão geral
          </SheetTitle>
        </SheetHeader>
        <NavLink to="/administrators/dashboard">
          <Home className="h-4 w-4 self-center" />
          Início
        </NavLink>
        <NavLink to="/administrators/departments">
          <Component className="h-4 w-4 self-center" />
          Departamentos
        </NavLink>
        <NavLink to="/administrators/church">
          <Church className="h-4 w-4" />
          Igrejas
        </NavLink>
      </SheetContent>
    </Sheet>
  )
}
