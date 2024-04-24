import { randomUUID } from 'node:crypto'

import { Profile } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import {
  CreateProfileDTO,
  ListProfileDTO,
  UpdateProfileDTO,
} from '@/domain/admsjp/dtos/profile'
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'

export class InMemoryProfilesRepository implements ProfilesRepository {
  public items: Profile[] = []

  async create(data: CreateProfileDTO): Promise<Profile> {
    const id = getLastInsertedId(this.items)

    const profile = {
      id,
      uuid: randomUUID(),
      name: data.name,
      status: data.status,
      visible: data.visible,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: data.createdBy,
      updatedBy: data.createdBy,
    }

    this.items.push(profile)

    return profile
  }

  async update(data: UpdateProfileDTO): Promise<Profile> {
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

  async list(): Promise<ListProfileDTO> {
    const profiles = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    const count = profiles.length

    return { profiles, count }
  }

  async findById(id: number): Promise<Profile> {
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
