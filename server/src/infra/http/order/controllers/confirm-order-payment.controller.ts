import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { ConfirmOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/confirm-order-payment'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const paramsSchema = z.coerce.number().int().positive()
const paramValidationPipe = new ZodValidationPipe(paramsSchema)
type ParamSchema = z.infer<typeof paramsSchema>

@Controller('/confirm/:orderId')
export class ConfirmOrderPaymentController {
  constructor(private confirmOrderPayment: ConfirmOrderPaymentUseCase) {}

  @Patch()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param('orderId', paramValidationPipe) orderId: ParamSchema,
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
