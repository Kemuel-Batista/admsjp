import { ChurchDepartmentMember } from '../../enterprise/entities/church-department-member'

export abstract class ChurchDepartmentMembersRepository {
  abstract createMany(
    churchDepartmentMembers: ChurchDepartmentMember[],
  ): Promise<void>

  abstract deleteMany(
    churchDepartmentMembers: ChurchDepartmentMember[],
  ): Promise<void>

  abstract findManyByChurchDepartmentId(
    churchDepartmentId: string,
  ): Promise<ChurchDepartmentMember[]>

  abstract deleteManyByChurchDepartmentId(
    churchDepartmentId: string,
  ): Promise<void>
}
