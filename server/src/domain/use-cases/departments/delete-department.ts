import { Either, failure, success } from '@/core/either'
import { DepartmentAlreadyExistsError } from './errors/department-already-exists-error'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteDepartmentUseCaseRequest {
  departmentId: string
}

type DeleteDepartmentUseCaseResponse = Either<
  ResourceNotFoundError | DepartmentAlreadyExistsError,
  null
>

@Injectable()
export class DeleteDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    departmentId,
  }: DeleteDepartmentUseCaseRequest): Promise<DeleteDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError('Department'))
    }

    department.deletedAt = new Date()

    await this.departmentsRepository.save(department)

    return success(null)
  }
}
