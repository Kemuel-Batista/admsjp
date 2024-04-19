import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { ListDepartmentDTO } from '@/domain/departments/dtos/list-department.dto'
import { DepartmentsRepository } from '@/domain/departments/repositories/departments-repository'
import { UserProfile } from '@/domain/user/enums/user-profile'
import { UserWithPermission } from '@/domain/user/types/user-with-permission'

@Injectable()
export class ListDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute(
    options: IListOptions = {},
    searchParams: ISearchParamDTO[] = [],
    departmentId: UserWithPermission['departmentId'],
  ): Promise<ListDepartmentDTO> {
    if (departmentId !== UserProfile.ADMINISTRADOR) {
      searchParams.push({
        condition: 'equals',
        field: 'visible',
        value: 1,
      })
    }

    const { departments, count } = await this.departmentsRepository.list(
      options,
      searchParams,
    )

    return { departments, count }
  }
}
