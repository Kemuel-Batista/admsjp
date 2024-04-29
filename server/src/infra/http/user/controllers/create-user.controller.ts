import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

import { UserProfile, UserStatus } from '@/domain/admsjp/enums/user'
import { UserWithoutPassword } from '@/domain/admsjp/types/user/user-without-password'
import { CreateUserUseCase } from '@/domain/admsjp/use-cases/user/create/default/create-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

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
  @HttpCode(HttpStatus.CREATED)
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
