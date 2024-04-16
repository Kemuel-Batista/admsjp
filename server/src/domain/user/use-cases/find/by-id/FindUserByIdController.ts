import { findUserByIdSchema } from '@modules/user/schemas/userSchema'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { zodSchemaValidation } from '@shared/util/zod/zodSchemaValidation'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { FindUserByIdUseCase } from './FindUserByIdUseCase'

class FindUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params

    const parsedUserId = Number(userId)

    zodSchemaValidation(findUserByIdSchema, {
      userId: parsedUserId,
    })

    const findUserByIdUseCase = container.resolve(FindUserByIdUseCase)

    const user = await findUserByIdUseCase.execute(parsedUserId, {
      throwIfNotFound: true,
    })

    const { password, ...userWithoutPassword } = user

    return response.status(HttpStatusCode.OK).json(userWithoutPassword)
  }
}

export { FindUserByIdController }
