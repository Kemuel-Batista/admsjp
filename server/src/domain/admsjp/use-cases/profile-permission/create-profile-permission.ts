import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'

import { ProfilesRepository } from '../../repositories/profiles-repository'

interface CreateProfilePermissionUseCaseRequest {
  profileId: ProfilePermission['profileId']
  key: ProfilePermission['key']
  createdBy: ProfilePermission['createdBy']
}

type CreateProfilePermissionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    profilePermission: ProfilePermission
  }
>

@Injectable()
export class CreateProfilePermissionUseCase {
  constructor(
    private profilePermissionsRepository: ProfilePermissionsRepository,
    private profilesRepository: ProfilesRepository,
  ) {}

  async execute({
    key,
    profileId,
    createdBy,
  }: CreateProfilePermissionUseCaseRequest): Promise<CreateProfilePermissionUseCaseResponse> {
    const profile = await this.profilesRepository.findById(profileId)

    if (!profile) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'profile.find.notFound',
          key: String(profileId),
        }),
      )
    }

    const profilePermissionAlreadyExists =
      await this.profilePermissionsRepository.findByKeyProfileId(key, profileId)

    if (profilePermissionAlreadyExists) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'profilePermission.create.keyAlreadyExists',
          key: String(key),
        }),
      )
    }

    const profilePermission = await this.profilePermissionsRepository.create({
      key,
      profileId,
      createdBy,
    })

    return success({
      profilePermission,
    })
  }
}
