import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/either'

import { ChurchsRepository } from '../../repositories/churchs-repository'
import { Church } from '@/domain/admsjp/enterprise/entities/church'

interface FetchChurchsUseCaseRequest {
  page: number
}

type FetchChurchsUseCaseResponse = Either<
  null,
  {
    churchs: Church[]
  }
>

@Injectable()
export class FetchChurchsUseCase {
  constructor(private churchsRepository: ChurchsRepository) {}

  async execute({
    page,
  }: FetchChurchsUseCaseRequest): Promise<FetchChurchsUseCaseResponse> {
    const churchs = await this.churchsRepository.findMany({
      page,
    })

    return success({
      churchs,
    })
  }
}
