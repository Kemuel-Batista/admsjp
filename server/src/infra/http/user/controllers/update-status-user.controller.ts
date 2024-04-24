import { Controller, HttpCode, Param, Patch, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/http-status-code'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { UpdateStatusUserUseCase } from '@/domain/admsjp/use-cases/user/update/status/update-status-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const updateStatusUser = z.object({
  userId: z.string().transform(Number).pipe(z.number().min(1)),
  status: z.string().transform(Number).pipe(z.number().min(0).max(1)),
})

export const paramsValidationPipe = new ZodValidationPipe(updateStatusUser)

export type ParamsParamSchema = z.infer<typeof updateStatusUser>

@Controller('/:userId/status/:status')
export class UpdateStatusUserController {
  constructor(private updateStatusUser: UpdateStatusUserUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Patch()
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
