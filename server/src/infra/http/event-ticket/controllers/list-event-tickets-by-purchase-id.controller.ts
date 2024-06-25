import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { ListEventTicketsByPurchaseIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-purchase-id'

@Controller('/purchase/:purchaseId')
export class ListEventTicketsByPurchaseIdController {
  constructor(
    private listEventTicketsByPurchaseIdUseCase: ListEventTicketsByPurchaseIdUseCase,
  ) {}

  @Get()
  async handle(@Param('purchaseId') purchaseId: string) {
    const result = await this.listEventTicketsByPurchaseIdUseCase.execute({
      purchaseId,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    const eventTickets = result.value.eventTickets

    return {
      eventTickets,
    }
  }
}
