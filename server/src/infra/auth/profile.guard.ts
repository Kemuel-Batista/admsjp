import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'

import { UserPayload } from './jwt.strategy'

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchProfiles(
    profiles: Array<User['profileId']>,
    userProfile: number,
  ): boolean {
    return profiles.some((profile) => profile === userProfile)
  }

  canActivate(context: ExecutionContext): boolean {
    const profiles = this.reflector.get<Array<User['profileId']>>(
      'profiles',
      context.getHandler(),
    )

    console.log(profiles)

    if (!profiles) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    const user = request.user as UserPayload

    return this.matchProfiles(profiles, user.sub.profileId)
  }
}
