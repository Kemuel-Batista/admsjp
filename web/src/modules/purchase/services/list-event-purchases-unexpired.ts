import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventPurchaseWithTicketsAndLot } from '../types/event-purchase-with-tickets'

export interface ListEventPurchasesUnexpiredResponse {
  eventPurchases: EventPurchaseWithTicketsAndLot[]
}

export const ListEventPurchasesUnexpired = (params: PaginateParams) => {
  return usePaginateQuery<ListEventPurchasesUnexpiredResponse>(
    'event-purchases-unexpired',
    '/events/purchases/unexpired',
    params,
  )
}
