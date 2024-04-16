import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { CreateProfilePermissionDTO } from '../../dtos/create-profile-permission.dto'
import { ProfilePermissionsRepository } from '../../repositories/profile-permissions-repository'
import { FindProfilePermissionByIdUseCase } from '../find/by-id/find-profile-permission-by-id'
import { FindProfilePermissionByKeyProfileIdUseCase } from '../find/by-key-profile-id/find-profile-permission-by-key-profile-id'

@Injectable()
export class CreateProfilePermissionUseCase {
  constructor(
    private profilePermissionsRepository: ProfilePermissionsRepository,
    private findProfileById: FindProfilePermissionByIdUseCase,
    private findProfilePermissionByKeyProfileId: FindProfilePermissionByKeyProfileIdUseCase,
  ) {}

  async execute({
    key,
    profileId,
    createdBy,
  }: CreateProfilePermissionDTO): Promise<ProfilePermission> {
    await this.findProfileById.execute(profileId, {
      throwIfNotFound: true,
    })

    await this.findProfilePermissionByKeyProfileId.execute(key, profileId, {
      throwIfFound: true,
    })

    const profilePermission = await this.profilePermissionsRepository.create({
      key,
      profileId,
      createdBy,
    })

    return profilePermission
  }
}
