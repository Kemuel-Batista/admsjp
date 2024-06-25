import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-unexpired-event-purchases-with-details-by-user-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/unexpired')
export class ListUnexpiredEventPurchasesWithDetailsByUserIdController {
  constructor(
    private listUnexpiredEventPurchasesWithDetailsByUserIdUseCase: ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase,
  ) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const result =
      await this.listUnexpiredEventPurchasesWithDetailsByUserIdUseCase.execute({
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
