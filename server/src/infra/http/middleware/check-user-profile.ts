import { NestMiddleware } from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { UserProfile } from '@/domain/user/enums/user-profile'

export class CheckUserProfileMiddleware implements NestMiddleware {
  private readonly profileIds: Array<User['profileId']>

  constructor(profileIds: Array<User['profileId']>) {
    this.profileIds = profileIds
  }

  async use(request: Request, __: unknown, next: () => void) {
    const { user } = request

    if (user.profileId !== UserProfile.ADMINISTRADOR) {
      if (!this.profileIds.includes(user.profileId)) {
        throw new AppError(
          i18n.t('user.profile.action.permissionDenied'),
          HttpStatusCode.FORBIDDEN,
        )
      }
    }

    next()
  }
}
