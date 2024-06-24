import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventTicket } from '../types/event-ticket'

export interface ListEventTicketsByPurchaseIdServiceResponse {
  eventTickets: EventTicket[]
}

export const ListEventTicketsByPurchaseIdService = (
  params: PaginateParams,
  purchaseId?: string,
) => {
  return usePaginateQuery<ListEventTicketsByPurchaseIdServiceResponse>(
    'event-tickets',
    `/events/tickets/purchase/${purchaseId}`,
    params,
  )
}
