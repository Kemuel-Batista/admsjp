import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { DepartmentsRepository } from '../../repositories/departments-repository'

interface FindDepartmentByNameUseCaseRequest {
  name: Department['name']
}

type FindDepartmentByNameUseCaseResponse = Department

@Injectable()
export class FindDepartmentByNameUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    name,
  }: FindDepartmentByNameUseCaseRequest): Promise<FindDepartmentByNameUseCaseResponse> {
    const department = await this.departmentsRepository.findByName(name)

    if (!department) {
      throw new Error(`Profile with name ${name} not found`)
    }

    return department
  }
}
