import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ListEventPurchasesByUserIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-event-purchases-by-user-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/by-user')
export class ListEventPurchasesByUserIdController {
  constructor(
    private listEventPurchasesByUserIdUseCase: ListEventPurchasesByUserIdUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.listEventPurchasesByUserIdUseCase.execute({
      buyerId: user.sub.id,
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
