import { User } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { ICreateUserDTO } from '../../dtos/create-user-dto'
import { IListUserWithCountDTO } from '../../dtos/list-user-dto'
import { IUpdateUserDTO } from '../../dtos/update-user-dto'
import { UsersRepository } from '../users-repository'

export class UserRepositoryInMemory implements UsersRepository {
  private readonly users: User[] = []

  async create(data: ICreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async update(data: IUpdateUserDTO): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async list(
    options?: IListOptions | undefined,
    searchParams?: ISearchParamDTO[] | undefined,
  ): Promise<IListUserWithCountDTO> {
    throw new Error('Method not implemented.')
  }

  async findById(id: number): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByUsername(username: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async delete(userId: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
