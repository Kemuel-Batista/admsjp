import { ChurchDepartment } from '@/domain/admsjp/enterprise/entities/church-department'

export class ChurchDepartmentPresenter {
  static toHTTP(churchDepartment: ChurchDepartment) {
    return {
      id: churchDepartment.id.toString(),
      departmentId: churchDepartment.departmentId,
      username: churchDepartment.username,
    }
  }
}
