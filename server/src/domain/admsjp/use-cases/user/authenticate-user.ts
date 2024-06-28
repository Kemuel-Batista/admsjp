import { Injectable } from '@nestjs/common'
import type { User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { WrongCredentialsError } from '@/core/errors/errors/wrong-credentials-error'

import { Encrypter } from '../../cryptography/encrypter'
import { HashComparer } from '../../cryptography/hash-comparer'
import { UsersOnProfilesRepository } from '../../repositories/users-on-profiles-repository'
import { UsersRepository } from '../../repositories/users-repository'

interface AuthenticateUserUseCaseRequest {
  email: User['id']
  password: User['password']
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
    userProvider: string
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private usersOnProfilesRepository: UsersOnProfilesRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return failure(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return failure(new WrongCredentialsError())
    }

    const userWithProfiles =
      await this.usersOnProfilesRepository.listByUserIdWithDetails(user.id)

    const profileRoles = userWithProfiles.map((item) => item.profile.name)

    const accessToken = await this.encrypter.encrypt({
      sub: {
        id: user.id,
        name: user.name,
        status: user.status,
        departmentId: user.departmentId,
        roles: profileRoles,
        email: user.email,
      },
    })

    return success({
      accessToken,
      userProvider: user.provider,
    })
  }
}
