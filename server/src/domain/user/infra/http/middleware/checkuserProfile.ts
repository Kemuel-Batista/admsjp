import { UserProfile } from '@modules/user/enums/UserProfile'
import { type User } from '@prisma/client'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { AppError } from '@shared/errors/AppError'
import { i18n } from '@shared/i18n/i18n'
import { type NextFunction, type Request, type Response } from 'express'

function checkUserProfile(profileId: Array<User['profileId']>) {
  return function (request: Request, _: Response, next: NextFunction): void {
    const { user } = request

    if (user.profileId !== UserProfile.ADMINISTRADOR) {
      if (!profileId.includes(user.profileId)) {
        throw new AppError(
          i18n.t('user.profile.action.permissionDenied'),
          HttpStatusCode.FORBIDDEN,
        )
      }
    }

    next()
  }
}

export { checkUserProfile }
