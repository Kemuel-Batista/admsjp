import { randomUUID } from 'node:crypto'

import { Prisma, Profile } from '@prisma/client'

import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'

export class InMemoryProfilesRepository implements ProfilesRepository {
  public items: Profile[] = []

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<Profile> {
    const profile = {
      id: randomUUID(),
      name: data.name,
      status: data.status,
      visible: data.visible,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: data.createdBy,
      updatedBy: data.createdBy,
      deletedBy: null,
      deletedAt: null,
    }

    this.items.push(profile)

    return profile
  }

  async update(data: Profile): Promise<Profile> {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    const profile = this.items[itemIndex]

    const profileUpdated = {
      ...profile,
      name: data.name,
      status: data.status,
      visible: data.visible,
      updatedBy: data.updatedBy,
    }

    this.items[itemIndex] = profileUpdated

    return profile
  }

  async list(): Promise<Profile[]> {
    const profiles = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return profiles
  }

  async findById(id: Profile['id']): Promise<Profile> {
    const profile = this.items.find((item) => item.id === id)

    if (!profile) {
      return null
    }

    return profile
  }

  async findByName(name: string): Promise<Profile> {
    const profile = this.items.find((item) => item.name === name)

    if (!profile) {
      return null
    }

    return profile
  }
}
