import { Module } from '@nestjs/common'

import { ClearExpiredPurchasesJob } from '@/domain/admsjp/jobs/event-purchase/clear-expired-purchases-job'

import { DatabaseModule } from '../database/database.module'
import { ClearExpiredPurchasesJobService } from './event-purchase/clear-expired-tickets-job-service'

@Module({
  imports: [DatabaseModule],
  providers: [ClearExpiredPurchasesJobService, ClearExpiredPurchasesJob],
})
export class JobsModule {}
