import { Department } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'

import { CreateDepartmentDTO } from '../dtos/create-department.dto'
import { ListDepartmentDTO } from '../dtos/list-department.dto'
import { UpdateDepartmentDTO } from '../dtos/update-department.dto'

export abstract class DepartmentsRepository {
  abstract create(data: CreateDepartmentDTO): Promise<Department>
  abstract update(data: UpdateDepartmentDTO): Promise<Department>
  abstract list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListDepartmentDTO>

  abstract findById(id: Department['id']): Promise<Department | null>
  abstract findByName(name: Department['name']): Promise<Department | null>
}
