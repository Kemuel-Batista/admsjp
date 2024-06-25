import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import { ConfirmOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/confirm-order-payment'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/confirm/:orderId')
export class ConfirmOrderPaymentController {
  constructor(private confirmOrderPayment: ConfirmOrderPaymentUseCase) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param('orderId', paramsValidationPipe) orderId: ParamsSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.confirmOrderPayment.execute({
      id: orderId,
      confirmedBy: user.sub.id,
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
