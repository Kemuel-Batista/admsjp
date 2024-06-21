import { EventPurchase, Prisma } from '@prisma/client'

import { IListOptions } from '@/core/repositories/list-options'

import { EventPurchaseWithEvent } from '../types/event-purchase'

export abstract class EventPurchasesRepository {
  abstract create(
    data: Prisma.EventPurchaseUncheckedCreateInput,
  ): Promise<EventPurchase>

  abstract save(data: EventPurchase): Promise<EventPurchase>
  abstract list(options?: IListOptions): Promise<EventPurchase[]>
  abstract listByBuyerId(
    buyerId: EventPurchase['buyerId'],
    options?: IListOptions,
  ): Promise<EventPurchaseWithEvent[]>

  abstract listUnexpiredByUserId(
    buyerId: EventPurchase['buyerId'],
  ): Promise<EventPurchase[]>
}
