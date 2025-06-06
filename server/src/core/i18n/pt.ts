import department from '@/domain/admsjp/languages/department.pt'
import event from '@/domain/admsjp/languages/event.pt'
import eventAddress from '@/domain/admsjp/languages/event-address.pt'
import eventLot from '@/domain/admsjp/languages/event-lot.pt'
import eventPurchase from '@/domain/admsjp/languages/event-purchase.pt'
import eventTicket from '@/domain/admsjp/languages/event-ticket.pt'
import order from '@/domain/admsjp/languages/order.pt'
import parameter from '@/domain/admsjp/languages/parameter.pt'
import profile from '@/domain/admsjp/languages/profile.pt'
import user from '@/domain/admsjp/languages/user.pt'

const messages = {
  pt: {
    translations: {
      ...department,
      ...user,
      ...profile,
      ...event,
      ...eventAddress,
      ...eventLot,
      ...eventPurchase,
      ...eventTicket,
      ...parameter,
      ...order,
    },
  },
}

export default messages
