import { UserProfile } from '@modules/user/enums/UserProfile'
import { UserStatus } from '@modules/user/enums/UserStatus'
import { createUserSchema } from '@modules/user/schemas/userSchema'
import { type UserWithoutPassword } from '@modules/user/types/UserWithoutPassword'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { zodSchemaValidation } from '@shared/util/zod/zodSchemaValidation'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      username,
      name,
      password,
      status = UserStatus.ACTIVE,
      profileId,
    } = request.body
    const { user } = request

    const createUserUseCase = container.resolve(CreateUserUseCase)

    zodSchemaValidation(createUserSchema, {
      username,
      name,
      password,
      status,
      profileId,
    })

    const userWithoutPassword: UserWithoutPassword =
      await createUserUseCase.execute({
        username,
        name,
        password,
        status,
        profileId,
        createdBy: user.id,
      })

    return response.status(HttpStatusCode.CREATED).json(userWithoutPassword)
  }
}

export { CreateUserController }
