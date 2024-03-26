import { Either, failure, success } from '@/core/either'
import { ChurchsRepository } from '../../repositories/churchs-repository'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditChurchUseCaseRequest {
  churchId: string
  name: string
  description: string
  street: string
  neighbourhood: string
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
  constructor(private churchsRepository: ChurchsRepository) {}

  async execute({
    churchId,
    name,
    description,
    street,
    neighbourhood,
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
    church.neighbourhood = neighbourhood
    church.city = city
    church.state = state
    church.postalCode = postalCode
    church.number = number
    church.latitude = latitude
    church.longitude = longitude

    await this.churchsRepository.save(church)

    return success(null)
  }
}
