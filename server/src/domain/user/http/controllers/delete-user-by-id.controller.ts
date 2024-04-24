import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'

import HttpStatusCode from '@/core/enums/http-status-code'
import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user/user-profile'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

import { DeleteUserByIdUseCase } from '../../use-cases/delete/by-id/delete-user-by-id'

@Controller('/:userId')
export class DeleteUserByIdController {
  constructor(private deleteUserById: DeleteUserByIdUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Delete()
  @HttpCode(HttpStatusCode.NO_CONTENT)
  async handle(
    @Param('userId', paramsValidationPipe) userId: ParamsSchema,
    @CurrentUser() user: UserPayload,
  ) {
    await this.deleteUserById.execute({
      userId,
      deletedBy: user.sub.id,
    })
  }
}
