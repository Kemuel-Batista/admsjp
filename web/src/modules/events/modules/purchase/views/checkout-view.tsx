'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, CircleUser, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import { GetEventBySlugService } from '@/modules/events/services/get-event-by-slug'
import { maskEventDate } from '@/utils/masks'

import { GetEventAddressByEventIdService } from '../../event-address/services/get-event-address-by-event-id'
import {
  CompleteEventTicketInfoFormData,
  completeEventTicketInfoSchema,
} from '../../tickets/schemas/complete-ticket-info-schema'
import { CompleteEventTicketInfoService } from '../../tickets/services/complete-event-ticket-info'
import { CheckoutLoading } from '../components/checkout-loading'
import { PurchaseCountdown } from '../components/purchase-countdown'
import { ListEventPurchasesUnexpired } from '../services/list-event-purchases-unexpired'
import { EventPurchaseInfo } from '../types/event-purchase-info'
import { EventTicketWithLot } from '../types/event-ticket-with-lot'
import { CheckoutSummaryView } from './checkout-summary-view'

interface EventCheckoutViewProps {
  slug: string
}

export function EventCheckoutView({ slug }: EventCheckoutViewProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setIsLoading] = useState(false)

  const { data, isLoading: isLoadingEvent } = GetEventBySlugService(slug)
  const event = data?.event

  const { data: addressResult, isLoading: isLoadingAddress } =
    GetEventAddressByEventIdService(event?.id)
  const address = addressResult?.eventAddress

  const { data: purchasesResult, isLoading: isLoadingPurchases } =
    ListEventPurchasesUnexpired({
      allRecords: true,
    })
  const purchases = purchasesResult?.eventPurchases || []

  const isLoading = isLoadingEvent || isLoadingAddress || isLoadingPurchases

  let tickets: EventTicketWithLot[] = []

  purchases.forEach((purchase) => {
    tickets = purchase.eventTickets
  })

  const form = useForm<CompleteEventTicketInfoFormData>({
    resolver: zodResolver(completeEventTicketInfoSchema),
    defaultValues: {
      data: tickets.map((ticket) => ({
        id: ticket.id,
        eventPurchaseId: ticket.eventPurchaseId,
        email: ticket.email,
        cpf: ticket.cpf,
        birthday: new Date(ticket.birthday),
        eventLotName: ticket.eventLot.name,
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'data',
  })

  useEffect(() => {
    form.reset({
      data: tickets.map((ticket) => ({
        id: ticket.id,
        eventPurchaseId: purchases[0].id,
        email: ticket.email,
        cpf: ticket.cpf,
        birthday: new Date(ticket.birthday),
        eventLotName: ticket.eventLot.name,
      })),
    })
  }, [tickets, form])

  const { mutateAsync } = CompleteEventTicketInfoService()

  async function onSubmit(data: CompleteEventTicketInfoFormData) {
    setIsLoading(true)

    await mutateAsync(data, {
      onSuccess: () => {
        const eventPurchaseInfo: EventPurchaseInfo = {
          eventPurchaseId: purchases[0].id,
          title: event?.title ?? '',
          pixKey: event?.pixKey ?? '',
          pixType: event?.pixType ?? 0,
          slug: event?.slug ?? '',
          eventId: purchases[0].eventId,
          expiresAt: purchases[0].expiresAt,
          eventTickets: purchases[0].eventTickets,
        }

        setCookie('admsjp.event-purchase', JSON.stringify(eventPurchaseInfo), {
          expires: new Date(purchases[0].expiresAt),
          sameSite: true,
        })

        setTimeout(() => {
          router.push(`/events/${slug}/checkout/payment`)
        }, 3000)
      },
    })
  }

  if (isLoading) {
    return <CheckoutLoading />
  }

  return (
    <Form {...form}>
      <div className="flex items-center justify-center h-12 bg-popover-foreground">
        <Label className="text-popover">ADMSJP</Label>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-[10fr_4fr] px-24 p-6 gap-4 mobile:px-12 mobile:grid-cols-1"
      >
        <main>
          <div className="flex flex-col gap-4 justify-center">
            <Label className="text-3xl font-bold mobile:text-xl">
              {event?.title}
            </Label>
            <div className="flex gap-2 mobile:flex-col">
              <CalendarIcon size={24} className="mobile:hidden" />
              <Label className="text-base font-normal mobile:text-sm">
                {maskEventDate(event?.initialDate)}
              </Label>
              <Label className="text-base font-normal mobile:text-sm mobile:hidden">
                {'>'}
              </Label>
              <Label className="text-base font-normal mobile:text-sm">
                {maskEventDate(event?.finalDate)}
              </Label>
            </div>
            {address && (
              <div className="flex gap-2">
                <MapPin size={24} />
                <Label className="text-base font-normal mobile:text-xs">
                  Evento presencial em {address.street}, {address.number} -{' '}
                  {address.neighborhood}
                </Label>
              </div>
            )}
          </div>
          <Separator className="my-10" />
          <div className="flex flex-col gap-2">
            <Label className="text-base font-semibold">
              Os comprovantes serão enviados para:
            </Label>
            <Card>
              <CardContent className="flex flex-row items-center pt-0 p-3 gap-4">
                <Avatar>
                  <AvatarImage src={user.photo} />
                  <AvatarFallback>
                    <CircleUser className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <Label className="font-normal">{user.name}</Label>
                  <Label className="font-normal">{user.email}</Label>
                </div>
              </CardContent>
            </Card>
            <p className="text-xs">
              Os comprovantes serão enviados por e-mail, você também poderá
              acessar seus ingressos na aba Ingressos no site{' '}
            </p>
          </div>
          <div className="grid gap-5 my-10">
            <Label className="text-base font-semibold">
              Preencha as informações dos ingressos
            </Label>
            {fields.map((field, index) => {
              const showShirtSizeSelect =
                field.eventLotName === 'Inscrição EBJ + Camisa UMADSJP'

              return (
                <Collapsible key={field.id} defaultOpen>
                  <CollapsibleTrigger className="w-full text-start border-b-4 p-2 rounded-b-lg">
                    Ingresso {index + 1}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="grid mt-5 gap-4">
                    <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
                      <FormField
                        control={form.control}
                        name={`data.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`data.${index}.email`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input placeholder="E-mail" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mobile:grid-cols-1">
                      <FormField
                        control={form.control}
                        name={`data.${index}.cpf`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="CPF"
                                maxLength={11}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`data.${index}.phone`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Telefone"
                                maxLength={11}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`data.${index}.birthday`}
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
                                  >
                                    {field.value ? (
                                      format(field.value, 'dd LLL, y')
                                    ) : (
                                      <span>Selecione uma data</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  captionLayout="dropdown-buttons"
                                  fromYear={1940}
                                  toYear={2024}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {showShirtSizeSelect && (
                      <FormField
                        control={form.control}
                        name={`data.${index}.shirtSize`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tamanho da camisa</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um tamanho de camisa" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PP">PP</SelectItem>
                                  <SelectItem value="P">P</SelectItem>
                                  <SelectItem value="M">M</SelectItem>
                                  <SelectItem value="G">G</SelectItem>
                                  <SelectItem value="GG">GG</SelectItem>
                                  <SelectItem value="XG">XG</SelectItem>
                                  <SelectItem value="XGG">XGG</SelectItem>
                                  <SelectItem value="EG">EG</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </CollapsibleContent>
                </Collapsible>
              )
            })}
          </div>
        </main>
        <div className="flex flex-col gap-2">
          <CheckoutSummaryView tickets={tickets} eventId={event?.id} />
          <PurchaseCountdown
            purchaseId={purchases[0].id}
            expiresAt={purchases.length > 0 ? purchases[0].expiresAt : ''}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Icons.spinner /> : 'Continuar para pagamento'}
        </Button>
      </form>
    </Form>
  )
}
