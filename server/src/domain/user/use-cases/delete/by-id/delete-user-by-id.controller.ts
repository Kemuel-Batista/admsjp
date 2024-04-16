import { deleteUserSchema } from '@modules/user/schemas/userSchema'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { zodSchemaValidation } from '@shared/util/zod/zodSchemaValidation'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { DeleteUserByIdUseCase } from './DeleteUserByIdUseCase'

class DeleteUserByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params
    const { user } = request

    const parsedUserId = Number(userId)

    zodSchemaValidation(deleteUserSchema, {
      userId: parsedUserId,
    })

    const deleteUserByIdUseCase = container.resolve(DeleteUserByIdUseCase)

    await deleteUserByIdUseCase.execute(parsedUserId, user.id)

    return response.status(HttpStatusCode.NO_CONTENT).send()
  }
}

export { DeleteUserByIdController }
