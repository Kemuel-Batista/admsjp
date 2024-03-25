import { UsersRepository } from '@/domain/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { Injectable } from '@nestjs/common'
import { Either, failure, success } from '@/core/either'
import { HashComparer } from '@/domain/cryptography/hash-comparer'
import { Encrypter } from '@/domain/cryptography/encrypter'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return failure(new InvalidCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return failure(new InvalidCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return success({
      accessToken,
    })
  }
}
