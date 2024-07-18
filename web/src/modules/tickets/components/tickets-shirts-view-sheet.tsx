import { Layers2, TicketSlash } from 'lucide-react'
import { useState } from 'react'

import { Datagrid, Lineaction } from '@/components/datagrid'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { EventTicketsShirtsColumns } from '../constants/event-tickets-shirts-columns'
import { ListEventTicketsOnlyWithShirtsService } from '../services/list-event-tickets-only-with-shirts'
import { ChangeTicketStatusDialog } from './change-ticket-status-dialog'
import { ConfirmShirtPickup } from './confirm-shirt-pickup'

export function TicketsShirtsViewSheet({
  lineaction,
}: {
  lineaction: Lineaction
}) {
  const [open, setOpen] = useState(false)

  const { icon: Icon } = lineaction

  const lineactions: Lineaction[] = [
    {
      label: 'Alterar status',
      icon: Layers2,
      component: ChangeTicketStatusDialog,
    },
    {
      label: 'Confirmar retirada',
      icon: TicketSlash,
      component: ConfirmShirtPickup,
    },
  ]

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger className="flex items-center gap-2 px-2 py-1.5 text-sm">
        {Icon ? (
          <Icon
            style={{
              width: 16,
              height: 16,
            }}
          />
        ) : undefined}
        {lineaction.label}
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 overflow-y-auto sm:max-w-1/2">
        <SheetHeader>
          <SheetTitle>Listagem de camisas vendidas</SheetTitle>
          <SheetDescription>
            Segue abaixo a listagem de camisas vendidas do evento
          </SheetDescription>
        </SheetHeader>

        <Datagrid
          title="Eventos"
          columns={EventTicketsShirtsColumns()}
          service={ListEventTicketsOnlyWithShirtsService}
          lineactions={lineactions}
          massactions={[]}
          source="/eventTickets"
          module="eventTickets"
          showPagination={true}
        />
      </SheetContent>
    </Sheet>
  )
}
