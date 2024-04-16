import { type UserWithoutPassword } from './user-without-password'

type UserWithPermission = UserWithoutPassword & {
  permissions: string[]
}

export type { UserWithPermission }
