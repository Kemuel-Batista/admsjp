import { updateStatusUser } from '@modules/user/schemas/userSchema'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { zodSchemaValidation } from '@shared/util/zod/zodSchemaValidation'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { UpdateStatusUserUseCase } from './UpdateStatusUserUseCase'

class UpdateStatusUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, status } = request.params
    const { user } = request

    const parsedUserId = Number(userId)
    const parsedStatus = Number(status)

    zodSchemaValidation(updateStatusUser, {
      userId: parsedUserId,
      status: parsedStatus,
    })

    const updateStatusUserUseCase = container.resolve(UpdateStatusUserUseCase)

    await updateStatusUserUseCase.execute({
      id: parsedUserId,
      status: parsedStatus,
      updatedBy: user.id,
    })

    return response.status(HttpStatusCode.OK).send()
  }
}

export { UpdateStatusUserController }
