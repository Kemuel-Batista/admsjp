import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { ClearExpiredTicketsJob } from '@/domain/admsjp/jobs/event-ticket/clear-expired-tickets-job'

@Injectable()
export class ClearExpiredTicketsJobService {
  constructor(private clearExpiredTicketsJob: ClearExpiredTicketsJob) {}

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'clear-expired-tickets',
  })
  async handleCron() {
    await this.clearExpiredTicketsJob.execute()
  }
}
