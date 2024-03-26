import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'

import { DepartmentsRepository } from '../../repositories/departments-repository'
import { DepartmentAlreadyExistsError } from './errors/department-already-exists-error'

interface CreateDepartmentUseCaseRequest {
  name: string
  description: string
}

type CreateDepartmentUseCaseResponse = Either<
  DepartmentAlreadyExistsError,
  null
>

@Injectable()
export class CreateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    name,
    description,
  }: CreateDepartmentUseCaseRequest): Promise<CreateDepartmentUseCaseResponse> {
    const departmentWithSameName =
      await this.departmentsRepository.findByName(name)

    if (departmentWithSameName) {
      return failure(new DepartmentAlreadyExistsError(name))
    }

    await this.departmentsRepository.create({
      name,
      description,
    })

    return success(null)
  }
}
