import { getCookie } from 'cookies-next'

import { ListEventTicketsByPurchaseIdService } from '../../tickets/services/list-event-tickets-by-purchase-id'

export function PurchaseDetailsView() {
  const purchaseId = getCookie('admsjp.purchase-details-id')
  const { data } = ListEventTicketsByPurchaseIdService({}, purchaseId)

  const eventTickets = data?.eventTickets || []

  console.log(eventTickets)

  return <div>oi</div>
}
