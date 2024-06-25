import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/axios'

import { Department } from '../types/department'

export interface GetDepartmentByIdServiceResponse {
  department: Department
}

export const GetDepartmentByIdService: unknown = (id: number) => {
  return useQuery({
    queryKey: ['department-details', id],
    queryFn: async () => {
      const response = await api.get<GetDepartmentByIdServiceResponse>(
        `/departments/${id}`,
      )

      return response.data
    },
    enabled: Boolean(id),
  })
}
