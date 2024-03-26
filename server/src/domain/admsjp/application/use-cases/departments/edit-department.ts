import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { DepartmentsRepository } from '../../repositories/departments-repository'
import { DepartmentAlreadyExistsError } from './errors/department-already-exists-error'

interface EditDepartmentUseCaseRequest {
  departmentId: string
  name: string
  description: string
}

type EditDepartmentUseCaseResponse = Either<
  ResourceNotFoundError | DepartmentAlreadyExistsError,
  null
>

@Injectable()
export class EditDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    departmentId,
    name,
    description,
  }: EditDepartmentUseCaseRequest): Promise<EditDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError('Department'))
    }

    if (department.name !== name) {
      const departmentWithSameName =
        await this.departmentsRepository.findByName(name)

      if (departmentWithSameName) {
        return failure(new DepartmentAlreadyExistsError(name))
      }

      department.name = name
    }

    department.description = description

    await this.departmentsRepository.save(department)

    return success(null)
  }
}
