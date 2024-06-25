import { Injectable } from '@nestjs/common'
import { type ProfilePermission, type User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'

interface DeleteProfilePermissionByIdUseCaseRequest {
  id: ProfilePermission['id']
  deletedBy: User['id']
}

type DeleteProfilePermissionByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>

@Injectable()
export class DeleteProfilePermissionByIdUseCase {
  constructor(
    private profilePermissionsRepository: ProfilePermissionsRepository,
  ) {}

  async execute({
    id,
  }: DeleteProfilePermissionByIdUseCaseRequest): Promise<DeleteProfilePermissionByIdUseCaseResponse> {
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

    await this.profilePermissionsRepository.delete(profilePermission.id)

    return success(null)
  }
}
