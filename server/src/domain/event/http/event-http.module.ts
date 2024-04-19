import { Module } from '@nestjs/common'

import { EventDatabaseModule } from '../database/event-database.module'
import { CreateEventUseCase } from '../use-cases/create/create-event'
import { FindEventByIdUseCase } from '../use-cases/find/by-id/find-event-by-id'
import { FindEventBySlugUseCase } from '../use-cases/find/by-slug/find-event-by-slug'
import { FindEventByTitleUseCase } from '../use-cases/find/by-title/find-event-by-title'

@Module({
  imports: [EventDatabaseModule],
  controllers: [],
  providers: [
    CreateEventUseCase,
    FindEventByIdUseCase,
    FindEventBySlugUseCase,
    FindEventByTitleUseCase,
  ],
})
export class EventHttpModule {}
