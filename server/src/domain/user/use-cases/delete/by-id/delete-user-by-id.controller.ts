import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { DeleteUserByIdUseCase } from './delete-user-by-id'

@Controller('/:userId')
export class DeleteUserByIdController {
  constructor(private deleteUserById: DeleteUserByIdUseCase) {}

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
