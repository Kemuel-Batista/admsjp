import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Trash2 } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { cn } from '@/lib/utils'
import { maskPhone } from '@/utils/masks'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const SaveChurchDepartmentMemberFormSchema = z.object({
  members: z.array(
    z.object({
      name: z.string(),
      email: z.string().email(),
      functionName: z.string(),
      subFunction: z.string(),
      phone: z.string(),
      birthday: z.date({ required_error: 'Selecione a data de nascimento' }),
    }),
  ),
})

type SaveChurchDepartmentMemberFormData = z.infer<
  typeof SaveChurchDepartmentMemberFormSchema
>

export function ChurchDeparmentMembers() {
  const form = useForm<SaveChurchDepartmentMemberFormData>({
    resolver: zodResolver(SaveChurchDepartmentMemberFormSchema),
  })

  const control = form.control

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  })

  function handleAddMember() {
    append({
      name: '',
      email: '',
      phone: '',
      birthday: new Date(),
      functionName: '',
      subFunction: '',
    })
  }

  function handleRemoveMember(index: number) {
    remove(index)
  }

  return (
    <Form {...form}>
      <div className="grid gap-5 p-1">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h4 className="text-base font-medium tracking-tight">Liderança</h4>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleAddMember}>Adicionar novo membro</Button>
          </div>
        </div>

        <div className="grid grid-cols-[29fr_1fr]">
          <div className="grid grid-cols-6 gap-2">
            <Label>Nome</Label>
            <Label>Email</Label>
            <Label>Função na Igreja</Label>
            <Label>Função no Departamento</Label>
            <Label>Número de celular</Label>
            <Label>Data de nascimento</Label>
          </div>
        </div>

        {fields.map((field, index) => {
          return (
            <div className="grid grid-cols-[29fr_1fr] gap-2" key={field.id}>
              <div className="grid grid-cols-6 gap-2">
                <FormField
                  control={form.control}
                  name={`members.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nome"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`members.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`members.${index}.functionName`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
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
                  name={`members.${index}.subFunction`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Função no departamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="LD">Líder</SelectItem>
                          <SelectItem value="VL">Vice Líder</SelectItem>
                          <SelectItem value="PS">
                            Primeiro Secretário
                          </SelectItem>
                          <SelectItem value="SS">Segundo Secretário</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`members.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Telefone"
                          autoComplete="off"
                          maxLength={15}
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
                  name={`members.${index}.birthday`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
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
              <Button
                variant="destructive"
                className="w-fit"
                onClick={() => handleRemoveMember(index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          )
        })}
      </div>
    </Form>
  )
}
