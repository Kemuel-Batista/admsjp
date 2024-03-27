import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createDepartment } from '@/api/create-department'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { queryClient } from '@/lib/react-query'

const createDepartmentBodySchema = z.object({
  name: z.string({ required_error: 'Informe o nome do departamento' }),
  description: z.string({
    required_error: 'Informe a descrição do departamento',
  }),
})

type CreateDepartmentFormData = z.infer<typeof createDepartmentBodySchema>

export function SaveDepartment() {
  const navigate = useNavigate()

  const form = useForm<CreateDepartmentFormData>({
    resolver: zodResolver(createDepartmentBodySchema),
  })

  const { mutateAsync: createDepartmentFn, isPending } = useMutation({
    mutationFn: createDepartment,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['departments'],
      })

      toast.success('Departamento criado com sucesso!')

      navigate('/administrators/departments')
    },
  })

  async function onSubmit(data: CreateDepartmentFormData) {
    await createDepartmentFn(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex-col space-y-8 p-8"
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Novo departamento
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button disabled={isPending} type="submit">
              Cadastrar
            </Button>
          </div>
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do departamento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome do departamento"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Ex: Jovens, Mulheres, Família</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do departamento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Descrição do departamento"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ex: Departamento de Jovens da ADMSJP
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
