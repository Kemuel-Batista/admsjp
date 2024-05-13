import { Module } from '@nestjs/common'

import { ListEventLotByEventIdUseCase } from '@/domain/admsjp/use-cases/event-lot/list/by-event-id/ListEventLotByEventId'
import { DatabaseModule } from '@/infra/database/database.module'

import { ListEventLotByEventIdController } from './controllers/list-event-lot-by-event-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [ListEventLotByEventIdController],
  providers: [ListEventLotByEventIdUseCase],
})
export class EventLotHttpModule {}
