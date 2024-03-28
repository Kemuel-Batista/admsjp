import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { CalendarIcon, Trash2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ChurchLeaderProps } from '@/api/get-church-details'
import { saveChurchLeaders } from '@/api/save-church-leaders'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { queryClient } from '@/lib/react-query'
import { cn } from '@/lib/utils'
import { maskPhone } from '@/utils/masks'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const SaveChurchLeadersFormSchema = z.object({
  leaders: z.array(
    z.object({
      name: z.string(),
      email: z.string().email(),
      functionName: z.string(),
      phone: z.string(),
      birthday: z.date({ required_error: 'Selecione a data de nascimento' }),
    }),
  ),
})

type SaveChurchLeadersFormData = z.infer<typeof SaveChurchLeadersFormSchema>

interface ChurchLeadersInterfaceProps {
  churchId?: string
  leaders: ChurchLeaderProps[]
  formType: string
}

export function ChurchLeaders({
  churchId,
  leaders,
  formType,
}: ChurchLeadersInterfaceProps) {
  const isChurchFormView = formType === 'view'

  const form = useForm<SaveChurchLeadersFormData>({
    resolver: zodResolver(SaveChurchLeadersFormSchema),
    values: {
      leaders: leaders.map((leader) => ({
        ...leader,
        birthday: new Date(leader.birthday),
      })),
    },
  })

  const control = form.control

  const { fields, append } = useFieldArray({
    control,
    name: 'leaders',
  })

  function handleAddMember() {
    append({
      name: '',
      email: '',
      phone: '',
      birthday: new Date(),
      functionName: '',
    })
  }

  function handleRemoveMember(index: number) {
    const currentValues = form.getValues()

    form.setValue(
      'leaders',
      currentValues.leaders.filter((_, idx) => idx !== index),
    )
  }

  const { mutateAsync: saveChurchLeadersFn, isPending } = useMutation({
    mutationFn: saveChurchLeaders,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['church_details'],
      })

      toast.success('Liderança atualizada com sucesso!')
    },
  })

  async function onSubmit(data: SaveChurchLeadersFormData) {
    const leadersInfo = {
      churchId,
      leaders: data.leaders,
    }

    await saveChurchLeadersFn(leadersInfo)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 mt-3">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h4 className="text-base tracking-tight">
              Lista de líderes da congregação
            </h4>
          </div>
          {!isChurchFormView && (
            <div className="flex items-center space-x-2">
              <Button onClick={handleAddMember}>Adicionar novo membro</Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-[29fr_1fr]">
          <div className="grid grid-cols-5 gap-2">
            <Label>Nome</Label>
            <Label>Email</Label>
            <Label>Função na Igreja</Label>
            <Label>Número de celular</Label>
            <Label>Data de nascimento</Label>
          </div>
        </div>

        {fields.map((field, index) => {
          return (
            <div className="grid grid-cols-[29fr_1fr] gap-2" key={field.id}>
              <div className="grid grid-cols-5 gap-2">
                <FormField
                  control={form.control}
                  name={`leaders.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nome"
                          autoComplete="off"
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
                  name={`leaders.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          autoComplete="off"
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
                  name={`leaders.${index}.functionName`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Função na igreja" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="PR">Pastor</SelectItem>
                          <SelectItem value="EV">Evangelista</SelectItem>
                          <SelectItem value="PB">Presbitero</SelectItem>
                          <SelectItem value="DC">Diacono</SelectItem>
                          <SelectItem value="CP">Cooperador (a)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`leaders.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Telefone"
                          autoComplete="off"
                          maxLength={15}
                          disabled={isPending}
                          {...field}
                          onChange={(event) =>
                            field.onChange(maskPhone(event.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`leaders.${index}.birthday`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              disabled={isPending}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground',
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'dd LLL, y')
                              ) : (
                                <span>Selecione a data de nascimento</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {!isChurchFormView && (
                <Button
                  variant="destructive"
                  className="w-fit"
                  disabled={isPending}
                  onClick={() => handleRemoveMember(index)}
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          )
        })}

        {!isChurchFormView && (
          <Button disabled={isPending} type="submit">
            Salvar alterações
          </Button>
        )}
      </form>
    </Form>
  )
}
