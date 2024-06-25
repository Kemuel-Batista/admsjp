import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'

import { CreateProfileDTO } from '@/domain/admsjp/dtos/profile'
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'

import { FindProfileByNameUseCase } from '../find/by-name/find-profile-by-name'

@Injectable()
export class CreateProfileUseCase {
  constructor(
    private profilesRepository: ProfilesRepository,
    private findProfileByName: FindProfileByNameUseCase,
  ) {}

  async execute({
    name,
    status = 1,
    visible = 1,
    createdBy,
  }: CreateProfileDTO): Promise<Profile> {
    await this.findProfileByName.execute(name, {
      throwIfFound: true,
    })

    const profile = await this.profilesRepository.create({
      name,
      status,
      visible,
      createdBy,
    })

    return profile
  }
}
