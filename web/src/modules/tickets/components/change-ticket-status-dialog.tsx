import { zodResolver } from '@hookform/resolvers/zod'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Lineaction } from '@/components/datagrid'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { EnumEventTicketStatus } from '../enums/event-ticket-status'
import {
  ChangeEventTicketStatusFormData,
  changeEventTicketStatusSchema,
} from '../schemas/change-event-ticket-status-schema'
import { ChangeEventTicketStatusService } from '../services/change-event-ticket-status'
import { EventTicket } from '../types/event-ticket'

export function ChangeTicketStatusDialog({
  lineaction,
  row,
}: {
  lineaction: Lineaction
  row: Row<EventTicket>
}) {
  const [open, setOpen] = useState(false)

  const { icon: Icon } = lineaction

  const { original: ticket } = row

  const form = useForm<ChangeEventTicketStatusFormData>({
    resolver: zodResolver(changeEventTicketStatusSchema),
    defaultValues: {
      id: ticket.id,
      status: ticket.status,
    },
  })

  const { mutateAsync } = ChangeEventTicketStatusService()

  async function onSubmit(data: ChangeEventTicketStatusFormData) {
    const form = {
      id: data.id,
      status: Number(data.status),
    }

    await mutateAsync(form, {
      onSuccess() {
        toast.success('Ingresso atualizado com sucesso!')
        setOpen(!open)
      },
    })

    setOpen(false)
  }

  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex items-center gap-2 px-2 py-1.5 text-sm">
          {Icon ? (
            <Icon
              style={{
                width: 16,
                height: 16,
              }}
            />
          ) : undefined}
          {lineaction.label}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar status do ingresso?</DialogTitle>
            <DialogDescription>
              Essa ação não pode ser desfeita
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Novo status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                      value={String(field.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tamanho de camisa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={String(EnumEventTicketStatus.NEW)}>
                          Novo
                        </SelectItem>
                        <SelectItem
                          value={String(EnumEventTicketStatus.IN_SEPARATION)}
                        >
                          Em separação
                        </SelectItem>
                        <SelectItem
                          value={String(EnumEventTicketStatus.SEPARATED)}
                        >
                          Separado
                        </SelectItem>
                        <SelectItem
                          value={String(EnumEventTicketStatus.CANCELED)}
                        >
                          Cancelado
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mobile:gap-2">
              <Button onClick={() => setOpen(!open)} variant="secondary">
                Cancelar
              </Button>
              <Button type="submit">Alterar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  )
}
