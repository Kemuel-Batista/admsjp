import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase'

class UpdateUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, password } = request.body
    const { user } = request

    const updateUserPasswordUseCase = container.resolve(
      UpdateUserPasswordUseCase,
    )

    await updateUserPasswordUseCase.execute(id, password, user.id)

    return response.status(HttpStatusCode.OK).end()
  }
}

export { UpdateUserPasswordController }
