import { NestMiddleware } from '@nestjs/common'
import { User } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { UserProfile } from '@/domain/user/enums/user-profile'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

export class CheckUserProfileMiddleware implements NestMiddleware {
  private readonly profileIds: Array<User['profileId']>

  constructor(profileIds: Array<User['profileId']>) {
    this.profileIds = profileIds
  }

  async use(@CurrentUser() user: UserPayload, __: unknown, next: () => void) {
    if (user.sub.profileId !== UserProfile.ADMINISTRADOR) {
      if (!this.profileIds.includes(user.sub.profileId)) {
        throw new AppError(
          i18n.t('user.profile.action.permissionDenied'),
          HttpStatusCode.FORBIDDEN,
        )
      }
    }

    next()
  }
}
