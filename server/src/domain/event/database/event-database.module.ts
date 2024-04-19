import { Module } from '@nestjs/common'

import { PrismaService } from '@/infra/database/prisma/prisma.service'

import { EventsRepository } from '../repositories/events-repository'
import { PrismaEventsRepository } from './prisma/repositories/prisma-events-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: EventsRepository,
      useClass: PrismaEventsRepository,
    },
  ],
  exports: [PrismaService, EventsRepository],
})
export class EventDatabaseModule {}
