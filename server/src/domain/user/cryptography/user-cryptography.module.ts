import { Module } from '@nestjs/common'

import BCryptHashProvider from './implementations/brcrypt-hash-provider'
import { HashProvider } from './models/hash-provider'

@Module({
  providers: [{ provide: HashProvider, useClass: BCryptHashProvider }],
  exports: [HashProvider],
})
export class UserCryptographyModule {}
