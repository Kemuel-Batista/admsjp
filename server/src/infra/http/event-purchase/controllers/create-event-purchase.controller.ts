import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  PreconditionFailedException,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { TicketsSoldOutError } from '@/core/errors/errors/tickets-sold-out-error'
import { CreateEventPurchaseUseCase } from '@/domain/admsjp/use-cases/event-purchase/create-event-purchase'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createEventPurchaseSchema = z.object({
  eventId: z.number().int().positive(),
  eventLotInfo: z.array(
    z.object({
      eventLotId: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
})

type CreateEventPurchaseSchema = z.infer<typeof createEventPurchaseSchema>

const bodyValidationPipe = new ZodValidationPipe(createEventPurchaseSchema)

@Controller('/')
export class CreateEventPurchaseController {
  constructor(private createEventPurchase: CreateEventPurchaseUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CreateEventPurchaseSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { eventId, eventLotInfo } = body

    const result = await this.createEventPurchase.execute({
      eventId,
      buyerId: user.sub.id,
      eventLotInfo,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case TicketsSoldOutError:
          throw new PreconditionFailedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
