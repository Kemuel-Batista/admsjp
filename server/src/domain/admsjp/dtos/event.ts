import { Event } from '@prisma/client'

import { CreateEventAddressDTO } from './event-address'
import { CreateEventLotDTO } from './event-lot'

export interface CreateEventDTO {
  title: Event['title']
  slug: Event['slug']
  description: Event['description']
  initialDate: Event['initialDate']
  finalDate: Event['finalDate']
  status: Event['status']
  visible: Event['visible']
  departmentId: Event['departmentId']
  eventType: Event['eventType']
  imagePath: Event['imagePath']
  message?: Event['message']
  lots?: CreateEventLotDTO[]
  address?: CreateEventAddressDTO
  createdBy: Event['createdBy']
}

export interface ListEventDTO {
  events: Event[]
  count: number
}
