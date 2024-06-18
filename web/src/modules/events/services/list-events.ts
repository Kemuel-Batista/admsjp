import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { Event } from '../types/event'

export interface ListEventServiceResponse {
  events: Event
}

export const ListEventService = (params: PaginateParams) => {
  return usePaginateQuery<ListEventServiceResponse>('events', '/events', params)
}
