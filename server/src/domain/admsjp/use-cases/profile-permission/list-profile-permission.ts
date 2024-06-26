import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import { Either, success } from '@/core/either'
import { ListOptions } from '@/core/repositories/list-options'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'

interface ListProfilePermissionUseCaseRequest {
  options: ListOptions
}

type ListProfilePermissionUseCaseResponse = Either<
  null,
  {
    profilePermissions: ProfilePermission[]
  }
>

@Injectable()
export class ListProfilePermissionUseCase {
  constructor(
    private profilePermissionRepository: ProfilePermissionsRepository,
  ) {}

  async execute({
    options = {},
  }: ListProfilePermissionUseCaseRequest): Promise<ListProfilePermissionUseCaseResponse> {
    const profilePermissions =
      await this.profilePermissionRepository.list(options)

    return success({
      profilePermissions,
    })
  }
}
