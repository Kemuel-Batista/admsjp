'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import Link from 'next/link'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
  })

  async function onSubmit(data: LoginFormData) {
    await authenticate(data)

    router.push('/')
  }

  return (
    <Form {...form}>
      <div className="grid min-h-screen grid-cols-2 antialiased mobile:grid-cols-1">
        <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted/30 p-10 text-muted-foreground">
          <div className="flex items-center mobile:justify-center">
            {/* <img src={ADMSJPLogo} alt="ADMSJP" height="96px" className="h-24" /> */}
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
          <div className="grid gap-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Preencha suas informações para acessar a plataforma
              </p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Username"
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
                            placeholder="Senha"
                            type="password"
                            disabled={isPending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Entrar
                </Button>
              </div>
            </form>
            <p className="px-8 text-center text-sm text-muted-foreground">
              Não possui uma conta?{' '}
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Criar conta
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>
    </Form>
  )
}
