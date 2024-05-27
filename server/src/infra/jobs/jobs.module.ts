import { Module } from '@nestjs/common'

import { ClearExpiredTicketsJob } from '@/domain/admsjp/jobs/event-ticket/clear-expired-tickets-job'

import { DatabaseModule } from '../database/database.module'
import { ClearExpiredTicketsJobService } from './event-ticket/clear-expired-tickets-job-service'

@Module({
  imports: [DatabaseModule],
  providers: [ClearExpiredTicketsJobService, ClearExpiredTicketsJob],
})
export class JobsModule {}
