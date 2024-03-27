import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ChurchDetails } from '@/domain/admsjp/enterprise/entities/value-objects/church-details'

import { ChurchsRepository } from '../../repositories/churchs-repository'

interface GetChurchDetailsUseCaseRequest {
  churchId: string
}

type GetChurchDetailsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    church: ChurchDetails
  }
>

@Injectable()
export class GetChurchDetailsUseCase {
  constructor(private churchsRepository: ChurchsRepository) {}

  async execute({
    churchId,
  }: GetChurchDetailsUseCaseRequest): Promise<GetChurchDetailsUseCaseResponse> {
    const church = await this.churchsRepository.findDetailsById(churchId)

    if (!church) {
      return failure(new ResourceNotFoundError('Church'))
    }

    return success({
      church,
    })
  }
}
