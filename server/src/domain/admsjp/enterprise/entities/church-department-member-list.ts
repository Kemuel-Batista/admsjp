import { WatchedList } from '@/core/entities/watched-list'

import { ChurchDepartmentMember } from './church-department-member'

export class ChurchDepartmentMemberList extends WatchedList<ChurchDepartmentMember> {
  compareItems(a: ChurchDepartmentMember, b: ChurchDepartmentMember): boolean {
    return (
      a.churchDepartmentId.equals(b.churchDepartmentId) &&
      a.name === b.name &&
      a.functionName === b.functionName &&
      a.subFunction === b.subFunction &&
      a.phone === b.phone &&
      a.email === b.email &&
      a.birthday === b.birthday
    )
  }
}
