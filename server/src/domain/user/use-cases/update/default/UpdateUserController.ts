import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { UpdateUserUseCase } from './UpdateUserUseCase'

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, username, password, status, profileId } = request.body
    const { user } = request

    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    const { password: responsePassword, ...userWithoutPassword } =
      await updateUserUseCase.execute({
        id,
        name,
        username,
        password,
        status,
        profileId,
        updatedBy: user.id,
      })

    return response.status(HttpStatusCode.OK).json(userWithoutPassword)
  }
}

export { UpdateUserController }
