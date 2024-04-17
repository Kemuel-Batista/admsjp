import { Module } from '@nestjs/common'

import { DateProvider } from './implementations/date-provider'
import { IDateProvider } from './models/date-provider'

@Module({
  providers: [{ provide: IDateProvider, useClass: DateProvider }],
  exports: [IDateProvider],
})
export class DateProviderModule {}
