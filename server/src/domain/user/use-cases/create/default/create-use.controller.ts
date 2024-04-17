import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { UserStatus } from '@/domain/user/enums/user-status'
import { UserWithoutPassword } from '@/domain/user/types/UserWithoutPassword'
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
    @Req() request: Request,
  ) {
    const {
      username,
      email,
      name,
      password,
      status = UserStatus.ACTIVE,
      profileId,
    } = body
    const { user } = request

    const userWithoutPassword: UserWithoutPassword =
      await this.createUser.execute({
        username,
        email,
        name,
        password,
        status,
        profileId,
        createdBy: user.id,
      })

    return userWithoutPassword
  }
}
