import { EventPurchase, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

import {
  EventPurchaseWithBuyer,
  EventPurchaseWithEvent,
  EventPurchaseWithEventTicketsAndLot,
} from '../types/event-purchase'

export abstract class EventPurchasesRepository {
  abstract create(
    data: Prisma.EventPurchaseUncheckedCreateInput,
  ): Promise<EventPurchase>

  abstract save(data: EventPurchase): Promise<EventPurchase>
  abstract findById(id: EventPurchase['id']): Promise<EventPurchase | null>

  abstract lastInvoiceNumber(): Promise<string>
  abstract list(options?: ListOptions): Promise<EventPurchase[]>
  abstract listByEventId(
    eventId: EventPurchase['eventId'],
    options?: ListOptions,
  ): Promise<EventPurchaseWithBuyer[]>

  abstract listByBuyerId(
    buyerId: EventPurchase['buyerId'],
    options?: ListOptions,
  ): Promise<EventPurchaseWithEvent[]>

  abstract listUnexpiredByUserId(
    buyerId: EventPurchase['buyerId'],
  ): Promise<EventPurchaseWithEventTicketsAndLot[]>

  abstract listBuyerDetailsByEventId(
    eventId: EventPurchase['eventId'],
  ): Promise<EventPurchaseWithBuyer[]>

  abstract listCloseToExpiry(): Promise<EventPurchase[]>

  abstract countByEventId(eventId: EventPurchase['eventId']): Promise<number>
  abstract delete(id: EventPurchase['id']): Promise<void>
}
