import { type User } from '@prisma/client'

interface IAuthUserDTO {
  username: User['username']
  password: User['password']
}

export type { IAuthUserDTO }
