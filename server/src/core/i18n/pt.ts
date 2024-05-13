import event from '@/domain/admsjp/languages/event.pt'
import eventAddress from '@/domain/admsjp/languages/event-address.pt'
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
    },
  },
}

export default messages
