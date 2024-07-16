import { useEffect, useState } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { maskCurrency } from '@/utils/masks'

import { ListEventLotByEventId } from '../../event-lot/services/list-event-lot-by-event-id'
import { EventLot } from '../../event-lot/types/event-lot'
import { EventTicket } from '../../tickets/types/event-ticket'

interface CheckoutSummaryViewProps {
  eventId?: string
  tickets: EventTicket[]
}

interface EventLotTicket {
  name: string
  value: number
  totalQuantity: number
  totalValue: number
}

export function CheckoutSummaryView({
  eventId,
  tickets,
}: CheckoutSummaryViewProps) {
  const { data, isLoading } = ListEventLotByEventId(
    {
      changeAllRecords: true,
    },
    eventId,
  )

  const eventLots: EventLot[] = data?.eventLots || []
  const [eventLotTickets, setEventLotTickets] = useState<EventLotTicket[]>([])
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    if (isLoading) return

    let accumulatedValue = 0

    const result = eventLots.map((eventLot) => {
      const filteredTickets = tickets.filter(
        (ticket) => ticket.eventLotId === eventLot.id,
      )
      const totalQuantity = filteredTickets.length
      const totalValueForLot = totalQuantity * eventLot.value
      accumulatedValue += totalValueForLot

      return {
        name: eventLot.name,
        value: eventLot.value,
        totalQuantity,
        totalValue: accumulatedValue,
      }
    })

    setTotalValue(accumulatedValue)
    setEventLotTickets(result)
  }, [eventLots])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-52" />
      </div>
    )
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row justify-between items-center bg-primary rounded-t-md p-2">
        <h2 className="text-sm font-bold text-primary-foreground">Resumo</h2>
        <Label className="font-bold text-primary-foreground">
          {maskCurrency(String(totalValue))}
        </Label>
      </CardHeader>
      <CardContent className="p-4">
        {eventLotTickets.map((item, index) => (
          <div key={index}>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-3">
                <Label className="font-normal">{item.name}</Label>
                <Label className="font-bold">
                  {maskCurrency(String(item.value))}
                </Label>
              </div>
              <Label className="text-base">{item.totalQuantity}</Label>
            </div>
            {index !== eventLotTickets.length - 1 && (
              <Separator className="my-5" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
