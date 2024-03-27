import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface RegisterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Register({ className, ...props }: RegisterProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Crie sua conta
        </h1>
        <p className="text-sm text-muted-foreground">
          Preencha o seu email para comerçamos
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Continua com Email
          </Button>
        </div>
      </form>
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button>

      <p className="px-8 text-center text-sm text-muted-foreground">
        Clicando em continue, você concorda com{' '}
        <Link
          to="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Termos de serviço
        </Link>{' '}
        and{' '}
        <Link
          to="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Politícas de privacidade
        </Link>
        .
      </p>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Já possui conta?{' '}
        <Link
          to="/"
          className="underline underline-offset-4 hover:text-primary"
        >
          Acessar conta
        </Link>{' '}
      </p>
    </div>
  )
}
