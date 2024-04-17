import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { ProfileRepository } from '@/domain/profile/repositories/profile-repository'

type TFindProfileByIdUseCase<Options extends IFindOptions> =
  | Profile
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindProfileByNameUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute<Options extends IFindOptions>(
    name: Profile['name'],
    options: IFindOptions = {},
  ): Promise<TFindProfileByIdUseCase<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'profile.create.keyAlreadyExists',
      errorKeyNotFound = 'profile.find.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let profile: Profile | null = null

    if (name) {
      profile = await this.profileRepository.findByName(name)
    }

    if (throwIfFound && profile) {
      throw new AppError(i18n.t(errorKeyFound, { name }), errorCodeFound)
    }

    if (throwIfNotFound && !profile) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { profile: name }),

        errorCodeNotFound,
      )
    }

    return profile as TFindProfileByIdUseCase<Options>
  }
}
