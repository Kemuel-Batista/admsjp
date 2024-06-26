import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'

import { Either, success } from '@/core/either'
import { ListOptions } from '@/core/repositories/list-options'
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'

interface ListProfileUseCaseRequest {
  options?: ListOptions
}

type ListProfileUseCaseResponse = Either<
  null,
  {
    profiles: Profile[]
  }
>

@Injectable()
export class ListProfileUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({
    options = {},
  }: ListProfileUseCaseRequest): Promise<ListProfileUseCaseResponse> {
    const profiles = await this.profilesRepository.list(options)

    return success({
      profiles,
    })
  }
}
