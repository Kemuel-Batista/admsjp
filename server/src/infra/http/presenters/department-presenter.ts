import { Department } from '@prisma/client'

export class DepartmentPresenter {
  static toHTTP(department: Department) {
    return {
      id: department.id.toString(),
      name: department.name,
      description: department.description,
    }
  }
}
