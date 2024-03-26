import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { Either, success } from '@/core/either'

import { DepartmentsRepository } from '../../repositories/departments-repository'

interface FetchDepartmentsUseCaseRequest {
  page: number
}

type FetchDepartmentsUseCaseResponse = Either<
  null,
  {
    departments: Department[]
  }
>

@Injectable()
export class FetchDepartmentsUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    page,
  }: FetchDepartmentsUseCaseRequest): Promise<FetchDepartmentsUseCaseResponse> {
    const departments = await this.departmentsRepository.findMany({
      page,
    })

    return success({
      departments,
    })
  }
}
