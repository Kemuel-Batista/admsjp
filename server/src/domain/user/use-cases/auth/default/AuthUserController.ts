import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { AuthUserUseCase } from './AuthUserUseCase'

class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const authUserUseCase = container.resolve(AuthUserUseCase)

    const token = await authUserUseCase.execute({ username, password })

    return response.status(HttpStatusCode.OK).json(token)
  }
}

export { AuthUserController }
