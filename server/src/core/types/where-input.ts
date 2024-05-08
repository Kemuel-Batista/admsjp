import {
  Department,
  Event,
  EventAddress,
  EventLot,
  EventTickets,
  Order,
  Profile,
  ProfilePermission,
  User,
  UserToken,
} from '@prisma/client'
import { Prisma } from 'Prisma'

export interface Models {
  User: {
    model: User
    where: Prisma.UserWhereInput
  }
  UserToken: {
    model: UserToken
    where: Prisma.UserTokenWhereInput
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
  EventTickets: {
    model: EventTickets
    where: Prisma.EventTicketsInput
  }
  Order: {
    model: Order
    where: Prisma.OrderInput
  }
}

export type WhereInput<T extends Prisma.ModelName> = Prisma.Models[T]['where']
