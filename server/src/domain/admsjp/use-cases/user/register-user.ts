import { Injectable } from '@nestjs/common'

import { Either, failure } from '@/core/either'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { HashGenerator } from '../../cryptography/hash-generator'
import { UserStatus } from '../../enums/user'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { ProfilesRepository } from '../../repositories/profiles-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface RegisterUserUseCaseRequest {
  email: string
  name: string
  password: string
  photo?: string
  status: number
  departmentId: number
  profileId: number
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

    await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      photo,
      status,
      departmentId,
      profileId,
      createdBy: 1,
    })
  }
}
