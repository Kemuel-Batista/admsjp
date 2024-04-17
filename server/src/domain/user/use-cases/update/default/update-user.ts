import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { IHashProvider } from '@/domain/user/cryptography/models/hash-provider'
import { UpdateUserDTO } from '@/domain/user/dtos/update-user.dto'
import { UsersRepository } from '@/domain/user/repositories/users-repository'

import { FindUserByIdUseCase } from '../../find/by-id/find-user-by-id'
import { FindUserByUsernameUseCase } from '../../find/by-username/find-user-by-username'

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: IHashProvider,
    private findUserById: FindUserByIdUseCase,
    private findUserByUsername: FindUserByUsernameUseCase,
  ) {}

  async execute({
    id,
    name,
    username,
    email,
    password,
    status,
    profileId,
    updatedBy,
  }: UpdateUserDTO): Promise<User> {
    const currentUser = await this.findUserById.execute(id, {
      throwIfNotFound: true,
      errorKeyNotFound: 'user.update.id.notFound',
      errorCodeNotFound: HttpStatusCode.NOT_FOUND,
    })

    if (username && username !== null) {
      if (currentUser.username !== username) {
        await this.findUserByUsername.execute(username, {
          throwIfFound: true,
          errorKeyFound: 'user.update.username.alreadyExists',
          errorCodeFound: HttpStatusCode.BAD_REQUEST,
        })
      }
    }

    if (password && password !== null) {
      password = await this.hashProvider.generateHash(password)
    }

    const user = await this.usersRepository.update({
      id,
      name,
      username,
      email,
      password,
      status,
      profileId,
      updatedBy,
    })

    return user
  }
}
