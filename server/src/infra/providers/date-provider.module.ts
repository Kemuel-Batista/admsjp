import { Module } from '@nestjs/common'

import { IDateProvider } from '../../domain/admsjp/providers/date-provider'
import { DateProvider } from './date-provider'

@Module({
  providers: [{ provide: IDateProvider, useClass: DateProvider }],
  exports: [IDateProvider],
})
export class DateProviderModule {}
