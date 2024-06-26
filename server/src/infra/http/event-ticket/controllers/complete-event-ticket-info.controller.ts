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

import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CompleteEventTicketInfoUseCase } from '@/domain/admsjp/use-cases/event-ticket/complete-event-ticket-info'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const completeEventTicketInfoSchema = z.object({
  data: z.array(
    z.object({
      id: z.string().uuid(),
      eventPurchaseId: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      cpf: z.string().min(11).max(11),
      phone: z.string().max(11),
      shirtSize: z.string().min(1).max(3).optional(),
      birthday: z.string().transform((arg) => new Date(arg)),
    }),
  ),
})

type CompleteEventTicketInfoSchema = z.infer<
  typeof completeEventTicketInfoSchema
>

const bodyValidationPipe = new ZodValidationPipe(completeEventTicketInfoSchema)

@Controller('/info')
export class CompleteEventTicketInfoController {
  constructor(
    private completeEventTicketInfo: CompleteEventTicketInfoUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CompleteEventTicketInfoSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { data } = body

    const result = await this.completeEventTicketInfo.execute(data, user.sub.id)

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
