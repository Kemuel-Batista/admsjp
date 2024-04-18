import { Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { UpdateStatusUserUseCase } from './update-status-user'

const updateStatusUser = z.object({
  userId: z.string().transform(Number).pipe(z.number().min(1)),
  status: z.string().transform(Number).pipe(z.number().min(0).max(1)),
})

export const paramsValidationPipe = new ZodValidationPipe(updateStatusUser)

export type ParamsParamSchema = z.infer<typeof updateStatusUser>

@Controller('/:userId/status/:status')
export class UpdateStatusUserController {
  constructor(private updateStatusUser: UpdateStatusUserUseCase) {}

  @Put()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Param(paramsValidationPipe) params: ParamsParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { userId, status } = params

    await this.updateStatusUser.execute({
      id: userId,
      status,
      updatedBy: user.sub.id,
    })
  }
}
