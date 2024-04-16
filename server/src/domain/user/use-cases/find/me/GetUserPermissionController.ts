import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { GetUserPermissionsUseCase } from './GetUserPermissionsUseCase'

class GetUserPermissionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request

    const getUserPermissionUseCase = container.resolve(
      GetUserPermissionsUseCase,
    )

    const userPermission = await getUserPermissionUseCase.execute(user.id)

    return response.status(HttpStatusCode.OK).json(userPermission)
  }
}

export { GetUserPermissionController }
