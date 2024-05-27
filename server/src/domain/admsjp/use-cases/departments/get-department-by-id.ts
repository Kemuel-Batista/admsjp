import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'

interface GetDepartmentByIdUseCaseRequest {
  id: Department['id']
}

type GetDepartmentByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    department: Department
  }
>

@Injectable()
export class GetDepartmentByIdUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    id,
  }: GetDepartmentByIdUseCaseRequest): Promise<GetDepartmentByIdUseCaseResponse> {
    const department = await this.departmentsRepository.findById(id)

    if (!department) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'department.find.notFound',
          key: String(id),
        }),
      )
    }

    return success({
      department,
    })
  }
}
