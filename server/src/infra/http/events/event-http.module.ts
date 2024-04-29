import { Module } from '@nestjs/common'

import { CreateEventUseCase } from '@/domain/admsjp/use-cases/events/create/create-event'
import { FindEventByIdUseCase } from '@/domain/admsjp/use-cases/events/find/by-id/find-event-by-id'
import { FindEventBySlugUseCase } from '@/domain/admsjp/use-cases/events/find/by-slug/find-event-by-slug'
import { FindEventByTitleUseCase } from '@/domain/admsjp/use-cases/events/find/by-title/find-event-by-title'
import { ListEventsUseCase } from '@/domain/admsjp/use-cases/events/list/default/list-events'
import { ListPublicEventsUseCase } from '@/domain/admsjp/use-cases/events/list/public/list-public-events'
import { UpdateEventUseCase } from '@/domain/admsjp/use-cases/events/update/default/update-event'
import { DatabaseModule } from '@/infra/database/database.module'
import { StorageModule } from '@/infra/storage/storage.module'

import { CreateEventController } from './controllers/create-event.controller'
import { ListEventsController } from './controllers/list-events.controller'
import { ListPublicEventsController } from './controllers/list-public-events.controller'
import { UpdateEventController } from './controllers/update-event.controller'

@Module({
  imports: [DatabaseModule, StorageModule],
  controllers: [
    CreateEventController,
    ListEventsController,
    ListPublicEventsController,
    UpdateEventController,
  ],
  providers: [
    CreateEventUseCase,
    FindEventByIdUseCase,
    FindEventBySlugUseCase,
    FindEventByTitleUseCase,
    ListEventsUseCase,
    ListPublicEventsUseCase,
    UpdateEventUseCase,
  ],
})
export class EventHttpModule {}
