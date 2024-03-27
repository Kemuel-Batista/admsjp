import { api } from '@/lib/axios'

export interface DepartmentProps {
  id: string
  name: string
  description: string
}

export interface FetchDepartmentsResponse {
  departments: DepartmentProps[]
}

export async function fetchDepartments() {
  const response = await api.get<FetchDepartmentsResponse>('/departments')

  return response.data
}
