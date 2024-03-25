import { UsersRepository } from '@/domain/repositories/users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { Injectable } from '@nestjs/common'
import { Either, failure, success } from '@/core/either'
import { HashGenerator } from '@/domain/cryptography/hash-generator'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateAccountUseCaseResponse = Either<UserAlreadyExistsError, null>

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return failure(new UserAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return success(null)
  }
}
