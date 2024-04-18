import { Body, Controller, HttpCode, Put, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { UserProfile } from '@/domain/user/enums/user-profile'
import { UserStatus } from '@/domain/user/enums/user-status'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { UpdateUserUseCase } from '../../use-cases/update/default/update-user'

const updateUserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  name: z.string().min(3).max(50),
  password: z.string().min(6).max(20),
  status: z.nativeEnum(UserStatus),
  profileId: z.number().int().positive(),
})

type UpdateUserBodySchema = z.infer<typeof updateUserSchema>

const bodyValidationPipe = new ZodValidationPipe(updateUserSchema)

@Controller('/')
export class UpdateUserController {
  constructor(private updateUser: UpdateUserUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Put()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { id, name, username, password, status, profileId } = body

    const { ...userWithoutPassword } = await this.updateUser.execute({
      id,
      name,
      username,
      password,
      status,
      profileId,
      updatedBy: user.sub.id,
    })

    delete userWithoutPassword.password

    return userWithoutPassword
  }
}
