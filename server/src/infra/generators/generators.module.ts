import { Module } from '@nestjs/common'

import { TicketGenerator } from '@/domain/admsjp/generators/ticket-generator'

import { InfraTicketGenerator } from './infra-ticket-generator'

@Module({
  providers: [{ provide: TicketGenerator, useClass: InfraTicketGenerator }],
  exports: [TicketGenerator],
})
export class GeneratorsModule {}
