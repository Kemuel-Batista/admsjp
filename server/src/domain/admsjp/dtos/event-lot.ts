import { EventLot } from '@prisma/client'

export interface ListEventLotsDTO {
  eventLots: EventLot[]
  count: number
}
