import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { Church } from '@/domain/admsjp/enterprise/entities/church'

import { HashGenerator } from '../../cryptography/hash-generator'
import { PasswordGenerator } from '../../cryptography/password-generator'
import { ChurchsRepository } from '../../repositories/churchs-repository'

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

    await this.churchsRepository.create(church)

    return success(null)
  }
}
