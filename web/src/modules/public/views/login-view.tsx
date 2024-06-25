import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { env } from '@/env'

export function LoginView() {
  function handleLoginWithGoogle() {
    window.location.href = `${env.NEXT_PUBLIC_API_URL}/auth/google`
  }

  return (
    <div className="grid min-h-screen grid-cols-2 antialiased mobile:grid-cols-1">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted/30 p-10 text-muted-foreground mobile:hidden">
        <div className="flex items-center mobile:justify-center"></div>

        <footer className="text-sm">
          <blockquote className="space-y-2">
            <footer className="text-sm grid grid-cols-1">
              <strong>Sistema de Eventos</strong>
            </footer>
          </blockquote>
        </footer>
      </div>

      <div className="relative flex flex-col items-center justify-center mobile:p-6">
        <form className="grid gap-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Preencha suas informações para acessar a plataforma
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            onClick={handleLoginWithGoogle}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Não possui uma conta?{' '}
            <Link
              href="/signup"
              className="underline underline-offset-4 hover:text-primary"
            >
              Criar conta
            </Link>{' '}
          </p>
        </form>
      </div>
    </div>
  )
}
