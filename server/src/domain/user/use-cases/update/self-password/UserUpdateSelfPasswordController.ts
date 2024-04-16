import { updateSelfPassword } from '@modules/user/schemas/userSchema'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { zodSchemaValidation } from '@shared/util/zod/zodSchemaValidation'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { UserUpdateSelfPasswordUseCase } from './UserUpdateSelfPasswordUseCase'

class UserUpdateSelfPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { oldPassword, newPassword } = request.body
    const { user } = request

    const userUpdateSelfPasswordUseCase = container.resolve(
      UserUpdateSelfPasswordUseCase,
    )

    zodSchemaValidation(updateSelfPassword, {
      oldPassword,
      newPassword,
    })

    await userUpdateSelfPasswordUseCase.execute(
      user.id,
      oldPassword,
      newPassword,
    )

    return response.status(HttpStatusCode.NO_CONTENT).send()
  }
}

export { UserUpdateSelfPasswordController }
