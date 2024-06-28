import { Injectable } from '@nestjs/common'
import type { Department, Profile, User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { HashGenerator } from '../../cryptography/hash-generator'
import { UserStatus } from '../../enums/user'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { ProfilesRepository } from '../../repositories/profiles-repository'
import { UsersOnProfilesRepository } from '../../repositories/users-on-profiles-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface RegisterUserUseCaseRequest {
  email: User['email']
  name: User['name']
  password: User['password']
  photo?: User['photo']
  status: User['status']
  departmentId: Department['id']
  profileId: Profile['id']
  provider: User['provider']
}

type RegisterUserUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  null
>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
    private profilesRepository: ProfilesRepository,
    private usersOnProfilesRepository: UsersOnProfilesRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    email,
    name,
    password,
    status = UserStatus.ACTIVE,
    photo,
    departmentId,
    profileId,
    provider,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return failure(
        new ResourceAlreadyExistsError({
          errorKey: 'user.create.alreadyExists',
          key: email,
        }),
      )
    }

    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'department.find.notFound',
          key: String(departmentId),
        }),
      )
    }

    const profile = await this.profilesRepository.findById(profileId)

    if (!profile) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'profile.find.notFound',
          key: String(profileId),
        }),
      )
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      photo,
      status,
      departmentId,
      createdBy: String('1'),
      provider,
    })

    await this.usersOnProfilesRepository.create({
      userId: user.id,
      profileId,
    })

    return success(null)
  }
}
