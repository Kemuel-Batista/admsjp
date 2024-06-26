import { Event, Prisma, User } from '@prisma/client'

export interface Models {
  User: {
    model: User
    where: Prisma.UserWhereInput
  }
  Event: {
    model: Event
    where: Prisma.EventWhereInput
  }
}

export type WhereInput<T extends keyof Models> = Models[T]['where']
