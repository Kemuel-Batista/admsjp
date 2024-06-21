import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { z } from 'zod'

import { RegisterEventQueue } from '@/domain/admsjp/use-cases/queues/register-event-queue'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createEventTicketSchema = z.object({
  data: z.array(
    z.object({
      eventId: z.number().int().positive(),
      lot: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
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
    const { data } = body

    const events = data.map((item) => ({
      ...item,
      userId: user.sub.id,
    }))

    await this.registerEventQueue.execute(events)
  }
}
