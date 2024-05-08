import { EventLot } from '@prisma/client'

export interface CreateEventLotDTO {
  eventId: EventLot['eventId']
  quantity: EventLot['quantity']
  lot: EventLot['lot']
  value: EventLot['value']
  status: EventLot['status']
  createdBy: EventLot['createdBy']
}

export interface ListEventLotsDTO {
  eventLots: EventLot[]
  count: number
}

export interface UpdateEventLotDTO {
  id: EventLot['id']
  eventId: EventLot['eventId']
  quantity: EventLot['quantity']
  lot: EventLot['lot']
  value: EventLot['value']
  status: EventLot['status']
  updatedBy: EventLot['updatedBy']
}
