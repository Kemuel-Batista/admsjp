import { WatchedList } from '@/core/entities/watched-list'
import { ChurchDepartmentMember } from './church-department-member'

export class ChurchDepartmentMemberList extends WatchedList<ChurchDepartmentMember> {
  compareItems(a: ChurchDepartmentMember, b: ChurchDepartmentMember): boolean {
    // If the churdDepartmentId is equaland name of leader is equal
    return (
      a.churchDepartmentId.equals(b.churchDepartmentId) && a.name === b.name
    )
  }
}
