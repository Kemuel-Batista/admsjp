import { Injectable } from '@nestjs/common'
import { Profile, type User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'

interface CreateProfileUseCaseRequest {
  name: Profile['name']
  status: Profile['status']
  visible: Profile['visible']
  createdBy: User['id']
}

type CreateProfileUseCaseResponse = Either<
  ResourceAlreadyExistsError,
  {
    profile: Profile
  }
>

@Injectable()
export class CreateProfileUseCase {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({
    name,
    status = 1,
    visible = 1,
    createdBy,
  }: CreateProfileUseCaseRequest): Promise<CreateProfileUseCaseResponse> {
    const profileAlreadyExists = await this.profilesRepository.findByName(name)

    if (profileAlreadyExists) {
      return failure(
        new ResourceAlreadyExistsError({
          errorKey: 'profile.create.keyAlreadyExists',
          key: name,
        }),
      )
    }

    const profile = await this.profilesRepository.create({
      name: name.toUpperCase(),
      status,
      visible,
      createdBy,
    })

    return success({
      profile,
    })
  }
}
