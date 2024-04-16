import { User } from '@prisma/client'
import { Prisma } from 'Prisma'

export interface Models {
  User: {
    model: User
    where: Prisma.UserWhereInput
  }
}

export type WhereInput<T extends Prisma.ModelName> = Prisma.Models[T]['where']
