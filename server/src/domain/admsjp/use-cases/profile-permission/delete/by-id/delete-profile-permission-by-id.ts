import { Injectable } from '@nestjs/common'
import { type ProfilePermission, type User } from '@prisma/client'

import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'

import { FindProfileByIdUseCase } from '../../../profile/find/by-id/find-profile-by-id'
import { FindProfilePermissionByIdUseCase } from '../../find/by-id/find-profile-permission-by-id'

interface DeleteProfilePermissionByIdUseCaseRequest {
  id: ProfilePermission['id']
  deletedBy: User['id']
}

@Injectable()
export class DeleteProfilePermissionByIdUseCase {
  constructor(
    private profilePermissionsRepository: ProfilePermissionsRepository,
    private findProfileById: FindProfileByIdUseCase,
    private findProfilePermissionById: FindProfilePermissionByIdUseCase,
  ) {}

  async execute({
    id,
  }: DeleteProfilePermissionByIdUseCaseRequest): Promise<void> {
    const profilePermission = await this.findProfilePermissionById.execute(id, {
      throwIfNotFound: true,
    })

    await this.findProfileById.execute(profilePermission.profileId, {
      throwIfNotFound: true,
    })

    await this.profilePermissionsRepository.delete(profilePermission.id)
  }
}
