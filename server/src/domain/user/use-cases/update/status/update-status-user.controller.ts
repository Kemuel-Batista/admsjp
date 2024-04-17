import { Controller, HttpCode, Param, Put, Req } from '@nestjs/common'
import { Request } from 'express'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { UpdateStatusUserUseCase } from './update-status-user'

const updateStatusUser = z.object({
  userId: z.string().transform(Number).pipe(z.number().min(1)),
  status: z.string().transform(Number).pipe(z.number().min(0).max(1)),
})

export const paramsValidationPipe = new ZodValidationPipe(updateStatusUser)

export type ParamsParamSchema = z.infer<typeof updateStatusUser>

@Controller('/:userId/:status')
export class UpdateStatusUserController {
  constructor(private updateStatusUser: UpdateStatusUserUseCase) {}

  @Put()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Param(paramsValidationPipe) params: ParamsParamSchema,
    @Req() request: Request,
  ) {
    const { userId, status } = params
    const { user } = request

    await this.updateStatusUser.execute({
      id: userId,
      status,
      updatedBy: user.id,
    })
  }
}
