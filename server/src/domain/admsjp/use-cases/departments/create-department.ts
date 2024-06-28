import { Injectable } from '@nestjs/common'
import { Department, User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'

interface CreateDepartmentUseCaseRequest {
  name: Department['name']
  description: Department['name']
  status: Department['status']
  visible: Department['visible']
  createdBy: User['id']
}

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
  }: CreateDepartmentUseCaseRequest): Promise<CreateDepartmentUseCaseResponse> {
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
