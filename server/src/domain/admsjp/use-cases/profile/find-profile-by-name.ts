import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'

import { ProfilesRepository } from '../../repositories/profiles-repository'

interface FindProfileByNameUseCaseRequest {
  name: Profile['name']
}

type FindProfileByNameUseCaseResponse = Profile

@Injectable()
export class FindProfileByNameUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({
    name,
  }: FindProfileByNameUseCaseRequest): Promise<FindProfileByNameUseCaseResponse> {
    const profile = await this.profilesRepository.findByName(name)

    if (!profile) {
      throw new Error(`Profile with name ${name} not found`)
    }

    return profile
  }
}
