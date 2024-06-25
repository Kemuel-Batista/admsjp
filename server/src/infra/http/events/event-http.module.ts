import { Module } from '@nestjs/common'

import { CreateEventAddressUseCase } from '@/domain/admsjp/use-cases/event-address/create-event-address'
import { CreateEventLotUseCase } from '@/domain/admsjp/use-cases/event-lot/create-event-lot'
import { CreateEventUseCase } from '@/domain/admsjp/use-cases/events/create-event'
import { DeleteEventUseCase } from '@/domain/admsjp/use-cases/events/delete-event'
import { EditEventUseCase } from '@/domain/admsjp/use-cases/events/edit-event'
import { GetEventByIdUseCase } from '@/domain/admsjp/use-cases/events/get-event-by-id'
import { GetEventBySlugUseCase } from '@/domain/admsjp/use-cases/events/get-event-by-slug'
import { ListEventsUseCase } from '@/domain/admsjp/use-cases/events/list-events'
import { ListPublicEventsUseCase } from '@/domain/admsjp/use-cases/events/list-public-events'
import { DatabaseModule } from '@/infra/database/database.module'
import { NotifierModule } from '@/infra/notifier/notifier.module'
import { StorageModule } from '@/infra/storage/storage.module'

import { CreateEventController } from './controllers/create-event.controller'
import { DeleteEventController } from './controllers/delete-event.controller'
import { EditEventController } from './controllers/edit-event.controller'
import { GetEventByIdController } from './controllers/get-event-by-id.controller'
import { GetEventBySlugController } from './controllers/get-event-by-slug.controller'
import { ListEventsController } from './controllers/list-events.controller'
import { ListPublicEventsController } from './controllers/list-public-events.controller'

@Module({
  imports: [DatabaseModule, StorageModule, NotifierModule],
  controllers: [
    CreateEventController,
    ListEventsController,
    ListPublicEventsController,
    EditEventController,
    GetEventBySlugController,
    GetEventByIdController,
    DeleteEventController,
  ],
  providers: [
    CreateEventUseCase,
    CreateEventLotUseCase,
    CreateEventAddressUseCase,
    ListEventsUseCase,
    ListPublicEventsUseCase,
    EditEventUseCase,
    GetEventBySlugUseCase,
    GetEventByIdUseCase,
    DeleteEventUseCase,
  ],
})
export class EventHttpModule {}
