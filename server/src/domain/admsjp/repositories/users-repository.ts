import { User } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import {
  CreateUserDTO,
  ListUserWithCountDTO,
  UpdateUserDTO,
} from '../dtos/user'

export abstract class UsersRepository {
  abstract create(data: CreateUserDTO): Promise<User>
  abstract update(data: UpdateUserDTO): Promise<User>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListUserWithCountDTO>

  abstract findById(id: User['id']): Promise<User | null>
  abstract findByUsername(username: User['username']): Promise<User | null>
  abstract delete(userId: User['id']): Promise<void>
}
