import { WatchedList } from '@/core/entities/watched-list'

import { ChurchDepartment } from './church-department'

export class ChurchDepartmentList extends WatchedList<ChurchDepartment> {
  compareItems(a: ChurchDepartment, b: ChurchDepartment): boolean {
    return (
      a.churchId.equals(b.churchId) &&
      a.departmentId.equals(b.departmentId) &&
      a.username === b.username
    )
  }
}
