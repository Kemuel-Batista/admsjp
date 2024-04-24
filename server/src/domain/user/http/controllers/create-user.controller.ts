import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/http-status-code'
import { UserProfile } from '@/domain/admsjp/enums/user/user-profile'
import { UserStatus } from '@/domain/admsjp/enums/user/user-status'
import { UserWithoutPassword } from '@/domain/admsjp/types/user/user-without-password'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { CreateUserUseCase } from '../../use-cases/create/default/create-user'

const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  name: z.string().min(3).max(50),
  status: z.nativeEnum(UserStatus),
  departmentId: z.number().int().positive(),
  profileId: z.number().int().positive(),
})

type CreateUserBodySchema = z.infer<typeof createUserSchema>

const bodyValidationPipe = new ZodValidationPipe(createUserSchema)

@Controller('/')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Post()
  @HttpCode(HttpStatusCode.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CreateUserBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      username,
      email,
      name,
      password,
      status = UserStatus.ACTIVE,
      departmentId,
      profileId,
    } = body

    const userWithoutPassword: UserWithoutPassword =
      await this.createUser.execute({
        username,
        email,
        name,
        password,
        status,
        departmentId,
        profileId,
        createdBy: user.sub.id,
      })

    return userWithoutPassword
  }
}
