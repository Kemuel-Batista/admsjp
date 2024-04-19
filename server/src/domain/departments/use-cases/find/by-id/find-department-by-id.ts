import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { DepartmentsRepository } from '@/domain/departments/repositories/departments-repository'

type TFindDepartmentByIdUseCase<Options extends IFindOptions> =
  | Department
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
class FindDepartmentByIdUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute<Options extends IFindOptions>(
    id: Department['id'],
    options: Partial<Options> = {},
  ): Promise<TFindDepartmentByIdUseCase<Options>> {
    const {
      throwIfNotFound = false,
      errorKeyNotFound = 'department.find.notFound',
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let department: Department | null = null
    if (id) {
      department = await this.departmentsRepository.findById(id)
    }

    if (throwIfNotFound && !department) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { department: id }),

        errorCodeNotFound,
      )
    }

    return department as TFindDepartmentByIdUseCase<Options>
  }
}

export { FindDepartmentByIdUseCase }
