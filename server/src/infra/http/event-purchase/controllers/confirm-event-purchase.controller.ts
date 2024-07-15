import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ConfirmEventPurchaseUseCase } from '@/domain/admsjp/use-cases/event-purchase/confirm-event-purchase'

@Controller('/confirm/:purchaseId')
export class ConfirmEventPurchaseController {
  constructor(private confirmEventPurchase: ConfirmEventPurchaseUseCase) {}

  @Patch()
  async handle(@Param('purchaseId') purchaseId: string) {
    const result = await this.confirmEventPurchase.execute({
      purchaseId,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
