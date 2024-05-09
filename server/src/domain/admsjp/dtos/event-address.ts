import { EventAddress } from '@prisma/client'

export interface CreateEventAddressDTO {
  eventId?: EventAddress['eventId']
  street?: EventAddress['street']
  number?: EventAddress['number']
  complement?: EventAddress['complement']
  neighborhood?: EventAddress['neighborhood']
  state?: EventAddress['state']
  city?: EventAddress['city']
  latitude?: EventAddress['latitude']
  longitude?: EventAddress['longitude']
  createdBy?: EventAddress['createdBy']
}

export interface ListEventAddressesDTO {
  eventAddresses: EventAddress[]
  count: number
}

export interface UpdateEventAddressDTO {
  id: EventAddress['id']
  eventId: EventAddress['eventId']
  street: EventAddress['street']
  number: EventAddress['number']
  complement: EventAddress['complement']
  neighborhood: EventAddress['neighborhood']
  state: EventAddress['state']
  city: EventAddress['city']
  latitude: EventAddress['latitude']
  longitude: EventAddress['longitude']
  createdBy: EventAddress['createdBy']
}
