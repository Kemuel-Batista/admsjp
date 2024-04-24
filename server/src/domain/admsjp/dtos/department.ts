import { Department } from '@prisma/client'

export interface ListDepartmentDTO {
  departments: Department[]
  count: number
}

export interface UpdateDepartmentDTO {
  id: Department['id']
  name: Department['name']
  description: Department['description']
  status: Department['status']
  visible: Department['visible']
  updatedBy: Department['updatedBy']
}

export interface CreateDepartmentDTO {
  name: Department['name']
  description: Department['description']
  status: Department['status']
  visible: Department['visible']
  createdBy: Department['createdBy']
}
