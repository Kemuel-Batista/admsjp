import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { ProfileRepository } from '@/domain/profile/repositories/profile-repository'

type TFindProfileByIdUseCase<Options extends IFindOptions> =
  | Profile
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
class FindProfileByIdUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute<Options extends IFindOptions>(
    id: Profile['id'],
    options: Partial<Options> = {},
  ): Promise<TFindProfileByIdUseCase<Options>> {
    const {
      throwIfNotFound = false,
      errorKeyNotFound = 'profile.find.notFound',
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let profile: Profile | null = null
    if (id) {
      profile = await this.profileRepository.findById(id)
    }

    if (throwIfNotFound && !profile) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { profile: id }),

        errorCodeNotFound,
      )
    }

    return profile as TFindProfileByIdUseCase<Options>
  }
}

export { FindProfileByIdUseCase }
