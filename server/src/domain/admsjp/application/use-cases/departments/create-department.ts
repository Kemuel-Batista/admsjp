import { Either, failure, success } from '@/core/either'
import { DepartmentAlreadyExistsError } from './errors/department-already-exists-error'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { Injectable } from '@nestjs/common'

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
