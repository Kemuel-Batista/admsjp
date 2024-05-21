import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import { ListEventTicketsByEventIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-event-id'

@Controller('/event/:id')
export class ListEventTicketsByEventIdController {
  constructor(
    private listEventTicketsByEventIdUseCase: ListEventTicketsByEventIdUseCase,
  ) {}

  @Get()
  async handle(@Param('id', paramsValidationPipe) id: ParamsSchema) {
    const result = await this.listEventTicketsByEventIdUseCase.execute({
      eventId: id,
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
