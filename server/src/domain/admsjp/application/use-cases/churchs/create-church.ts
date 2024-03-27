import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { Church } from '@/domain/admsjp/enterprise/entities/church'
import { ChurchDepartment } from '@/domain/admsjp/enterprise/entities/church-department'
import { ChurchDepartmentList } from '@/domain/admsjp/enterprise/entities/church-department-list'

import { HashGenerator } from '../../cryptography/hash-generator'
import { PasswordGenerator } from '../../cryptography/password-generator'
import { ChurchsRepository } from '../../repositories/churchs-repository'
import { DepartmentsRepository } from '../../repositories/departments-repository'

interface CreateChurchUseCaseRequest {
  name: string
  description: string
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  number: string
  latitude: number
  longitude: number
}

type CreateChurchUseCaseResponse = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class CreateChurchUseCase {
  constructor(
    private churchsRepository: ChurchsRepository,
    private departmentsRepository: DepartmentsRepository,
    private passwordGenerator: PasswordGenerator,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    description,
    street,
    neighborhood,
    city,
    state,
    postalCode,
    number,
    latitude,
    longitude,
  }: CreateChurchUseCaseRequest): Promise<CreateChurchUseCaseResponse> {
    const churchAlreadyExists = await this.churchsRepository.findByName(name)

    if (churchAlreadyExists) {
      return failure(new ResourceAlreadyExistsError('Church'))
    }

    // admsjp.name-church
    const username = `admsjp.${name.toLowerCase()}`

    const password = await this.passwordGenerator.generate()

    const hashedPassword = await this.hashGenerator.hash(password)

    const church = Church.create({
      name,
      description,
      street,
      neighborhood,
      city,
      state,
      postalCode,
      number,
      latitude,
      longitude,
      username,
      password: hashedPassword,
    })

    const departments = await this.departmentsRepository.findAll()

    const churchDepartmentsPromises = departments.map(async (department) => {
      const username = `admsjp.${church.name.toLowerCase()}.${department.name.toLowerCase()}`
      const password = await this.passwordGenerator.generate()
      const hashedPassword = await this.hashGenerator.hash(password)

      return ChurchDepartment.create({
        churchId: church.id,
        departmentId: new UniqueEntityID(department.id),
        username,
        password: hashedPassword,
      })
    })

    const churchDepartments = await Promise.all(churchDepartmentsPromises)

    church.departments = new ChurchDepartmentList(churchDepartments)

    await this.churchsRepository.create(church)

    return success(null)
  }
}
