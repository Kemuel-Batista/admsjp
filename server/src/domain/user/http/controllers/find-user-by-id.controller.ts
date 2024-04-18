import { Controller, Get, Param } from '@nestjs/common'

import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'

import { FindUserByIdUseCase } from '../../use-cases/find/by-id/find-user-by-id'

@Controller('/:userId')
export class FindUserByIdController {
  constructor(private findUserById: FindUserByIdUseCase) {}

  @Get()
  async handle(@Param('userId', paramsValidationPipe) userId: ParamsSchema) {
    const user = await this.findUserById.execute(userId, {
      throwIfNotFound: true,
    })

    delete user.password

    return {
      user,
    }
  }
}
