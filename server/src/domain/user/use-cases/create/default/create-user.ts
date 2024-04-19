import { Injectable } from '@nestjs/common'

import { HashProvider } from '@/domain/user/cryptography/models/hash-provider'
import { CreateUserDTO } from '@/domain/user/dtos/create-user.dto'
import { UserStatus } from '@/domain/user/enums/user-status'
import { UsersRepository } from '@/domain/user/repositories/users-repository'
import { UserWithoutPassword } from '@/domain/user/types/user-without-password'

import { FindUserByUsernameUseCase } from '../../find/by-username/find-user-by-username'

@Injectable()
class CreateUserUseCase {
  constructor(
    private userRepository: UsersRepository,
    private hashProvider: HashProvider,
    private findUserByUsername: FindUserByUsernameUseCase,
  ) {}

  async execute({
    username,
    email,
    name,
    password,
    status = UserStatus.ACTIVE,
    departmentId,
    profileId,
    createdBy,
  }: CreateUserDTO): Promise<UserWithoutPassword> {
    await this.findUserByUsername.execute(username, {
      throwIfFound: true,
    })

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user: UserWithoutPassword = await this.userRepository.create({
      username,
      email,
      name,
      password: hashedPassword,
      status,
      departmentId,
      profileId,
      createdBy,
    })

    return user
  }
}

export { CreateUserUseCase }
