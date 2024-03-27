import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ChurchDepartment } from '@/domain/admsjp/enterprise/entities/church-department'
import { ChurchDepartmentList } from '@/domain/admsjp/enterprise/entities/church-department-list'

import { HashGenerator } from '../../cryptography/hash-generator'
import { PasswordGenerator } from '../../cryptography/password-generator'
import { ChurchDepartmentsRepository } from '../../repositories/church-departments-repository'
import { ChurchsRepository } from '../../repositories/churchs-repository'
import { DepartmentsRepository } from '../../repositories/departments-repository'

interface EditChurchUseCaseRequest {
  churchId: string
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

type EditChurchUseCaseResponse = Either<ResourceAlreadyExistsError, null>

@Injectable()
export class EditChurchUseCase {
  constructor(
    private churchsRepository: ChurchsRepository,
    private departmentsRepository: DepartmentsRepository,
    private churchDepartmentsRepository: ChurchDepartmentsRepository,
    private passwordGenerator: PasswordGenerator,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    churchId,
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
  }: EditChurchUseCaseRequest): Promise<EditChurchUseCaseResponse> {
    const church = await this.churchsRepository.findById(churchId)

    if (!church) {
      return failure(new ResourceNotFoundError('Church'))
    }

    if (church.name !== name) {
      const churchAlreadyExists = await this.churchsRepository.findByName(name)

      if (churchAlreadyExists) {
        return failure(new ResourceAlreadyExistsError('Church'))
      }

      church.name = name
    }

    church.description = description
    church.street = street
    church.neighborhood = neighborhood
    church.city = city
    church.state = state
    church.postalCode = postalCode
    church.number = number
    church.latitude = latitude
    church.longitude = longitude

    const currentChurchDepartments =
      await this.churchDepartmentsRepository.findManyByChurchId(churchId)

    const churchDepartmentList = new ChurchDepartmentList(
      currentChurchDepartments,
    )

    const departments = await this.departmentsRepository.findAll()

    const churchDepartmentsPromises = departments.map(async (department) => {
      const username = `admsjp.${church.name.toLowerCase()}.${department.name.toLowerCase()}`
      const password = await this.passwordGenerator.generate()
      const hashedPassword = await this.hashGenerator.hash(password)

      // Verificar se o username já existe na lista atual de itens
      const existingChurchDepartment = churchDepartmentList
        .getItems()
        .find(
          (churchDepartmentItem) => churchDepartmentItem.username === username,
        )
      if (!existingChurchDepartment) {
        return ChurchDepartment.create({
          churchId: church.id,
          departmentId: new UniqueEntityID(department.id),
          username,
          password: hashedPassword,
        })
      }
    })

    const churchDepartments = await Promise.all(churchDepartmentsPromises)

    churchDepartmentList.update(churchDepartments)
    church.departments = churchDepartmentList

    await this.churchsRepository.save(church)

    return success(null)
  }
}
