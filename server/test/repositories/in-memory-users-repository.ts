import { randomUUID } from 'node:crypto'

import { User } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import {
  CreateUserDTO,
  ListUserWithCountDTO,
  UpdateUserDTO,
} from '@/domain/admsjp/dtos/user'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: CreateUserDTO): Promise<User> {
    const id = getLastInsertedId(this.items)

    const user = {
      id,
      uuid: randomUUID(),
      name: data.name,
      username: data.username,
      status: data.status,
      profileId: data.profileId,
      email: data.email,
      password: data.password,
      departmentId: data.departmentId,
      createdAt: new Date(),
      createdBy: data.createdBy,
      updatedAt: new Date(),
      updatedBy: data.createdBy,
      deletedAt: null,
    }

    this.items.push(user)

    return user
  }

  async update(data: UpdateUserDTO): Promise<User> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const user = this.items[itemIndex]

    const userUpdated = {
      ...user,
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      status: data.status,
      departmentId: data.departmentId,
      profileId: data.profileId,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = userUpdated

    return user
  }

  async list(): Promise<ListUserWithCountDTO> {
    const users = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const count = users.length

    return { users, count }
  }

  async findById(id: number): Promise<User> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.items.find((item) => item.username === username)

    if (!user) {
      return null
    }

    return user
  }

  async delete(userId: number): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === userId)

    this.items.splice(itemIndex, 1)
  }
}
