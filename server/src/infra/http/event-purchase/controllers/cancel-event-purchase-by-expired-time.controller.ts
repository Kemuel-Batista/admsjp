import {
  BadRequestException,
  Controller,
  Delete,
  NotFoundException,
  Param,
  PreconditionFailedException,
} from '@nestjs/common'

import { LimitTimeNotExpiredError } from '@/core/errors/errors/limit-time-not-expired-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CancelEventPurchaseByExpiredTimeUseCase } from '@/domain/admsjp/use-cases/event-purchase/cancel-event-purchase-by-expired-time'

@Controller('/expired-time/:purchaseId')
export class CancelEventPurchaseByExpiredTimeController {
  constructor(
    private cancelEventPurchaseByExpiredTime: CancelEventPurchaseByExpiredTimeUseCase,
  ) {}

  @Delete()
  async handle(@Param('purchaseId') purchaseId: string) {
    const result = await this.cancelEventPurchaseByExpiredTime.execute({
      purchaseId,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case LimitTimeNotExpiredError:
          throw new PreconditionFailedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
