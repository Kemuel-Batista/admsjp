import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { Either, success } from '@/core/either'
import { ListOptions } from '@/core/repositories/list-options'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'

interface ListDepartmentUseCaseRequest {
  options: ListOptions
}

type ListDepartmentUseCaseResponse = Either<
  null,
  {
    departments: Department[]
  }
>

@Injectable()
export class ListDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    options = {},
  }: ListDepartmentUseCaseRequest): Promise<ListDepartmentUseCaseResponse> {
    const departments = await this.departmentsRepository.list(options)

    return success({ departments })
  }
}
