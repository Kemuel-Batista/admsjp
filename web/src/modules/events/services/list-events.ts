import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventInfo } from '../types/event-info'

export interface ListEventServiceResponse {
  events: EventInfo
}

export const ListEventService = (params: PaginateParams) => {
  return usePaginateQuery<ListEventServiceResponse>('events', '/events', params)
}
