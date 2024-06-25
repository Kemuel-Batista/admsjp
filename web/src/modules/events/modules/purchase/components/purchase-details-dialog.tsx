import { LoaderCircle } from 'lucide-react'

import { Card } from '@/components/ui/card'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuth } from '@/contexts/auth-context'
import { dateTimeFormat } from '@/utils/date-time-format'
import { maskCurrency } from '@/utils/masks'

import { ListEventTicketsByPurchaseIdService } from '../../tickets/services/list-event-tickets-by-purchase-id'
import { EventPurchaseStatus } from '../enums/event-purchase-status'
import { EventPurchaseStatusDescription } from '../interface/event-purchase-status-description'
import { EventPurchaseWithEvent } from '../types/event-purchase-with-event'

interface PurchaseDetailsDialogProps {
  purchase: EventPurchaseWithEvent
}

export function PurchaseDetailsDialog({
  purchase,
}: PurchaseDetailsDialogProps) {
  const { user } = useAuth()

  const { data, isLoading } = ListEventTicketsByPurchaseIdService(
    {},
    purchase.id,
  )
  const eventTickets = data?.eventTickets || []

  const statusKey = Object.keys(EventPurchaseStatus).find(
    (key) =>
      EventPurchaseStatus[key as keyof typeof EventPurchaseStatus] ===
      purchase.status,
  )

  const status =
    EventPurchaseStatus[statusKey as keyof typeof EventPurchaseStatus]

  const statusDescription: EventPurchaseStatusDescription[typeof status] =
    'Novo'

  if (isLoading) {
    return (
      <DialogContent className="flex flex-col w-3/4 max-w-screen mobile:w-full items-center justify-center mobile:h-screen">
        <LoaderCircle size={24} className="text-primary" />
      </DialogContent>
    )
  }

  return (
    <DialogContent className="w-3/4 max-w-screen mobile:w-full">
      <DialogHeader>
        <DialogTitle className="text-start">
          Pedido N° {purchase.invoiceNumber}
        </DialogTitle>
        <DialogDescription className="text-muted-foreground text-start leading-relaxed">
          Enviado às {dateTimeFormat(purchase.createdAt)}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-row justify-between items-center mobile:flex-col mobile:gap-4 mobile:items-start">
        <div className="flex flex-col">
          <Label className="text-base">{user.name}</Label>
          <p className="text-xs">{user.email}</p>
        </div>
        <div className="flex flex-col items-center p-4 gap-4 border border-primary rounded-lg mobile:w-full">
          <Label className="text-muted-foreground">N° DO PEDIDO:</Label>
          <Label className="text-base font-bold">
            {purchase.invoiceNumber}
          </Label>
          <Label>{statusDescription}</Label>
        </div>
      </div>

      <Label className="text-lg font-bold">
        Ingressos comprados neste pedido
      </Label>

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
            </div>
          </Card>
        ))}
      </div>

      <Label className="text-lg font-bold">Resumo da compra</Label>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Ingresso</TableHead>
            <TableHead>Parcipante</TableHead>
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
              <TableCell>{maskCurrency(String(item.eventLot.value))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DialogContent>
  )
}
