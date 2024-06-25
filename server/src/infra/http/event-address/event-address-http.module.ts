import { Module } from '@nestjs/common'

import { EditEventAddressUseCase } from '@/domain/admsjp/use-cases/event-address/edit-event-address'
import { GetEventAddressByEventIdUseCase } from '@/domain/admsjp/use-cases/event-address/get-event-address-by-event-id'
import { DatabaseModule } from '@/infra/database/database.module'

import { GetEventAddressByEventIdController } from './controllers/get-event-address-by-event-id.controller'
import { UpdateEventAddressController } from './controllers/update-event-address.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    UpdateEventAddressController,
    GetEventAddressByEventIdController,
  ],
  providers: [EditEventAddressUseCase, GetEventAddressByEventIdUseCase],
})
export class EventAddressHttpModule {}
