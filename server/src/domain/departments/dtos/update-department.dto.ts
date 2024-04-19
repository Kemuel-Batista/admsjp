import { Department } from '@prisma/client'

export interface UpdateDepartmentDTO {
  id: Department['id']
  name: Department['name']
  description: Department['description']
  status: Department['status']
  visible: Department['visible']
  updatedBy: Department['updatedBy']
}
