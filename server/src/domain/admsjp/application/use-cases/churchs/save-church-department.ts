import { Either, failure, success } from '@/core/either'
import { ChurchsRepository } from '../../repositories/churchs-repository'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PasswordGenerator } from '../../cryptography/password-generator'
import { HashGenerator } from '../../cryptography/hash-generator'
import { ChurchDepartmentsRepository } from '../../repositories/church-departments-repository'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { ChurchDepartment } from '@/domain/admsjp/enterprise/entities/church-department'
import { ChurchDepartmentMember } from '@/domain/admsjp/enterprise/entities/church-department-member'
import { ChurchDepartmentMemberList } from '@/domain/admsjp/enterprise/entities/church-department-member-list'

interface SaveChurchDepartmentUseCaseRequest {
  churchId: string
  departmentId: string
  members: {
    churchDepartmentId: string
    name: string
    functionName: string
    subFunction: string
    phone: string
    email: string
  }[]
}

type SaveChurchDepartmentUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  null
>

@Injectable()
export class SaveChurchDepartmentUseCase {
  constructor(
    private churchsRepository: ChurchsRepository,
    private departmentsRepository: DepartmentsRepository,
    private churchDepartmentsRepository: ChurchDepartmentsRepository,
    private passwordGenerator: PasswordGenerator,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    churchId,
    departmentId,
    members,
  }: SaveChurchDepartmentUseCaseRequest): Promise<SaveChurchDepartmentUseCaseResponse> {
    const church = await this.churchsRepository.findById(churchId)

    if (!church) {
      return failure(new ResourceNotFoundError('Church'))
    }

    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(new ResourceNotFoundError('Department'))
    }

    const churchDepartment =
      await this.churchDepartmentsRepository.findByChurchIdAndDepartmentId(
        churchId,
        departmentId,
      )

    if (!churchDepartment) {
      const username = `admsjp.${church.name.toLowerCase()}.${department.name.toLowerCase()}`

      const password = await this.passwordGenerator.generate()

      const hashedPassword = await this.hashGenerator.hash(password)

      const newChurchDepartment = ChurchDepartment.create({
        churchId: church.id,
        departmentId: new UniqueEntityID(departmentId),
        username,
        password: hashedPassword,
      })

      await this.churchDepartmentsRepository.create(newChurchDepartment)
    }

    const churchDepartmentId = churchDepartment.id

    const churchDepartmentMembers = members.map((member) => {
      return ChurchDepartmentMember.create({
        churchDepartmentId,
        subFunction: member.subFunction,
        email: member.email,
        name: member.name,
        phone: member.phone,
        functionName: member.functionName,
      })
    })

    churchDepartment.members = new ChurchDepartmentMemberList(
      churchDepartmentMembers,
    )

    await this.churchDepartmentsRepository.save(churchDepartment)

    return success(null)
  }
}
