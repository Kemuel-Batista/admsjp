import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ListEventTicketsUnexpiredByUserUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-unexpired-by-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/unexpired/user')
export class ListEventTicketsUnexpiredByUserController {
  constructor(
    private listEventTicketsUnexpiredByUserUseCase: ListEventTicketsUnexpiredByUserUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.listEventTicketsUnexpiredByUserUseCase.execute({
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
