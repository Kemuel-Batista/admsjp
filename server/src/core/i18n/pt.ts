import profile from '@/domain/profile/languages/pt'
import profilePermission from '@/domain/profile/modules/profile-permission/languages/pt'
import user from '@/domain/user/languages/pt'

const messages = {
  pt: {
    translations: {
      ...user,
      ...profile,
      ...profilePermission,
    },
  },
}

export default messages
