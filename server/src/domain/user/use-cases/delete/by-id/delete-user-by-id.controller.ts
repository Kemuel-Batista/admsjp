import { Controller, Delete, HttpCode, Param, Req } from '@nestjs/common'
import { Request } from 'express'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'

import { DeleteUserByIdUseCase } from './delete-user-by-id'

@Controller('')
export class DeleteUserByIdController {
  constructor(private deleteUserById: DeleteUserByIdUseCase) {}

  @Delete()
  @HttpCode(HttpStatusCode.NO_CONTENT)
  async handle(
    @Param('userId', paramsValidationPipe) userId: ParamsSchema,
    @Req() request: Request,
  ) {
    const { user } = request

    await this.deleteUserById.execute({
      userId,
      deletedBy: user.id,
    })
  }
}
