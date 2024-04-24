import { Module } from '@nestjs/common'

import { StorageModule } from '@/infra/storage/storage.module'

import { EventDatabaseModule } from '../database/event-database.module'
import { CreateEventUseCase } from '../use-cases/create/create-event'
import { FindEventByIdUseCase } from '../use-cases/find/by-id/find-event-by-id'
import { FindEventBySlugUseCase } from '../use-cases/find/by-slug/find-event-by-slug'
import { FindEventByTitleUseCase } from '../use-cases/find/by-title/find-event-by-title'
import { ListEventsUseCase } from '../use-cases/list/default/list-events'
import { ListPublicEventsUseCase } from '../use-cases/list/public/list-public-events'
import { CreateEventController } from './controllers/create-event.controller'
import { ListEventsController } from './controllers/list-events.controller'
import { ListPublicEventsController } from './controllers/list-public-events.controller'

@Module({
  imports: [EventDatabaseModule, StorageModule],
  controllers: [
    CreateEventController,
    ListEventsController,
    ListPublicEventsController,
  ],
  providers: [
    CreateEventUseCase,
    FindEventByIdUseCase,
    FindEventBySlugUseCase,
    FindEventByTitleUseCase,
    ListEventsUseCase,
    ListPublicEventsUseCase,
  ],
})
export class EventHttpModule {}
