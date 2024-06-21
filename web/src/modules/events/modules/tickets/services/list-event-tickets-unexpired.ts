import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventTicket } from '../types/event-ticket'

export interface ListEventTicketsUnexpiredResponse {
  eventTickets: EventTicket[]
}

export const ListEventTicketsUnexpired = (params: PaginateParams) => {
  return usePaginateQuery<ListEventTicketsUnexpiredResponse>(
    'event-tickets-unexpired',
    '/events/tickets/unexpired/user',
    params,
  )
}
