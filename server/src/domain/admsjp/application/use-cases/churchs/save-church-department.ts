import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ChurchDepartmentMember } from '@/domain/admsjp/enterprise/entities/church-department-member'
import { ChurchDepartmentMemberList } from '@/domain/admsjp/enterprise/entities/church-department-member-list'

import { ChurchDepartmentMembersRepository } from '../../repositories/church-department-members-repository'
import { ChurchDepartmentsRepository } from '../../repositories/church-departments-repository'

interface SaveChurchDepartmentUseCaseRequest {
  churchDepartmentId: string
  members: {
    name?: string
    functionName?: string
    subFunction?: string
    phone?: string
    email?: string
    birthday?: Date
  }[]
}

type SaveChurchDepartmentUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  null
>

@Injectable()
export class SaveChurchDepartmentUseCase {
  constructor(
    private churchDepartmentsRepository: ChurchDepartmentsRepository,
    private churchDepartmentMembersRepository: ChurchDepartmentMembersRepository,
  ) {}

  async execute({
    churchDepartmentId,
    members,
  }: SaveChurchDepartmentUseCaseRequest): Promise<SaveChurchDepartmentUseCaseResponse> {
    const churchDepartment =
      await this.churchDepartmentsRepository.findById(churchDepartmentId)

    if (!churchDepartment) {
      return failure(new ResourceNotFoundError('Church Department'))
    }

    const currentChurchDepartmentMembers =
      await this.churchDepartmentMembersRepository.findManyByChurchDepartmentId(
        churchDepartmentId,
      )

    const churchDepartmentsList = new ChurchDepartmentMemberList(
      currentChurchDepartmentMembers,
    )

    const churchDepartmentMembers = members.map((member) => {
      return ChurchDepartmentMember.create({
        churchDepartmentId: churchDepartment.id,
        subFunction: member.subFunction,
        email: member.email,
        name: member.name,
        phone: member.phone,
        functionName: member.functionName,
        birthday: member.birthday,
      })
    })

    churchDepartmentsList.update(churchDepartmentMembers)

    churchDepartment.members = churchDepartmentsList

    await this.churchDepartmentsRepository.save(churchDepartment)

    return success(null)
  }
}
