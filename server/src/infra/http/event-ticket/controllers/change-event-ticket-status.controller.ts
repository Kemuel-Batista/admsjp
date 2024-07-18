import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EventTicketStatus } from '@/domain/admsjp/enums/event-ticket'
import { ChangeEventTicketStatusUseCase } from '@/domain/admsjp/use-cases/event-ticket/change-event-ticket-status'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const changeEventTicketStatusSchema = z.object({
  status: z.nativeEnum(EventTicketStatus),
})

type ChangeEventTicketStatusSchema = z.infer<
  typeof changeEventTicketStatusSchema
>

const bodyValidationPipe = new ZodValidationPipe(changeEventTicketStatusSchema)

@Controller('/change/status/:eventTicketId')
export class ChangeEventTicketStatusController {
  constructor(
    private changeEventTicketStatus: ChangeEventTicketStatusUseCase,
  ) {}

  @Patch()
  async handle(
    @Param('eventTicketId') eventTicketId: string,
    @Body(bodyValidationPipe) body: ChangeEventTicketStatusSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { status } = body

    const result = await this.changeEventTicketStatus.execute({
      id: eventTicketId,
      status,
      updatedBy: user.sub.id,
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
