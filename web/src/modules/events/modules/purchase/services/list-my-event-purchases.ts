import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventPurchaseWithEvent } from '../types/event-purchase-with-event'

export interface ListMyEventPurchasesResponse {
  eventPurchases: EventPurchaseWithEvent[]
}

export const ListMyEventPurchases = (params: PaginateParams) => {
  return usePaginateQuery<ListMyEventPurchasesResponse>(
    'event-purchases',
    '/events/purchases/by-user',
    params,
  )
}
