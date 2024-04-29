import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common'

import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { DeleteUserByIdUseCase } from '@/domain/admsjp/use-cases/user/delete/by-id/delete-user-by-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/:userId')
export class DeleteUserByIdController {
  constructor(private deleteUserById: DeleteUserByIdUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
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
