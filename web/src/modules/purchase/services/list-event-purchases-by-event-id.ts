import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventPurchaseWithOrder } from '../types/event-purchase-with-order'

export interface ListEventPurchasesByEventIdResponse {
  eventPurchases: EventPurchaseWithOrder[]
  count: number
}

export const ListEventPurchasesByEventId = (params: PaginateParams) => {
  return usePaginateQuery<ListEventPurchasesByEventIdResponse>(
    'event-purchases-by-event',
    `/events/purchases/by-event/${params.id}`,
    params,
  )
}
