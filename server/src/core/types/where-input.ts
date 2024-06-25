import {
  Department,
  Event,
  EventAddress,
  EventLot,
  EventTicket,
  Order,
  Profile,
  ProfilePermission,
  User,
} from '@prisma/client'
import { Prisma } from 'Prisma'

export interface Models {
  User: {
    model: User
    where: Prisma.UserWhereInput
  }
  Profile: {
    model: Profile
    where: Prisma.ProfileInput
  }
  ProfilePermission: {
    model: ProfilePermission
    where: Prisma.ProfilePermissionInput
  }
  Department: {
    model: Department
    where: Prisma.DepartmentInput
  }
  Event: {
    model: Event
    where: Prisma.EventInput
  }
  EventAddress: {
    model: EventAddress
    where: Prisma.EventAddressInput
  }
  EventLot: {
    model: EventLot
    where: Prisma.EventLotInput
  }
  EventTicket: {
    model: EventTicket
    where: Prisma.EventTicketInput
  }
  Order: {
    model: Order
    where: Prisma.OrderInput
  }
}

export type WhereInput<T extends Prisma.ModelName> = Prisma.Models[T]['where']
