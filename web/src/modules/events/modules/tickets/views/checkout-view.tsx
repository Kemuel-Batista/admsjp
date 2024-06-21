'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, CircleUser, MapPin } from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { GetEventBySlugService } from '@/modules/events/services/get-event-by-slug'
import { maskEventDate } from '@/utils/masks'

import { GetEventAddressByEventIdService } from '../../event-address/services/get-event-address-by-event-id'
import {
  CompleteEventTicketInfoFormData,
  completeEventTicketInfoSchema,
} from '../schemas/complete-ticket-info-schema'
import { ListEventTicketsUnexpired } from '../services/list-event-tickets-unexpired'
import { CheckoutSummaryView } from './checkout-summary-view'

interface EventCheckoutViewProps {
  slug: string
}

export function EventCheckoutView({ slug }: EventCheckoutViewProps) {
  const { user } = useAuth()
  const { data: ticketsResult } = ListEventTicketsUnexpired({
    allRecords: true,
  })
  const tickets = ticketsResult?.eventTickets || []

  const { data } = GetEventBySlugService(slug)
  const event = data?.event

  const result = GetEventAddressByEventIdService(event?.id)
  const address = result.data?.eventAddress

  const form = useForm<CompleteEventTicketInfoFormData>({
    resolver: zodResolver(completeEventTicketInfoSchema),
    defaultValues: {
      tickets: tickets.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        email: ticket.email,
        cpf: ticket.cpf,
        phone: ticket.phone,
        birthday: ticket.birthday,
      })),
    },
  })

  const { fields } = useFieldArray({
    control: form.control,
    name: 'tickets',
  })

  useEffect(() => {
    form.reset({
      tickets: tickets.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        email: ticket.email,
        cpf: ticket.cpf,
        phone: ticket.phone,
        birthday: ticket.birthday,
      })),
    })
  }, [tickets, form])

  return (
    <Form {...form}>
      <div className="flex items-center justify-center h-12 bg-popover-foreground">
        <Label className="text-popover">ADMSJP</Label>
      </div>
      <form className="grid grid-cols-[10fr_4fr] px-24 p-6">
        <main>
          <div className="flex flex-col gap-4 justify-center">
            <Label className="text-3xl font-bold">{event?.title}</Label>
            <div className="flex gap-2">
              <Calendar size={24} />
              <Label className="text-base font-normal">
                {maskEventDate(event?.initialDate)}
              </Label>
              <Label className="text-base font-normal">{'>'}</Label>
              <Label className="text-base font-normal">
                {maskEventDate(event?.finalDate)}
              </Label>
            </div>
            {address && (
              <div className="flex gap-2">
                <MapPin size={24} />
                <Label className="text-base font-normal">
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
            {fields.map((field, index) => (
              <Collapsible key={field.id} defaultOpen>
                <CollapsibleTrigger className="w-full text-start border border-1 p-2 rounded-lg">
                  Ingresso {index + 1}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-5 gap-2">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`tickets.${index}.name`}
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
                      name={`tickets.${index}.email`}
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

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`tickets.${index}.cpf`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <Input placeholder="CPF" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`tickets.${index}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="Telefone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`tickets.${index}.phone`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de nascimento</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Data de nascimento"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </main>
        <CheckoutSummaryView tickets={tickets} eventId={event?.id} />
      </form>
    </Form>
  )
}
