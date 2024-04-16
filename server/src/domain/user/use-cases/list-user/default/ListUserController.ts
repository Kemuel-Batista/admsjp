import { listUserSchema } from '@modules/user/schemas/userSchema'
import HttpStatusCode from '@shared/enums/HttpStatusCode'
import { zodSchemaValidation } from '@shared/util/zod/zodSchemaValidation'
import { type Request, type Response } from 'express'
import { container } from 'tsyringe'

import { ListUserUseCase } from './ListUserUseCase'

interface IRequestQuery {
  allRecords?: boolean
  page?: number
  pageSize?: number
}

class ListUserController {
  async handle(
    request: Request<IRequestQuery>,
    response: Response,
  ): Promise<Response> {
    const { allRecords, page, pageSize } = request.query
    const { search } = request.cookies

    const parsedSearch = search ? JSON.parse(search) : []
    const parsedPage = page ? Number(page) : undefined
    const parsedPageSize = pageSize ? Number(pageSize) : undefined
    const parsedAllRecords = allRecords === 'true'

    zodSchemaValidation(listUserSchema, {
      allRecords: parsedAllRecords,
      page: parsedPage,
      pageSize: parsedPageSize,
    })

    const options = {
      page: parsedPage,
      pageSize: parsedPageSize,
      allRecords: parsedAllRecords,
    }

    const listUserUseCase = container.resolve(ListUserUseCase)

    const { users, count } = await listUserUseCase.execute(
      options,
      parsedSearch,
    )

    response.header('X-Total-Count', String(count))

    return response.status(HttpStatusCode.OK).json(users)
  }
}

export { ListUserController }
