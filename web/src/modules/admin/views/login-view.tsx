'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import {
  AuthUserFormData,
  authUserSchema,
} from '@/modules/user/schemas/auth-user-schema'

export function LoginAdminView() {
  const router = useRouter()
  const { signIn } = useAuth()

  const form = useForm<AuthUserFormData>({
    resolver: zodResolver(authUserSchema),
  })

  const { mutateAsync, isPending } = useMutation<
    unknown,
    unknown,
    AuthUserFormData
  >({
    mutationFn: signIn,
  })

  async function onSubmit(form: AuthUserFormData) {
    await mutateAsync(form, {
      onSuccess: () => {
        router.push('/')
      },
    })
  }

  return (
    <Form {...form}>
      <div className="grid min-h-screen grid-cols-2 antialiased mobile:grid-cols-1">
        <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted/30 p-10 text-muted-foreground">
          <div className="flex items-center mobile:justify-center"></div>

          <footer className="text-sm mobile:hidden">
            <blockquote className="space-y-2">
              <footer className="text-sm grid grid-cols-1">
                <strong>Sistema de Eventos</strong>
              </footer>
            </blockquote>
          </footer>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="name.umadsjp"
                          type="text"
                          autoCapitalize="none"
                          autoComplete="off"
                          autoCorrect="off"
                          disabled={isPending}
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
                          autoComplete="off"
                          autoCorrect="off"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={isPending} type="submit">
                {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
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
            <Button variant="outline" type="button" disabled={isPending}>
              {/* {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{' '} */}
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
    </Form>
  )
}
