import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventPurchaseWithTickets } from '../types/event-purchase-with-tickets'

export interface ListEventPurchasesUnexpiredResponse {
  eventPurchases: EventPurchaseWithTickets[]
}

export const ListEventPurchasesUnexpired = (params: PaginateParams) => {
  return usePaginateQuery<ListEventPurchasesUnexpiredResponse>(
    'event-purchases-unexpired',
    '/events/purchases/unexpired',
    params,
  )
}
