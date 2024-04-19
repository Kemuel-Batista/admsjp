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
export class FindDepartmentByNameUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute<Options extends IFindOptions>(
    name: Department['name'],
    options: IFindOptions = {},
  ): Promise<TFindDepartmentByIdUseCase<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'department.create.keyAlreadyExists',
      errorKeyNotFound = 'department.find.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    let department: Department | null = null

    if (name) {
      department = await this.departmentsRepository.findByName(name)
    }

    if (throwIfFound && department) {
      throw new AppError(i18n.t(errorKeyFound, { name }), errorCodeFound)
    }

    if (throwIfNotFound && !department) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { department: name }),

        errorCodeNotFound,
      )
    }

    return department as TFindDepartmentByIdUseCase<Options>
  }
}
