import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'

import { ProfilePermissionsRepository } from '../../../repositories/profile-permissions-repository'

type TFindProfilePermissionByKeyProfileIdUseCase<Options extends IFindOptions> =
  ProfilePermission | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindProfilePermissionByKeyProfileIdUseCase {
  constructor(
    private readonly profilePermissionsRepository: ProfilePermissionsRepository,
  ) {}

  async execute<Options extends IFindOptions>(
    key: ProfilePermission['key'],
    profileId: ProfilePermission['profileId'],
    options: Partial<Options> = {},
  ): Promise<TFindProfilePermissionByKeyProfileIdUseCase<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'profilePermission.create.keyAlreadyExists',
      errorKeyNotFound = 'profilePermission.find.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let profilePermission: ProfilePermission | null = null

    if (key && profileId) {
      profilePermission =
        await this.profilePermissionsRepository.findByKeyProfileId(
          key,
          profileId,
        )
    }

    const keyName = i18n.t(key)

    if (throwIfFound && profilePermission) {
      throw new AppError(i18n.t(errorKeyFound, { keyName }), errorCodeFound)
    }

    if (throwIfNotFound && !profilePermission) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { keyName }),

        errorCodeNotFound,
      )
    }

    return profilePermission as TFindProfilePermissionByKeyProfileIdUseCase<Options>
  }
}
