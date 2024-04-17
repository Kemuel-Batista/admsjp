import { Body, Controller, HttpCode, Put, Req } from '@nestjs/common'
import { Request } from 'express'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { UserStatus } from '@/domain/user/enums/user-status'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { UpdateUserUseCase } from './update-user'

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

@Controller()
export class UpdateUserController {
  constructor(private updateUser: UpdateUserUseCase) {}

  @Put()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @Req() request: Request,
  ) {
    const { id, name, username, password, status, profileId } = body
    const { user } = request

    const { ...userWithoutPassword } = await this.updateUser.execute({
      id,
      name,
      username,
      password,
      status,
      profileId,
      updatedBy: user.id,
    })

    delete userWithoutPassword.password

    return userWithoutPassword
  }
}
