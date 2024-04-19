import { Department } from '@prisma/client'

export interface ListDepartmentDTO {
  departments: Department[]
  count: number
}
