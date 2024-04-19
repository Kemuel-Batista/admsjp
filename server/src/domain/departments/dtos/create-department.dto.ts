import { Department } from '@prisma/client'

export interface CreateDepartmentDTO {
  name: Department['name']
  description: Department['description']
  status: Department['status']
  visible: Department['visible']
  createdBy: Department['createdBy']
}
