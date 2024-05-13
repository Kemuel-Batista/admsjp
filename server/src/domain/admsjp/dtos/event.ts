import { Event } from '@prisma/client'

import { CreateEventAddressUseCaseRequest } from '../use-cases/event-address/create/create-event-address'
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
  address?: CreateEventAddressUseCaseRequest
  createdBy: Event['createdBy']
}

export interface ListEventDTO {
  events: Event[]
  count: number
}
