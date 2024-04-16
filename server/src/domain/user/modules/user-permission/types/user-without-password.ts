import { type User } from '@prisma/client'

type UserWithoutPassword = Omit<User, 'password'>

export type { UserWithoutPassword }
