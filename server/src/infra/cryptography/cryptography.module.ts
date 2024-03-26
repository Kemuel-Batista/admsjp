import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/admsjp/application/cryptography/encrypter'
import { HashComparer } from '@/domain/admsjp/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/admsjp/application/cryptography/hash-generator'
import { PasswordGenerator } from '@/domain/admsjp/application/cryptography/password-generator'

import { BcryptHasher } from './bcrypt-hasher'
import { InfraPasswordGenerator } from './infra-password-generator'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
    { provide: PasswordGenerator, useClass: InfraPasswordGenerator },
  ],
  exports: [Encrypter, HashComparer, HashGenerator, PasswordGenerator],
})
export class CryptographyModule {}
