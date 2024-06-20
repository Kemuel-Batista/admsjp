import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { maskCurrency } from '@/utils/masks'

import { ListEventLotByEventId } from '../services/list-event-lot-by-event-id'

interface ListEventLotsViewProps {
  eventId?: number
}

export function ListEventLotsView({ eventId }: ListEventLotsViewProps) {
  const { data } = ListEventLotByEventId(
    {
      allRecords: true,
    },
    eventId,
  )

  const eventLots = data?.eventLots || []

  return (
    <Card>
      <CardHeader className="bg-primary rounded-md p-3">
        <h2 className="text-lg font-bold text-primary-foreground">Ingressos</h2>
      </CardHeader>
      <CardContent className="p-6">
        {eventLots.map((item, index) => (
          <>
            <div className="flex flex-col gap-5" key={index}>
              <Label className="font-bold">{item.name}</Label>
              <Label>{maskCurrency(String(item.value))}</Label>
            </div>
            {index !== eventLots.length - 1 && <Separator className="my-5" />}
          </>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          Faça login na plataforma para comprar um ingresso
        </Button>
      </CardFooter>
    </Card>
  )
}
