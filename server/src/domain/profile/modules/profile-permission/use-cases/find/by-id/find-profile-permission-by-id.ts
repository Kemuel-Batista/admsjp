import { Injectable } from '@nestjs/common'
import { ProfilePermission } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'

import { ProfilePermissionsRepository } from '../../../repositories/profile-permissions-repository'

type TFindProfilePermissionByIdUseCase<Options extends IFindOptions> =
  | ProfilePermission
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindProfilePermissionByIdUseCase {
  constructor(
    private profilePermissionsRepository: ProfilePermissionsRepository,
  ) {}

  async execute<Options extends IFindOptions>(
    id: ProfilePermission['id'],
    options: Partial<Options> = {},
  ): Promise<TFindProfilePermissionByIdUseCase<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'profilePermission.create.keyAlreadyExists',
      errorKeyNotFound = 'profilePermission.find.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let profilePermission: ProfilePermission | null = null

    if (id) {
      profilePermission = await this.profilePermissionsRepository.findById(id)
    }

    const keyName = id

    if (throwIfFound && profilePermission) {
      throw new AppError(i18n.t(errorKeyFound, { keyName }), errorCodeFound)
    }

    if (throwIfNotFound && !profilePermission) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { keyName }),

        errorCodeNotFound,
      )
    }

    return profilePermission as TFindProfilePermissionByIdUseCase<Options>
  }
}
