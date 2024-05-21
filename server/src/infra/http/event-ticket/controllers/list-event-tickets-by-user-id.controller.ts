import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ListEventTicketsByUserIdUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-by-user-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/user')
export class ListEventTicketsByUserIdController {
  constructor(
    private listEventTicketsByUserIdUseCase: ListEventTicketsByUserIdUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.listEventTicketsByUserIdUseCase.execute({
      userId: user.sub.id,
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
