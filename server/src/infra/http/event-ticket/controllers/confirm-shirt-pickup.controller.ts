import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Patch,
  PreconditionFailedException,
} from '@nestjs/common'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketAlreadyPickedUpError } from '@/core/errors/errors/ticket-already-picked-up-error'
import { ConfirmShirtPickupUseCase } from '@/domain/admsjp/use-cases/event-ticket/confirm-shirt-pickup'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/shirt/confirm/:eventTicketId')
export class ConfirmShirtPickupController {
  constructor(private confirmShirtPickup: ConfirmShirtPickupUseCase) {}

  @Patch()
  async handle(
    @Param('eventTicketId') eventTicketId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.confirmShirtPickup.execute({
      id: eventTicketId,
      deliveredBy: user.sub.id,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case TicketAlreadyPickedUpError:
          throw new PreconditionFailedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
