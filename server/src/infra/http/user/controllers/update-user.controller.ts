import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

import { UserProfile, UserStatus } from '@/domain/admsjp/enums/user'
import { UpdateUserUseCase } from '@/domain/admsjp/use-cases/user/update/default/update-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const updateUserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  name: z.string().min(3).max(50),
  password: z.string().min(6).max(20),
  status: z.nativeEnum(UserStatus),
  departmentId: z.number().int().positive(),
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
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      id,
      name,
      username,
      password,
      email,
      status,
      departmentId,
      profileId,
    } = body

    const { ...userWithoutPassword } = await this.updateUser.execute({
      id,
      name,
      username,
      password,
      email,
      status,
      departmentId,
      profileId,
      updatedBy: user.sub.id,
    })

    delete userWithoutPassword.password

    return userWithoutPassword
  }
}
