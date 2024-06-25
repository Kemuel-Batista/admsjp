import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { ClearExpiredPurchasesJob } from '@/domain/admsjp/jobs/event-purchase/clear-expired-purchases-job'

@Injectable()
export class ClearExpiredPurchasesJobService {
  constructor(private clearExpiredPurchasesJob: ClearExpiredPurchasesJob) {}

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'clear-expired-tickets',
  })
  async handleCron() {
    await this.clearExpiredPurchasesJob.execute()
  }
}
