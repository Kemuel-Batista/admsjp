import { type User } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { type ICreateUserDTO } from '../dtos/create-user-dto'
import { type IListUserWithCountDTO } from '../dtos/list-user-dto'
import { type IUpdateUserDTO } from '../dtos/update-user-dto'

export abstract class UsersRepository {
  abstract create(data: ICreateUserDTO): Promise<User>
  abstract update(data: IUpdateUserDTO): Promise<User>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<IListUserWithCountDTO>

  abstract findById(id: User['id']): Promise<User | null>
  abstract findByUsername(username: User['username']): Promise<User | null>
  abstract delete(userId: User['id']): Promise<void>
}
