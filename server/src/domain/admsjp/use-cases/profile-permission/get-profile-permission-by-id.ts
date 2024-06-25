import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'

interface GetProfilePermissionByIdUseCaseRequest {
  id: ProfilePermission['id']
}

type GetProfilePermissionByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    profilePermission: ProfilePermission
  }
>

@Injectable()
export class GetProfilePermissionByIdUseCase {
  constructor(
    private profilePermissionsRepository: ProfilePermissionsRepository,
  ) {}

  async execute({
    id,
  }: GetProfilePermissionByIdUseCaseRequest): Promise<GetProfilePermissionByIdUseCaseResponse> {
    const profilePermission =
      await this.profilePermissionsRepository.findById(id)

    if (!profilePermission) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'profilePermission.find.notFound',
          key: String(id),
        }),
      )
    }

    return success({
      profilePermission,
    })
  }
}
