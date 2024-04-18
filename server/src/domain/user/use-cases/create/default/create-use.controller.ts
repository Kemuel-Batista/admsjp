import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { UserStatus } from '@/domain/user/enums/user-status'
import { UserWithoutPassword } from '@/domain/user/types/UserWithoutPassword'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { CreateUserUseCase } from './create-user'

const createUserSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20),
  name: z.string().min(3).max(50),
  status: z.nativeEnum(UserStatus),
  profileId: z.number().int().positive(),
})

type CreateUserBodySchema = z.infer<typeof createUserSchema>

const bodyValidationPipe = new ZodValidationPipe(createUserSchema)

@Controller('/')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

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
      profileId,
    } = body

    const userWithoutPassword: UserWithoutPassword =
      await this.createUser.execute({
        username,
        email,
        name,
        password,
        status,
        profileId,
        createdBy: user.sub.id,
      })

    return userWithoutPassword
  }
}
