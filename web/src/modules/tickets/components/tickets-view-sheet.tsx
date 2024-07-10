import { Row } from '@tanstack/react-table'

import { Lineaction } from '@/components/datagrid'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
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
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EventPurchaseWithOrder } from '@/modules/purchase/types/event-purchase-with-order'
import { maskCurrency } from '@/utils/masks'

import { ListEventTicketsByPurchaseIdService } from '../services/list-event-tickets-by-purchase-id'

export function TicketsViewSheet({
  lineaction,
  row,
}: {
  lineaction: Lineaction
  row: Row<EventPurchaseWithOrder>
}) {
  const { icon: Icon } = lineaction

  const { original: purchase } = row

  const { data } = ListEventTicketsByPurchaseIdService(
    {
      allRecords: true,
    },
    purchase.id,
  )

  const eventTickets = data?.eventTickets || []

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
      <SheetContent className="flex flex-col gap-4 overflow-y-auto sm:max-w-1/2">
        <SheetHeader>
          <SheetTitle>Ingressos da compra</SheetTitle>
          <SheetDescription>
            Segue abaixo os detalhes dos ingressos comprados
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {eventTickets.map((item) => (
            <Card
              className="flex flex-row items-center p-6 gap-10 mobile:flex-col"
              key={item.id}
            >
              <div className="flex flex-col bg-muted p-4 px-12 rounded-lg items-center gap-2">
                <Label className="text-muted-foreground">N° DO INGRESSO:</Label>
                <Label className="text-base font-bold">{item.ticket}</Label>
                <Label className="text-xs font-normal">
                  {item.eventLot.name}
                </Label>
              </div>
              <div className="flex flex-col gap-2">
                <Label>{item.name}</Label>
                <Label>{item.email}</Label>
                {item.shirtSize !== '' && (
                  <Label>Tamanho da Camisa: {item.shirtSize}</Label>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Label className="text-lg font-bold">Resumo da compra</Label>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Ingresso</TableHead>
              <TableHead>Participante</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventTickets.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.ticket}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.eventLot.name}</TableCell>
                <TableCell>
                  {maskCurrency(String(item.eventLot.value))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SheetContent>
    </Sheet>
  )
}
