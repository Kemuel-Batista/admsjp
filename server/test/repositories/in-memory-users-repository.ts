import { randomUUID } from 'node:crypto'

import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      status: data.status,
      email: data.email,
      password: data.password,
      photo: data.photo,
      departmentId: data.departmentId,
      provider: data.provider,
      createdAt: new Date(),
      createdBy: data.createdBy,
      updatedAt: new Date(),
      updatedBy: data.createdBy,
      deletedBy: null,
      deletedAt: null,
    }

    this.items.push(user)

    return user
  }

  async update(data: User): Promise<User> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const user = this.items[itemIndex]

    const userUpdated = {
      ...user,
      name: data.name,
      email: data.email,
      password: data.password,
      status: data.status,
      departmentId: data.departmentId,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = userUpdated

    return user
  }

  async list(): Promise<User[]> {
    const users = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return users
  }

  async findById(id: User['id']): Promise<User> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async delete(userId: User['id']): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === userId)

    this.items.splice(itemIndex, 1)
  }
}
