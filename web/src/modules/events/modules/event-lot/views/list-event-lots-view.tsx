import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { maskCurrency } from '@/utils/masks'

import { CreateEventPurchaseFormData } from '../../purchase/schemas/create-validation-schema'
import { CreateEventPurchaseService } from '../../purchase/services/create-event-purchase'
import { ListEventLotByEventId } from '../services/list-event-lot-by-event-id'
import { EventLot } from '../types/event-lot'

interface ListEventLotsViewProps {
  eventId?: number
  eventSlug?: string
}

export function ListEventLotsView({
  eventId,
  eventSlug,
}: ListEventLotsViewProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const { data } = ListEventLotByEventId(
    {
      allRecords: true,
    },
    eventId,
  )

  const eventLots: EventLot[] = data?.eventLots || []

  // State variables to keep track of counts and totals
  const [counts, setCounts] = useState<number[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [totalValue, setTotalValue] = useState<number>(0)

  useEffect(() => {
    if (eventLots.length > 0) {
      setCounts(Array(eventLots.length).fill(0))
    }
  }, [eventLots])

  // Event handler to add ticket
  const handleAddTicket = (index: number) => {
    const newCounts = [...counts]
    newCounts[index] += 1
    setCounts(newCounts)
    setTotalCount(totalCount + 1)
    setTotalValue(totalValue + eventLots[index].value)
  }

  // Event handler to remove ticket
  const handleRemoveTicket = (index: number) => {
    if (counts[index] > 0) {
      const newCounts = [...counts]
      newCounts[index] -= 1
      setCounts(newCounts)
      setTotalCount(totalCount - 1)
      setTotalValue(totalValue - eventLots[index].value)
    }
  }

  function handleNavigateToLogin() {
    router.push('/login')
  }

  const { mutateAsync } = CreateEventPurchaseService()

  async function handleCreateEventTickets() {
    const eventLotInfo = eventLots.map((item, index) => ({
      eventLotId: item.id,
      quantity: counts[index],
    }))

    const form: CreateEventPurchaseFormData = {
      eventId: Number(eventId),
      eventLotInfo,
    }

    await mutateAsync(form, {
      onSuccess: () => {
        router.push(`/events/${eventSlug}/checkout`)
      },
    })
  }

  return (
    <Card>
      <CardHeader className="bg-primary rounded-md p-3">
        <h2 className="text-lg font-bold text-primary-foreground">Ingressos</h2>
      </CardHeader>
      <CardContent className="p-6">
        {eventLots.map((item, index) => (
          <>
            <div
              key={index}
              className="flex flex-row justify-between items-center"
            >
              <div className="flex flex-col gap-5">
                <Label className="font-bold">{item.name}</Label>
                <Label>{maskCurrency(String(item.value))}</Label>
              </div>
              {isAuthenticated && (
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleRemoveTicket(index)}
                    className="h-6 w-6"
                  >
                    -
                  </Button>
                  <span>{counts[index]}</span>
                  <Button
                    onClick={() => handleAddTicket(index)}
                    className="h-6 w-6"
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
            {index !== eventLots.length - 1 && <Separator className="my-5" />}
          </>
        ))}
        <div className="mt-5"></div>
      </CardContent>
      <CardFooter>
        {!isAuthenticated && (
          <Button variant="outline" onClick={handleNavigateToLogin}>
            Faça login na plataforma para comprar um ingresso
          </Button>
        )}

        {isAuthenticated && totalCount === 0 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleNavigateToLogin}
          >
            Selecione uma inscrição
          </Button>
        )}

        {isAuthenticated && totalCount > 0 && (
          <div className="flex flex-row justify-between w-full items-center gap-2">
            <div className="grid grid-rows-2 gap-1 w-full">
              <Label className="font-medium text-sm text-muted-foreground">
                Total
              </Label>
              <Label className="font-bold text-base">
                {maskCurrency(String(totalValue))}
              </Label>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCreateEventTickets}
            >
              Realizar inscrição
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
