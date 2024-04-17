import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { HashProvider } from '@/domain/user/cryptography/models/hash-provider'
import { UsersRepository } from '@/domain/user/repositories/users-repository'

import { FindUserByIdUseCase } from '../../find/by-id/find-user-by-id'

@Injectable()
export class UpdateUserPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: HashProvider,
    private findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute(
    id: User['id'],
    password: User['password'],
    updatedBy: User['id'],
  ): Promise<void> {
    await this.findUserByIdUseCase.execute(id, {
      throwIfNotFound: true,
      errorKeyNotFound: 'user.update.id.notFound',
      errorCodeNotFound: HttpStatusCode.NOT_FOUND,
    })

    password = await this.hashProvider.generateHash(password)

    await this.usersRepository.update({
      id,
      password,
      updatedBy,
    })
  }
}
