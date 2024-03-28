import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NewBeliever } from '@/domain/admsjp/enterprise/entities/new-believer'

import { ChurchsRepository } from '../../repositories/churchs-repository'
import { NewBelieversRepository } from '../../repositories/new-believers-repository'

interface CreateNewBelieverUseCaseRequest {
  churchId: string
  name: string
  lastName: string
  phone: string
  email: string | null
  birthday: Date
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  number: string
  lgpd: boolean
}

type CreateNewBelieverUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  null
>

@Injectable()
export class CreateNewBelieverUseCase {
  constructor(
    private newBelieversRepository: NewBelieversRepository,
    private churchsRepository: ChurchsRepository,
  ) {}

  async execute({
    churchId,
    name,
    lastName,
    phone,
    email,
    birthday,
    street,
    neighborhood,
    city,
    state,
    postalCode,
    number,
    lgpd,
  }: CreateNewBelieverUseCaseRequest): Promise<CreateNewBelieverUseCaseResponse> {
    const church = await this.churchsRepository.findById(churchId)

    if (!church) {
      return failure(new ResourceNotFoundError('Church'))
    }

    const alreadyBelieverWithThisPhone =
      await this.newBelieversRepository.findByPhone(phone)

    if (alreadyBelieverWithThisPhone) {
      return failure(new ResourceAlreadyExistsError('Believer Phone'))
    }

    if (email !== null) {
      const alreadyBelieverWithThisEmail =
        await this.newBelieversRepository.findByEmail(email)

      if (alreadyBelieverWithThisEmail) {
        return failure(new ResourceAlreadyExistsError('Believer Email'))
      }
    }

    const newBeliever = NewBeliever.create({
      churchId: church.id,
      name,
      lastName,
      phone,
      email,
      birthday,
      street,
      neighborhood,
      city,
      state,
      postalCode,
      number,
      lgpd,
    })

    await this.newBelieversRepository.create(newBeliever)

    return success(null)
  }
}
