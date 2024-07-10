import { Row } from '@tanstack/react-table'
import { CreditCard, Tags } from 'lucide-react'

import { Datagrid, Lineaction } from '@/components/datagrid'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { OrderViewSheet } from '@/modules/orders/components/order-view-sheet'
import { ListEventPurchasesByEventId } from '@/modules/purchase/services/list-event-purchases-by-event-id'
import { TicketsViewSheet } from '@/modules/tickets/components/tickets-view-sheet'

import { Event } from '../../events/types/event'
import { EventPurchasesColumns } from '../constants/event-purchases-columns'

export function EventTicketsSheet({
  lineaction,
  row,
}: {
  lineaction: Lineaction
  row: Row<Event>
}) {
  const { icon: Icon } = lineaction

  const { original: event } = row

  const lineactions: Lineaction[] = [
    {
      label: 'Dados de pagamento',
      icon: CreditCard,
      component: OrderViewSheet,
    },
    {
      label: 'Visualizar ingressos',
      icon: Tags,
      component: TicketsViewSheet,
    },
  ]

  return (
    <Sheet>
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
      <SheetContent className="flex flex-col gap-4 overflow-y-auto sm:max-w-2/3">
        <SheetHeader>
          <SheetTitle>{event.title}</SheetTitle>
          <SheetDescription>
            Lista de compras realizadas do evento
          </SheetDescription>
        </SheetHeader>

        <Datagrid
          title="Eventos"
          columns={EventPurchasesColumns()}
          service={ListEventPurchasesByEventId}
          lineactions={lineactions}
          massactions={[]}
          id={event.id}
          source="/eventPurchases"
          module="eventPurchases"
        />
      </SheetContent>
    </Sheet>
  )
}
