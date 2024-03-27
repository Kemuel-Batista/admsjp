import { ChurchDepartmentDetails } from '@/domain/admsjp/enterprise/entities/value-objects/church-department-details'

export class ChurchDepartmentDetailsPresenter {
  static toHTTP(churchDepartment: ChurchDepartmentDetails) {
    return {
      id: churchDepartment.churchDepartmentId.toString(),
      departmentName: churchDepartment.departmentName,
      username: churchDepartment.username,
    }
  }
}
