import { api } from '@/lib/axios'

interface CreateDepartmentBody {
  name: string
  description: string
}

export const createDepartment = async ({
  name,
  description,
}: CreateDepartmentBody) => {
  await api.post('/departments', {
    name,
    description,
  })
}
