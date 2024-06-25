import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { EventTicketWithEventLot } from '../types/event-ticket-with-event-lot'

export interface ListEventTicketsByPurchaseIdServiceResponse {
  eventTickets: EventTicketWithEventLot[]
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
