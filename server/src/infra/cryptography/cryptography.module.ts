import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/admsjp/cryptography/encrypter'
import { HashProvider } from '@/domain/admsjp/cryptography/hash-provider'

import BCryptHashProvider from './brcrypt-hash-provider'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    { provide: HashProvider, useClass: BCryptHashProvider },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [HashProvider, Encrypter],
})
export class CryptographyModule {}
