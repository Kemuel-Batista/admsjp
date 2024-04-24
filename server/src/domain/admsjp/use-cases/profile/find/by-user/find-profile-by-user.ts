import { Injectable } from '@nestjs/common'
import { Profile, User } from '@prisma/client'

import { FindUserByIdUseCase } from '../../../user/find/by-id/find-user-by-id'
import { FindProfileByIdUseCase } from '../by-id/find-profile-by-id'

@Injectable()
export class FindProfileByUserUseCase {
  constructor(
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findProfileByIdUseCase: FindProfileByIdUseCase,
  ) {}

  async execute(userId: User['id']): Promise<Profile> {
    const user = await this.findUserByIdUseCase.execute(userId, {
      throwIfNotFound: true,
    })

    const profile = await this.findProfileByIdUseCase.execute(user.profileId, {
      throwIfNotFound: true,
    })

    return profile
  }
}
