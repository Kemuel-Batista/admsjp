import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common'
import { z } from 'zod'

import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CancelEventTicketsUseCase } from '@/domain/admsjp/use-cases/event-ticket/cancel-event-tickets'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const cancelEventTicketsSchema = z.object({
  ids: z.array(z.string().uuid()),
})

type CancelEventTicketsSchema = z.infer<typeof cancelEventTicketsSchema>

const bodyValidationPipe = new ZodValidationPipe(cancelEventTicketsSchema)

@Controller('/cancel')
export class CancelEventTicketsController {
  constructor(private cancelEventTickets: CancelEventTicketsUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CancelEventTicketsSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { ids } = body

    const result = await this.cancelEventTickets.execute({
      tickets: ids,
      requestedBy: user.sub.id,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case IncorrectAssociationError:
          throw new PreconditionFailedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
