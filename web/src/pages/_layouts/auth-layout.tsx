import { Outlet } from 'react-router-dom'

import ADMSJPLogo from '@/assets/adlogo.webp'

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-2 antialiased mobile:grid-cols-1">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted/30 p-10 text-muted-foreground">
        <div className="flex items-center mobile:justify-center">
          <img src={ADMSJPLogo} alt="ADMSJP" height="96px" className="h-24" />
        </div>

        <footer className="text-sm mobile:hidden">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Até aqui nos ajudou o senhor&rdquo;
            </p>
            <footer className="text-sm grid grid-cols-1">
              <strong>Pr. Ival Teodoro</strong>
              <label>Pastor Presidente da ADMSJP</label>
            </footer>
          </blockquote>
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  )
}
