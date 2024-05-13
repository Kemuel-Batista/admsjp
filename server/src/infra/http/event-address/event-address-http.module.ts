import { Module } from '@nestjs/common'

import { UpdateEventAddressUseCase } from '@/domain/admsjp/use-cases/event-address/update/update-event-address'
import { DatabaseModule } from '@/infra/database/database.module'

import { UpdateEventAddressController } from './controllers/update-event-address.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [UpdateEventAddressController],
  providers: [UpdateEventAddressUseCase],
})
export class EventAddressHttpModule {}
