import { Module } from '@nestjs/common'

import BCryptHashProvider from './implementations/brcrypt-hash-provider'
import { JwtEncrypter } from './implementations/jwt-encrypter'
import { Encrypter } from './models/encrypter'
import { HashProvider } from './models/hash-provider'

@Module({
  providers: [
    { provide: HashProvider, useClass: BCryptHashProvider },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [HashProvider, Encrypter],
})
export class UserCryptographyModule {}
