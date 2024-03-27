import ADMSJPLogo from '@/assets/adlogo.webp'

import { ModeToggle } from '../theme/mode-toggle'
import { Separator } from '../ui/separator'
import { AdministratorAccountMenu } from './account-menu'
import { AdministratorSidebar } from './sidebar'

export function AdministratorHeader() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6 mobile:gap-2">
        <AdministratorSidebar />

        <img src={ADMSJPLogo} alt="ADMSJP" height="56px" className="h-14" />

        <Separator orientation="vertical" className="h-6" />

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <AdministratorAccountMenu />
        </div>
      </div>
    </div>
  )
}
