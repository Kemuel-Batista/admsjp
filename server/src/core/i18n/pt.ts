import event from '@/domain/admsjp/languages/event.pt'
import eventAddress from '@/domain/admsjp/languages/event-address.pt'
import eventLot from '@/domain/admsjp/languages/event-lot.pt'
import eventTicket from '@/domain/admsjp/languages/event-ticket.pt'
import parameter from '@/domain/admsjp/languages/parameter.pt'
import profile from '@/domain/admsjp/languages/profile.pt'
import profilePermission from '@/domain/admsjp/languages/profile-permission.pt'
import user from '@/domain/admsjp/languages/user.pt'

const messages = {
  pt: {
    translations: {
      ...user,
      ...profile,
      ...profilePermission,
      ...event,
      ...eventAddress,
      ...eventLot,
      ...eventTicket,
      ...parameter,
    },
  },
}

export default messages
