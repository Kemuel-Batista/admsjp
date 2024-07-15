import { Module } from '@nestjs/common'

import { QRCodeGenerator } from '@/domain/admsjp/generators/qr-code-generator'
import { TicketGenerator } from '@/domain/admsjp/generators/ticket-generator'

import { InfraQRCodeGenerator } from './infra-qr-code-generator'
import { InfraTicketGenerator } from './infra-ticket-generator'

@Module({
  providers: [
    { provide: TicketGenerator, useClass: InfraTicketGenerator },
    { provide: QRCodeGenerator, useClass: InfraQRCodeGenerator },
  ],
  exports: [TicketGenerator, QRCodeGenerator],
})
export class GeneratorsModule {}
