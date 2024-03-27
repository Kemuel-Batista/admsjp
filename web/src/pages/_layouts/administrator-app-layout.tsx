import { Outlet } from 'react-router-dom'

import { AdministratorHeader } from '@/components/administrators/header'

export function AdministratorAppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <AdministratorHeader />
      <Outlet />
    </div>
  )
}
