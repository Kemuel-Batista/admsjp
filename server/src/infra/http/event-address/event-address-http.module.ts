import { Module } from '@nestjs/common'

import { EditEventAddressUseCase } from '@/domain/admsjp/use-cases/event-address/edit-event-address'
import { DatabaseModule } from '@/infra/database/database.module'

import { UpdateEventAddressController } from './controllers/update-event-address.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [UpdateEventAddressController],
  providers: [EditEventAddressUseCase],
})
export class EventAddressHttpModule {}
