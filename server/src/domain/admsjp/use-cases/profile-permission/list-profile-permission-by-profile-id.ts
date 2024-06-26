import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ListOptions } from '@/core/repositories/list-options'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'

import { ProfilesRepository } from '../../repositories/profiles-repository'

interface ListProfilePermissionByProfileIdUseCaseRequest {
  profileId: ProfilePermission['profileId']
  options: ListOptions
}

type ListProfilePermissionByProfileIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    profilePermissions: ProfilePermission[]
  }
>

@Injectable()
export class ListProfilePermissionByProfileIdUseCase {
  constructor(
    private profilePermissionsRepository: ProfilePermissionsRepository,
    private profilesRepository: ProfilesRepository,
  ) {}

  async execute({
    profileId,
    options = {},
  }: ListProfilePermissionByProfileIdUseCaseRequest): Promise<ListProfilePermissionByProfileIdUseCaseResponse> {
    const profile = await this.profilesRepository.findById(profileId)

    if (!profile) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'profile.find.notFound',
          key: String(profileId),
        }),
      )
    }

    const profilePermissions =
      await this.profilePermissionsRepository.listByProfileId(
        profileId,
        options,
      )

    return success({
      profilePermissions,
    })
  }
}
