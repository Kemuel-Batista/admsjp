import { ChurchDepartmentDetails } from '@/domain/admsjp/enterprise/entities/value-objects/church-department-details'

import { ChurchDepartmentMemberPresenter } from './church-department-member-presenter'

export class ChurchDepartmentDetailsPresenter {
  static toHTTP(churchDepartment: ChurchDepartmentDetails) {
    return {
      id: churchDepartment.churchDepartmentId.toString(),
      departmentName: churchDepartment.departmentName,
      username: churchDepartment.username,
      members: churchDepartment.members.map(
        ChurchDepartmentMemberPresenter.toHTTP,
      ),
    }
  }
}
