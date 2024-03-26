import { ChurchDepartment } from '../../enterprise/entities/church-department'

export abstract class ChurchDepartmentsRepository {
  abstract findById(id: string): Promise<ChurchDepartment | null>
  abstract findByChurchIdAndDepartmentId(
    churchId: string,
    departmentId: string,
  ): Promise<ChurchDepartment | null>

  abstract create(churchDepartment: ChurchDepartment): Promise<void>
  abstract save(churchDepartment: ChurchDepartment): Promise<void>
  abstract delete(churchDepartment: ChurchDepartment): Promise<void>
}
