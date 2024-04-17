import { type User } from '@prisma/client'

interface AuthUserDTO {
  username: User['username']
  password: User['password']
}

export type { AuthUserDTO }
