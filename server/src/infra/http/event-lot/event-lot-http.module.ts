import { Module } from '@nestjs/common'

import { EditEventLotUseCase } from '@/domain/admsjp/use-cases/event-lot/edit-event-lot'
import { ListEventLotByEventIdUseCase } from '@/domain/admsjp/use-cases/event-lot/list-event-lot-by-event-id'
import { DatabaseModule } from '@/infra/database/database.module'

import { EditEventLotController } from './controllers/edit-event-lot.controller'
import { ListEventLotByEventIdController } from './controllers/list-event-lot-by-event-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [ListEventLotByEventIdController, EditEventLotController],
  providers: [ListEventLotByEventIdUseCase, EditEventLotUseCase],
})
export class EventLotHttpModule {}
