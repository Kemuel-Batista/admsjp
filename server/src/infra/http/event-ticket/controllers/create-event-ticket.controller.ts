import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { z } from 'zod'

import { RegisterEventQueue } from '@/domain/admsjp/use-cases/queues/register-event-queue'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createEventTicketSchema = z.object({
  eventId: z.number().int().positive(),
  lot: z.number().int().positive(),
})

type CreateEventTicketSchema = z.infer<typeof createEventTicketSchema>

const bodyValidationPipe = new ZodValidationPipe(createEventTicketSchema)

@Controller('/')
export class CreateEventTicketController {
  constructor(private registerEventQueue: RegisterEventQueue) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CreateEventTicketSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { eventId, lot } = body

    await this.registerEventQueue.execute({
      eventId,
      lot,
      userId: user.sub.id,
    })
  }
}
