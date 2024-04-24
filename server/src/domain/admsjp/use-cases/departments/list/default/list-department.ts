import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { ListDepartmentDTO } from '@/domain/admsjp/dtos/department'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission'

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
