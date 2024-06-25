import { PaginateParams, usePaginateQuery } from '@/hooks/use-paginate-query'

import { Department } from '../types/department'

export interface ListDepartmentServiceResponse {
  departments: Department
}

export const ListDepartmentService = (params: PaginateParams) => {
  return usePaginateQuery<ListDepartmentServiceResponse>(
    'departments',
    '/departments',
    params,
  )
}
