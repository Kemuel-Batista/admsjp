import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(8),
})

type AuthenticateFormData = z.infer<typeof authenticateBodySchema>

const emails = ['gabriel@umadsjp.com', 'kemuel@umadsjp.com']
const password = '123456'

export function Authenticate() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<AuthenticateFormData>({
    resolver: zodResolver(authenticateBodySchema),
  })

  async function onSubmit(data: AuthenticateFormData) {
    setIsLoading(true)

    if (emails.includes(data.email) && data.password === password) {
      setTimeout(() => {
        setIsLoading(false)
        navigate('/administrators/dashboard')
      }, 3000)
    } else {
      alert('Autenticação errada!')
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Preencha suas informações para acessar a plataforma
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="senha"
                      type="password"
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
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
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{' '}
          Google
        </Button>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Não possui uma conta?{' '}
          <Link
            to="/signup"
            className="underline underline-offset-4 hover:text-primary"
          >
            Criar conta
          </Link>{' '}
        </p>
      </form>
    </Form>
  )
}
