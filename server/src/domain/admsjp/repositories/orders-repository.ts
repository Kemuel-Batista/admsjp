import { Prisma } from '@prisma/client'

export abstract class OrdersRepository {
  abstract create(data: Prisma.OrderUncheckedCreateInput): Promise<void>
}
