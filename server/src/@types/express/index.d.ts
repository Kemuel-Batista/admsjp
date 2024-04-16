import { UserWithPermission } from '@/domain/user/modules/user-permission/types/user-with-permission'

declare global {
  namespace Express {
    interface Request {
      user: UserWithPermission
    }
  }
}
