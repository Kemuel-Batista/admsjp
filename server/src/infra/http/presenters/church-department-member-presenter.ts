import { ChurchDepartmentMember } from '@/domain/admsjp/enterprise/entities/church-department-member'

export class ChurchDepartmentMemberPresenter {
  static toHTTP(churchDepartmentMember: ChurchDepartmentMember) {
    return {
      id: churchDepartmentMember.id.toString(),
      name: churchDepartmentMember.name,
      functionName: churchDepartmentMember.functionName,
      subFunction: churchDepartmentMember.subFunction,
      phone: churchDepartmentMember.phone,
      email: churchDepartmentMember.email,
      birthday: churchDepartmentMember.birthday,
    }
  }
}
