import { Injectable } from '@nestjs/common'

import { Either, success } from '@/core/either'
import { Church } from '@/domain/admsjp/enterprise/entities/church'

import { ChurchsRepository } from '../../repositories/churchs-repository'

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
