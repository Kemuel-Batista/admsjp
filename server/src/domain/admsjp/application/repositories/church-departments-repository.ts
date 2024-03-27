import { ChurchDepartment } from '../../enterprise/entities/church-department'

export abstract class ChurchDepartmentsRepository {
  abstract createMany(churchDepartments: ChurchDepartment[]): Promise<void>
  abstract deleteMany(churchDepartments: ChurchDepartment[]): Promise<void>
  abstract findManyByChurchId(churchId: string): Promise<ChurchDepartment[]>
  abstract deleteManyByChurchId(churchId: string): Promise<void>
  abstract save(churchDepartment: ChurchDepartment): Promise<void>
}
