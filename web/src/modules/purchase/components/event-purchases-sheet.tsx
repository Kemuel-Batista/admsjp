import { Row } from '@tanstack/react-table'
import { CreditCard, Tags } from 'lucide-react'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'
import { EventInfo } from '@/modules/events/types/event-info'
import { OrderViewSheet } from '@/modules/orders/components/order-view-sheet'
import { ListEventPurchasesByEventId } from '@/modules/purchase/services/list-event-purchases-by-event-id'
import { TicketsViewSheet } from '@/modules/tickets/components/tickets-view-sheet'

import { EventPurchasesColumns } from '../constants/event-purchases-columns'

export function EventTicketsSheet({
  lineaction,
  row,
}: {
  lineaction: Lineaction
  row: Row<EventInfo>
}) {
  const [open, setOpen] = useState(false)

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
      <SheetContent className="flex flex-col gap-4 overflow-y-auto sm:max-w-2/3">
        <SheetHeader>
          <SheetTitle>{event.title}</SheetTitle>
          <SheetDescription>
            Lista de compras realizadas do evento
          </SheetDescription>

          <div className="flex items-center justify-between w-full px-6 py-4 !border-gray-300 border-[1px] border-b-0 rounded-t-lg">
            <h2 className="text-lg font-medium">Informações</h2>
          </div>

          <Table className="border-gray-300 border-[1px]">
            <TableBody className="border-[1px] border-b-0">
              <TableRow>
                <TableHead className="w-1/3">Total de compras</TableHead>
                <TableCell className="!border-b-[1px] !border-r-[1px] !bg-gray-100 !py-3 !px-6">
                  {event.qtyPurchases}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-1/3">Total de ingressos</TableHead>
                <TableCell className="!border-b-[1px] !border-r-[1px] !bg-gray-100 !py-3 !px-6">
                  {event.qtyTickets}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
          showPagination={true}
        />
      </SheetContent>
    </Sheet>
  )
}
