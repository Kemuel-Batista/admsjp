import { Injectable } from '@nestjs/common'
import { Department, User } from '@prisma/client'

import { FindUserByIdUseCase } from '@/domain/user/use-cases/find/by-id/find-user-by-id'

import { FindDepartmentByIdUseCase } from '../by-id/find-department-by-id'

@Injectable()
export class FindDepartmentByUserUseCase {
  constructor(
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findDepartmentByIdUseCase: FindDepartmentByIdUseCase,
  ) {}

  async execute(userId: User['id']): Promise<Department> {
    const user = await this.findUserByIdUseCase.execute(userId, {
      throwIfNotFound: true,
    })

    const department = await this.findDepartmentByIdUseCase.execute(
      user.departmentId,
      {
        throwIfNotFound: true,
      },
    )

    return department
  }
}
