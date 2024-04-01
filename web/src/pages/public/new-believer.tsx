import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { fetchChurchs } from '@/api/fetch-churchs'
import { getCities, getStates } from '@/api/ibge'
import { saveNewBeliever } from '@/api/save-new-believer'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CepResponse } from '@/interfaces/cep-response'
import { cn } from '@/lib/utils'
import { maskCep, maskPhone } from '@/utils/masks'

const createNewBelieverBodySchema = z.object({
  churchId: z.string().uuid(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email().optional(),
  birthday: z.string().transform((arg) => new Date(arg)),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  number: z.string(),
  lgpd: z.boolean(),
})

type CreateNewBelieverFormData = z.infer<typeof createNewBelieverBodySchema>

export function NewBeliever() {
  const form = useForm<CreateNewBelieverFormData>({
    resolver: zodResolver(createNewBelieverBodySchema),
  })

  const { data: result } = useQuery({
    queryKey: ['churchs'],
    queryFn: () => fetchChurchs(),
  })

  const churchs = result?.churchs || []

  const { data: states } = useQuery({
    queryKey: ['list_states'],
    queryFn: () => getStates(),
  })
  const ufs = states || []

  const state = form.watch('state')
  const { data } = useQuery({
    queryKey: ['list_cities', state],
    queryFn: () => getCities(state),
  })
  const cities = data || []

  async function handleGetCepResponse(cep: string) {
    await axios
      .get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        form.setValue('street', response.data.logradouro)
        form.setValue('neighborhood', response.data.bairro)
      })
  }

  const { mutateAsync: saveNewBelieverFn, isPending } = useMutation({
    mutationFn: saveNewBeliever,
    onSuccess() {
      toast.success('Novo convertido cadastrado com sucesso!')
    },
  })

  async function onSubmit(data: CreateNewBelieverFormData) {
    await saveNewBelieverFn(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex-col space-y-4 p-8"
      >
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nome"
                    autoComplete="off"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sobrenome"
                    autoComplete="off"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mobile:grid-cols-1">
          <FormField
            control={form.control}
            name="churchId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Igreja mais próxima</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a igreja mais próxima" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <ScrollArea className="h-[120px]">
                      {churchs?.map((option) => (
                        <SelectItem key={option.id} value={option.name}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                        disabled={isPending}
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mobile:grid-cols-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    autoComplete="off"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Telefone"
                    autoComplete="off"
                    maxLength={15}
                    {...field}
                    disabled={isPending}
                    onChange={(event) =>
                      field.onChange(maskPhone(event.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 mobile:grid-cols-2">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CEP"
                    autoComplete="off"
                    maxLength={9}
                    {...field}
                    disabled={isPending}
                    onChange={(event) =>
                      field.onChange(maskCep(event.target.value))
                    }
                    onBlur={(e) => handleGetCepResponse(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Número do endereço"
                    autoComplete="off"
                    maxLength={6}
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Bairro"
                    autoComplete="off"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input
                  placeholder="Rua"
                  autoComplete="off"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ufs.map((uf) => (
                      <SelectItem key={uf} value={uf}>
                        {uf}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.nome}>
                        {city.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="lgpd"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Aceita receber notificações via WhatsApp?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Salvar novo convertido
        </Button>
      </form>
    </Form>
  )
}
