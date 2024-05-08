import { Event } from '@prisma/client'

import { CreateEventAddressDTO, UpdateEventAddressDTO } from './event-address'
import { CreateEventLotDTO, UpdateEventLotDTO } from './event-lot'

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
  lots: CreateEventLotDTO[]
  address: CreateEventAddressDTO
  createdBy: Event['createdBy']
}

export interface ListEventDTO {
  events: Event[]
  count: number
}

export interface UpdateEventDTO {
  id: Event['id']
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
  lots?: UpdateEventLotDTO[]
  address?: UpdateEventAddressDTO
  updatedBy: Event['updatedBy']
}
