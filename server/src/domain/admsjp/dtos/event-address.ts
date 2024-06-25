import { EventAddress } from '@prisma/client'

export interface ListEventAddressesDTO {
  eventAddresses: EventAddress[]
  count: number
}
