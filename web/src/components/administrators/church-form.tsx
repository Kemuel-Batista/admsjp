import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createChurch } from '@/api/create-church'
import { ChurchDetailsProps } from '@/api/get-church-details'
import { Map } from '@/components/map'
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
import { CepResponse } from '@/interfaces/cep-response'
import { queryClient } from '@/lib/react-query'
import { maskCep } from '@/utils/masks'

import MapDisabled from '../map-disabled'

const ChurchBodySchema = z.object({
  name: z.string({ required_error: 'Nome da igreja não pode estar vazio.' }),
  description: z.string({ required_error: 'Descrição não pode estar vazio.' }),
  street: z.string({ required_error: 'A rua não pode estar vazio' }),
  neighborhood: z.string({ required_error: 'O bairro não pode estar vazio' }),
  postalCode: z.string({ required_error: 'O CEP não pode estar vazio' }),
  number: z.string({ required_error: 'O número não pode estar vazio' }),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

type ChurchFormData = z.infer<typeof ChurchBodySchema>

interface ChurchFormProps {
  church?: ChurchDetailsProps
  formType?: string
}

export function ChurchForm({ church, formType }: ChurchFormProps) {
  const navigate = useNavigate()
  const isChurchFormView = formType === 'view'

  const form = useForm<ChurchFormData>({
    resolver: zodResolver(ChurchBodySchema),
    values: {
      name: church?.name ?? '',
      description: church?.description ?? '',
      postalCode: church?.postalCode ?? '',
      number: church?.number ?? '',
      street: church?.street ?? '',
      neighborhood: church?.neighborhood ?? '',
      latitude: church?.latitude ?? 0,
      longitude: church?.longitude ?? 0,
    },
  })

  const latitude = form.watch('latitude')
  const longitude = form.watch('longitude')

  async function handleGetCepResponse(cep: string) {
    await axios
      .get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        form.setValue('street', response.data.logradouro)
        form.setValue('neighborhood', response.data.bairro)
      })
  }

  async function handlePositionMarkerChange(
    positionMarker: [number, number] | null,
  ) {
    const latitude = positionMarker?.[0]
    const longitude = positionMarker?.[1]

    form.setValue('latitude', latitude ?? 0)
    form.setValue('longitude', longitude ?? 0)
  }

  const { mutateAsync: createChurchFn, isPending } = useMutation({
    mutationFn: createChurch,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['churchs'],
      })

      toast.success('Igreja criada com sucesso!')

      navigate('/administrators/church')
    },
  })

  async function onSubmit(data: ChurchFormData) {
    const latitude = form.watch('latitude')
    const longitude = form.watch('longitude')

    if (!latitude || !longitude) {
      toast.warning('Informe localização da Igreja no mapa!')
    }

    const church = {
      ...data,
      postalCode: data.postalCode.replace(/\D/g, ''),
    }

    await createChurchFn(church)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid grid-cols-[2fr_1fr] gap-2">
          <div className="grid gap-5 grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Igreja</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome da Igreja"
                      autoComplete="off"
                      disabled={isPending || isChurchFormView}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Ex: Sede, São Marcos, Afonso Pena
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descrição"
                      autoComplete="off"
                      disabled={isPending || isChurchFormView}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Ex: AD Sede, AD São Marcos, AD Afonso Pena
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled={isPending || isChurchFormView}
                      {...field}
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
                      disabled={isPending || isChurchFormView}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled={isPending || isChurchFormView}
                      {...field}
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
                      disabled={isPending || isChurchFormView}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isChurchFormView ? (
            <MapDisabled latitude={latitude} longitude={longitude} />
          ) : (
            <Map
              onPositionMarkerChange={handlePositionMarkerChange}
              latitude={latitude}
              longitude={longitude}
            />
          )}
        </div>

        <div className="grid grid-cols-4">
          <div></div>
          <div></div>
          <div></div>
          {!isChurchFormView && (
            <div className="grid grid-cols-2 gap-4">
              <Button type="submit" disabled={isPending || isChurchFormView}>
                Salvar
              </Button>
              <Button
                variant="secondary"
                disabled={isPending || isChurchFormView}
              >
                Voltar
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}
