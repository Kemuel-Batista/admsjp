import { Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { Either, success } from '@/core/either'
import { IListOptions } from '@/core/repositories/list-options'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission'

interface ListDepartmentUseCaseRequest {
  options: IListOptions
  searchParams: ISearchParamDTO[]
  profileId: UserWithPermission['profileId']
}

type ListDepartmentUseCaseResponse = Either<
  null,
  {
    departments: Department[]
    count: number
  }
>

@Injectable()
export class ListDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    profileId,
    options = {},
    searchParams = [],
  }: ListDepartmentUseCaseRequest): Promise<ListDepartmentUseCaseResponse> {
    if (profileId !== UserProfile.ADMINISTRADOR) {
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

    return success({ departments, count })
  }
}
