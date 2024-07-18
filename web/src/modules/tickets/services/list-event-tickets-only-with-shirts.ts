import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventTicket } from '../types/event-ticket'

export interface ListEventTicketsOnlyWithShirtsServiceResponse {
  eventTickets: EventTicket[]
}

export const ListEventTicketsOnlyWithShirtsService = (
  params: PaginateParams,
) => {
  return usePaginateQuery<ListEventTicketsOnlyWithShirtsServiceResponse>(
    'event-tickets',
    '/events/tickets/shirts',
    params,
  )
}
