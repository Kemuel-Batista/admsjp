import { randomUUID } from 'node:crypto'

import { ProfilePermission } from '@prisma/client'
import { getLastInsertedId } from 'test/utils/get-last-inserted-id'

import { CreateProfilePermissionDTO } from '@/domain/admsjp/dtos/profile-permission'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'

export class InMemoryProfilePermissionsRepository
  implements ProfilePermissionsRepository
{
  public items: ProfilePermission[] = []

  async create(data: CreateProfilePermissionDTO): Promise<ProfilePermission> {
    const id = getLastInsertedId(this.items)

    const profilePermission = {
      id,
      uuid: randomUUID(),
      profileId: data.profileId,
      key: data.key,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: data.createdBy,
      updatedBy: data.createdBy,
      deletedBy: null,
      deletedAt: null,
    }

    this.items.push(profilePermission)

    return profilePermission
  }

  async list(): Promise<ProfilePermission[]> {
    const profilePermissions = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return profilePermissions
  }

  async listByProfileId(profileId: number): Promise<ProfilePermission[]> {
    const profilePermissions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .filter((item) => item.profileId === profileId)

    return profilePermissions
  }

  async findById(id: number): Promise<ProfilePermission> {
    const profilePermission = this.items.find((item) => item.id === id)

    if (!profilePermission) {
      return null
    }

    return profilePermission
  }

  async findByKeyProfileId(
    key: string,
    profileId: number,
  ): Promise<ProfilePermission> {
    const profilePermission = this.items.find(
      (item) => item.key === key && item.profileId === profileId,
    )

    if (!profilePermission) {
      return null
    }

    return profilePermission
  }

  async delete(id: number): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
