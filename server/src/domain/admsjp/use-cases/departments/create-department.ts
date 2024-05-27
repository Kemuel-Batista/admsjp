import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { CreateDepartmentDTO } from '@/domain/admsjp/dtos/department'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'

type CreateDepartmentUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    department: Department
  }
>

@Injectable()
export class CreateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    name,
    description,
    status = 1,
    visible = 1,
    createdBy,
  }: CreateDepartmentDTO): Promise<CreateDepartmentUseCaseResponse> {
    const departmentAlreadyExists =
      await this.departmentsRepository.findByName(name)

    if (departmentAlreadyExists) {
      return failure(
        new ResourceAlreadyExistsError({
          errorKey: 'department.create.keyAlreadyExists',
          key: name,
        }),
      )
    }

    const department = await this.departmentsRepository.create({
      name,
      description,
      status,
      visible,
      createdBy,
    })

    return success({
      department,
    })
  }
}
