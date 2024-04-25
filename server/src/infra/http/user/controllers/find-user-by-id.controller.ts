import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { FindUserByIdUseCase } from '@/domain/admsjp/use-cases/user/find/by-id/find-user-by-id'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/:userId')
export class FindUserByIdController {
  constructor(private findUserById: FindUserByIdUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  async handle(@Param('userId', paramsValidationPipe) userId: ParamsSchema) {
    const user = await this.findUserById.execute(userId, {
      throwIfNotFound: true,
    })

    delete user.password

    return user
  }
}
