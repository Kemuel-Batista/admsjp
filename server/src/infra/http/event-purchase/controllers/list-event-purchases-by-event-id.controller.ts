import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { ListEventPurchasesByEventIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-event-purchases-by-event-id'

@Controller('/by-event/:eventId')
export class ListEventPurchasesByEventIdController {
  constructor(
    private listEventPurchasesByEventIdUseCase: ListEventPurchasesByEventIdUseCase,
  ) {}

  @Get()
  async handle(@Param('eventId') eventId: string) {
    const result = await this.listEventPurchasesByEventIdUseCase.execute({
      eventId,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    const eventPurchases = result.value.eventPurchases

    return {
      eventPurchases,
    }
  }
}
