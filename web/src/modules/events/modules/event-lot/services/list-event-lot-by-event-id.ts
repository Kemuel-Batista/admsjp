import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventLot } from '../types/event-lot'

export interface ListEventLotByEventIdResponse {
  eventLots: EventLot[]
}

export const ListEventLotByEventId = (
  params: PaginateParams,
  eventId?: number,
) => {
  return usePaginateQuery<ListEventLotByEventIdResponse>(
    'event-lots',
    `/events/lot/event/${eventId}`,
    params,
  )
}
