import { Injectable } from '@nestjs/common'
import { Profile } from '@prisma/client'

import { CreateProfileDTO } from '../../dtos/create-profile.dto'
import { ProfileRepository } from '../../repositories/profile-repository'
import { FindProfileByNameUseCase } from '../find/by-name/find-profile-by-name'

@Injectable()
export class CreateProfileUseCase {
  constructor(
    private profileRepository: ProfileRepository,
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

    const profile = await this.profileRepository.create({
      name,
      status,
      visible,
      createdBy,
    })

    return profile
  }
}
