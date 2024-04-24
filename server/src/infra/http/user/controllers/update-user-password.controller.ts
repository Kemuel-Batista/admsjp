import { Body, Controller, HttpCode, Put, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/http-status-code'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { UpdateUserPasswordUseCase } from '@/domain/admsjp/use-cases/user/update/password/update-user-password'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const updateUserPasswordSchema = z.object({
  id: z.number().int().positive(),
  password: z.string().min(6).max(20),
})

type UpdateUserPasswordBodySchema = z.infer<typeof updateUserPasswordSchema>

const bodyValidationPipe = new ZodValidationPipe(updateUserPasswordSchema)

@Controller('/password')
class UpdateUserPasswordController {
  constructor(private updateUserPassword: UpdateUserPasswordUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Put()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserPasswordBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { id, password } = body

    await this.updateUserPassword.execute(id, password, user.sub.id)
  }
}

export { UpdateUserPasswordController }
