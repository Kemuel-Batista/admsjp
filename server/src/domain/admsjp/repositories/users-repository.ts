import { Prisma, User } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'

export abstract class UsersRepository {
  abstract create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  abstract update(data: User): Promise<User>
  abstract list(options?: ListOptions): Promise<User[]>
  abstract findById(id: User['id']): Promise<User | null>
  abstract findByEmail(email: User['email']): Promise<User | null>
  abstract delete(userId: User['id']): Promise<void>
}
