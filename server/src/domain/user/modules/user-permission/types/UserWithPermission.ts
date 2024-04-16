import { type UserWithoutPassword } from './UserWithoutPassword'

type UserWithPermission = UserWithoutPassword & {
  permissions: string[]
}

export type { UserWithPermission }
