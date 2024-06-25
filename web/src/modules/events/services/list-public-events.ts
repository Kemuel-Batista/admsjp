import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { Event } from '../types/event'

export interface ListPublicEventsServiceResponse {
  'x-total-count': number
  events: Event[]
}

export const ListPublicEventsService = (params: PaginateParams) => {
  return usePaginateQuery<ListPublicEventsServiceResponse>(
    'events',
    '/events/public',
    params,
  )
}
