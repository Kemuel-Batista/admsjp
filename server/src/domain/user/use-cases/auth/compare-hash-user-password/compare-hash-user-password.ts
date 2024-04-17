import { Injectable } from '@nestjs/common'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AuthError } from '@/core/errors/AuthError'
import { HashProvider } from '@/domain/user/cryptography/models/hash-provider'

interface ICompareHashUserPasswordOptions {
  throwIfPasswordNotMatch?: boolean
  errorKeyPasswordNotMatch?: string
  errorCodePasswordNotMatch?: HttpStatusCode
}

@Injectable()
export class CompareHashUserPassword {
  constructor(private hashProvider: HashProvider) {}

  async execute(
    password: string,
    hashedPassword: string,
    {
      throwIfPasswordNotMatch = true,
      errorKeyPasswordNotMatch = 'user.auth.invalidCredentials',
      errorCodePasswordNotMatch = HttpStatusCode.UNAUTHORIZED,
    }: ICompareHashUserPasswordOptions = {},
  ): Promise<boolean> {
    const compareHashPassword = await this.hashProvider.compareHash(
      password,
      hashedPassword,
    )

    if (throwIfPasswordNotMatch && !compareHashPassword) {
      throw new AuthError(errorKeyPasswordNotMatch, errorCodePasswordNotMatch)
    }

    return compareHashPassword
  }
}
