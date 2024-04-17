import { User } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { CreateUserDTO } from '../../dtos/create-user.dto'
import { ListUserWithCountDTO } from '../../dtos/list-user.dto'
import { UpdateUserDTO } from '../../dtos/update-user.dto'
import { UsersRepository } from '../users-repository'

export class UserRepositoryInMemory implements UsersRepository {
  private readonly users: User[] = []

  async create(data: CreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async update(data: UpdateUserDTO): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async list(
    options?: IListOptions | undefined,
    searchParams?: ISearchParamDTO[] | undefined,
  ): Promise<ListUserWithCountDTO> {
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
