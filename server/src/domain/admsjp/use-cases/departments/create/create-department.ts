import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { CreateDepartmentDTO } from '@/domain/admsjp/dtos/department'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'

import { FindDepartmentByNameUseCase } from '../find/by-name/find-department-by-name'

@Injectable()
export class CreateDepartmentUseCase {
  constructor(
    private departmentsRepository: DepartmentsRepository,
    private findDepartmentByName: FindDepartmentByNameUseCase,
  ) {}

  async execute({
    name,
    description,
    status = 1,
    visible = 1,
    createdBy,
  }: CreateDepartmentDTO): Promise<Department> {
    await this.findDepartmentByName.execute(name, {
      throwIfFound: true,
    })

    const department = await this.departmentsRepository.create({
      name,
      description,
      status,
      visible,
      createdBy,
    })

    return department
  }
}
